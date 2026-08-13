import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function makeContext(user: TrpcContext["user"]): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("file storage router", () => {
  it("blocks unauthenticated and non-admin callers before file access", async () => {
    const anonymousCaller = appRouter.createCaller(makeContext(null));
    await expect(anonymousCaller.files.list()).rejects.toMatchObject({ code: "FORBIDDEN" });

    const userCaller = appRouter.createCaller(
      makeContext({
        id: 42,
        openId: "standard-user",
        name: "Standard User",
        email: "user@example.com",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      }),
    );
    await expect(userCaller.files.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects an upload payload that exceeds the server input limit before storage", async () => {
    const adminCaller = appRouter.createCaller(
      makeContext({
        id: 1,
        openId: "owner",
        name: "Owner",
        email: "owner@example.com",
        loginMethod: "manus",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      }),
    );

    await expect(
      adminCaller.files.upload({
        fileName: "oversized.pdf",
        contentType: "application/pdf",
        dataBase64: "A".repeat(11_200_001),
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
