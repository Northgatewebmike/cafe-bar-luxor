import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { createStoredFile, listStoredFilesForOwner } from "./db";
import { decodeUploadPayload } from "./fileUploadUtils";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  files: router({
    list: adminProcedure.query(({ ctx }) => listStoredFilesForOwner(ctx.user.id)),
    upload: adminProcedure
      .input(z.object({
        fileName: z.string().min(1).max(255),
        contentType: z.string().min(1).max(191),
        dataBase64: z.string().min(4).max(11_200_000),
      }))
      .mutation(async ({ ctx, input }) => {
        const { bytes, safeFileName } = decodeUploadPayload(input);
        const { key, url } = await storagePut(
          `owner-files/${ctx.user.id}/${Date.now()}-${safeFileName}`,
          bytes,
          input.contentType,
        );

        return createStoredFile({
          ownerId: ctx.user.id,
          fileKey: key,
          fileUrl: url,
          originalName: input.fileName,
          contentType: input.contentType,
          sizeBytes: bytes.length,
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
