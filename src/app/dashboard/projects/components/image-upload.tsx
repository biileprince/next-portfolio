"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
}

export function ImageUpload({ currentUrl, onUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(currentUrl || "");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setError("");
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPEG, PNG, WebP, and GIF are allowed.");
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

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Upload failed");
        }

        const { url } = await res.json();
        setPreview(url);
        onUpload(url);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onUpload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const removeImage = () => {
    setPreview("");
    onUpload("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative group rounded-lg overflow-hidden border border-surface-700 bg-surface-800">
          <Image
            src={preview}
            alt="Project preview"
            width={560}
            height={300}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
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
              onClick={removeImage}
              className="text-xs"
            >
              <X size={14} className="mr-1" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`
            flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed cursor-pointer transition-all
            ${
              dragActive
                ? "border-brand-400 bg-brand-500/10"
                : "border-surface-600 bg-surface-800/50 hover:border-surface-500 hover:bg-surface-800"
            }
            ${uploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="text-brand-400 animate-spin" />
              <p className="text-sm text-surface-400">
                Uploading to Cloudinary...
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-surface-700 flex items-center justify-center">
                <ImageIcon size={22} className="text-surface-400" />
              </div>
              <div className="text-center">
                <p className="text-sm text-surface-300 font-medium">
                  Drop an image here or{" "}
                  <span className="text-brand-400">browse</span>
                </p>
                <p className="text-xs text-surface-500 mt-1">
                  JPEG, PNG, WebP, GIF up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
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
