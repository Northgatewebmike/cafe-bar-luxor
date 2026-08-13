import { useState } from "react";
import { Download, FileArchive, FileText, FileUp, Image, Loader2, LockKeyhole, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}

function fileIcon(contentType: string) {
  if (contentType.startsWith("image/")) return Image;
  if (contentType === "application/pdf" || contentType === "text/plain") return FileText;
  return FileArchive;
}

export default function FileManager() {
  const { user, loading, isAuthenticated } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const utils = trpc.useUtils();
  const hasAccess = isAuthenticated && user?.role === "admin";
  const filesQuery = trpc.files.list.useQuery(undefined, { enabled: hasAccess });
  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: async () => {
      setSelectedFile(null);
      await utils.files.list.invalidate();
      toast.success("Datei wurde sicher gespeichert.");
    },
    onError: error => toast.error(error.message || "Die Datei konnte nicht gespeichert werden."),
  });

  const handleFileSelection = (file: File | null) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Erlaubt sind JPG, PNG, WebP, PDF, TXT, DOCX und XLSX.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Die Datei darf maximal 8 MB groß sein.");
      return;
    }
    setSelectedFile(file);
  };

  const uploadSelectedFile = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onerror = () => toast.error("Die Datei konnte nicht gelesen werden.");
    reader.onload = () => {
      const result = String(reader.result || "");
      const dataBase64 = result.split(",")[1];
      if (!dataBase64) {
        toast.error("Die Datei konnte nicht gelesen werden.");
        return;
      }
      uploadMutation.mutate({
        fileName: selectedFile.name,
        contentType: selectedFile.type,
        dataBase64,
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  if (loading) {
    return <div className="min-h-[70vh] grid place-items-center text-white/60"><Loader2 className="h-7 w-7 animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <section className="min-h-[70vh] grid place-items-center px-4 py-20">
        <div className="max-w-lg rounded-2xl border border-red-500/20 bg-[#120606] p-8 text-center shadow-2xl">
          <LockKeyhole className="mx-auto h-10 w-10 text-red-400" />
          <h1 className="mt-5 font-serif text-4xl text-white">Dateiverwaltung</h1>
          <p className="mt-3 text-sm leading-6 text-white/60">Dieser Bereich ist nur für Cafe&Bar-Luxor-Administratoren zugänglich. Melden Sie sich an, um Dateien sicher zu speichern und zu verwalten.</p>
          <button onClick={startLogin} className="mt-6 rounded-sm bg-[#b00000] px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[#d10b0b]">
            Sicher anmelden
          </button>
        </div>
      </section>
    );
  }

  if (!hasAccess) {
    return (
      <section className="min-h-[70vh] grid place-items-center px-4 py-20">
        <div className="max-w-lg rounded-2xl border border-red-500/20 bg-[#120606] p-8 text-center shadow-2xl">
          <LockKeyhole className="mx-auto h-10 w-10 text-red-400" />
          <h1 className="mt-5 font-serif text-4xl text-white">Kein Zugriff</h1>
          <p className="mt-3 text-sm leading-6 text-white/60">Ihr Konto hat keine Berechtigung für die Dateiverwaltung.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">Geschützter Bereich</p>
        <div className="mt-3 flex flex-col gap-3 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl text-white sm:text-5xl">Dateiverwaltung</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">Laden Sie Bilddateien, PDFs und interne Dokumente sicher hoch. Die Datei selbst liegt im geschützten Objektspeicher; hier werden nur die benötigten Metadaten gespeichert.</p>
          </div>
          <span className="text-xs text-white/35">Max. 8 MB pro Datei</span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="rounded-2xl border border-red-500/20 bg-[#120606] p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-500/10 p-3"><UploadCloud className="h-5 w-5 text-red-400" /></div>
              <div><h2 className="font-serif text-2xl text-white">Neue Datei</h2><p className="text-xs text-white/45">JPG, PNG, WebP, PDF, TXT, DOCX, XLSX</p></div>
            </div>
            <label className="mt-6 block cursor-pointer rounded-xl border border-dashed border-white/20 bg-black/20 p-7 text-center transition hover:border-red-400/60 hover:bg-red-500/5">
              <FileUp className="mx-auto h-8 w-8 text-white/45" />
              <span className="mt-3 block text-sm font-medium text-white/80">Datei auswählen</span>
              <span className="mt-1 block text-xs text-white/40">oder hierher ziehen</span>
              <input className="sr-only" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.txt,.docx,.xlsx" onChange={event => handleFileSelection(event.target.files?.[0] ?? null)} />
            </label>
            {selectedFile && <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white/70"><p className="truncate font-medium">{selectedFile.name}</p><p className="mt-1 text-xs text-white/40">{formatBytes(selectedFile.size)}</p></div>}
            <button disabled={!selectedFile || uploadMutation.isPending} onClick={uploadSelectedFile} className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm bg-[#b00000] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d10b0b] disabled:cursor-not-allowed disabled:opacity-45">
              {uploadMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
              {uploadMutation.isPending ? "Wird gespeichert…" : "Sicher speichern"}
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/25">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5"><h2 className="font-serif text-2xl text-white">Gespeicherte Dateien</h2><span className="text-xs text-white/40">{filesQuery.data?.length ?? 0} Einträge</span></div>
            {filesQuery.isLoading && <div className="grid min-h-48 place-items-center"><Loader2 className="h-6 w-6 animate-spin text-red-400" /></div>}
            {filesQuery.isError && <p className="p-6 text-sm text-red-300">Die gespeicherten Dateien konnten nicht geladen werden.</p>}
            {!filesQuery.isLoading && !filesQuery.isError && filesQuery.data?.length === 0 && <div className="p-10 text-center text-sm text-white/45">Noch keine Dateien gespeichert.</div>}
            <div className="divide-y divide-white/8">
              {filesQuery.data?.map(file => {
                const Icon = fileIcon(file.contentType);
                return <div key={file.id} className="flex items-center gap-3 px-5 py-4 sm:px-6"><div className="rounded-lg bg-white/5 p-2"><Icon className="h-5 w-5 text-red-300" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-white/85">{file.originalName}</p><p className="mt-1 text-xs text-white/40">{formatBytes(file.sizeBytes)} · {formatDate(file.createdAt)}</p></div><a href={file.fileUrl} target="_blank" rel="noreferrer" className="rounded-md p-2 text-white/55 transition hover:bg-white/8 hover:text-white" aria-label={`${file.originalName} öffnen`}><Download className="h-4 w-4" /></a></div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
