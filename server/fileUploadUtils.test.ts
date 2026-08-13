import { describe, expect, it } from "vitest";
import { decodeUploadPayload, MAX_UPLOAD_BYTES, sanitizeFileName } from "./fileUploadUtils";

describe("file upload validation", () => {
  it("creates a safe filename while preserving its extension", () => {
    expect(sanitizeFileName(" Cafe & Bar Menü 2026!.pdf ")).toBe("Cafe-Bar-Men-2026.pdf");
  });

  it("accepts a valid PDF payload below the storage limit", () => {
    const result = decodeUploadPayload({
      fileName: "allergene.pdf",
      contentType: "application/pdf",
      dataBase64: Buffer.from("Luxor").toString("base64"),
    });

    expect(result.safeFileName).toBe("allergene.pdf");
    expect(result.bytes.toString()).toBe("Luxor");
  });

  it("rejects unsupported file types and oversized payloads", () => {
    expect(() =>
      decodeUploadPayload({
        fileName: "script.exe",
        contentType: "application/x-msdownload",
        dataBase64: "AA==",
      }),
    ).toThrow("nicht erlaubt");

    expect(() =>
      decodeUploadPayload({
        fileName: "large.txt",
        contentType: "text/plain",
        dataBase64: Buffer.alloc(MAX_UPLOAD_BYTES + 1).toString("base64"),
      }),
    ).toThrow("8 MB");
  });
});
