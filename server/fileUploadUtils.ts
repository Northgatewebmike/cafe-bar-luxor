export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export const ACCEPTED_FILE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

export function sanitizeFileName(fileName: string): string {
  const normalized = fileName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-\./g, ".")
    .replace(/^[-.]+|[-.]+$/g, "");

  return normalized.slice(0, 160) || "upload";
}

export function decodeUploadPayload(input: {
  fileName: string;
  contentType: string;
  dataBase64: string;
}) {
  if (!ACCEPTED_FILE_TYPES.has(input.contentType)) {
    throw new Error("Dieser Dateityp ist nicht erlaubt.");
  }

  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(input.dataBase64)) {
    throw new Error("Die Datei konnte nicht gelesen werden.");
  }

  const bytes = Buffer.from(input.dataBase64, "base64");
  if (bytes.length === 0 || bytes.length > MAX_UPLOAD_BYTES) {
    throw new Error("Die Datei muss zwischen 1 Byte und 8 MB groß sein.");
  }

  return {
    bytes,
    safeFileName: sanitizeFileName(input.fileName),
  };
}
