import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const uploadedFiles = mysqlTable(
  "uploaded_files",
  {
    id: int("id").autoincrement().primaryKey(),
    ownerId: int("ownerId").notNull(),
    fileKey: varchar("fileKey", { length: 512 }).notNull().unique(),
    fileUrl: varchar("fileUrl", { length: 512 }).notNull(),
    originalName: varchar("originalName", { length: 255 }).notNull(),
    contentType: varchar("contentType", { length: 191 }).notNull(),
    sizeBytes: int("sizeBytes").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [index("uploaded_files_owner_created_idx").on(table.ownerId, table.createdAt)],
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type UploadedFile = typeof uploadedFiles.$inferSelect;
export type InsertUploadedFile = typeof uploadedFiles.$inferInsert;
