"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, X, Loader2 } from "lucide-react";

interface DocumentUploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
}

export function DocumentUpload({ currentUrl, onUpload }: DocumentUploadProps) {
  const [fileUrl, setFileUrl] = useState<string>(currentUrl || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setError("");
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File must be under 10MB.");
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload-document", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Upload failed");
        }

        const { url } = await res.json();
        setFileUrl(url);
        onUpload(url);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onUpload],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleUpload(file);
  };

  const removeFile = () => {
    setFileUrl("");
    onUpload("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const fileName = fileUrl ? fileUrl.split("/").pop() : "";

  return (
    <div className="space-y-3">
      {fileUrl ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-surface-700 bg-surface-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-700 flex items-center justify-center">
              <FileText size={20} className="text-surface-300" />
            </div>
            <div>
              <p className="text-sm text-surface-200">{fileName}</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-400 hover:underline"
              >
                View PDF
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
              className="text-xs"
            >
              <Upload size={14} className="mr-1" /> Replace
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={removeFile}
              className="text-xs"
            >
              <X size={14} className="mr-1" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-surface-600 bg-surface-800/50 px-4 py-6 text-center">
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={22} className="text-brand-400 animate-spin" />
              <p className="text-sm text-surface-400">Uploading PDF...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <FileText size={22} className="text-surface-400" />
              <p className="text-sm text-surface-300">
                Upload your CV (PDF, max 10MB)
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                className="text-xs"
              >
                Choose PDF
              </Button>
            </div>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <p className="text-xs text-error bg-error/10 border border-error/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
