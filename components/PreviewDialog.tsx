"use client";

import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";

type Props = {
  title?: string;
  sourcePath: string;
  children: React.ReactNode;
};

export default function PreviewDialog({
                                        title = '',
                                        sourcePath,
                                        children,
                                      }: Props) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const loadCode = async () => {
      setLoading(true);
      setCode("");

      try {
        const response = await fetch(
          `/api/source-code?path=${encodeURIComponent(sourcePath)}`,
        );

        const data = await response.json();

        if (!response.ok) {
          setCode(`// ${data.error || "File not found"}\n// ${sourcePath}`);
          return;
        }

        setCode(data.code || "");
      } catch {
        setCode(`// Failed to load\n// ${sourcePath}`);
      } finally {
        setLoading(false);
      }
    };

    void loadCode();
  }, [open, sourcePath]);

  useEffect(() => {
    if (!open || !code) return;

    const timeout = window.setTimeout(() => {
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [open, code]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <div className="relative">
        <PreviewBox>{children}</PreviewBox>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-3 top-3 z-30 rounded-md bg-black/80 px-3 py-2 text-sm font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`Open ${title} preview`}
        >
          Open preview
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-dialog-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div className="flex max-h-[90vh] w-full max-w-8xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h2 id="preview-dialog-title" className="font-medium">
                  {title}
                </h2>

                <p className="text-xs text-gray-500">{sourcePath}</p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
              >
                Close
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6 overflow-auto p-4">
              {/* Preview */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Preview</h3>

                <div className="rounded-lg border p-4">{children}</div>
              </div>

              {/* Code */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Code</h3>

                <pre className="max-h-[500px] overflow-auto rounded bg-[#1e1e1e] p-4 text-sm text-white">
                  <code ref={codeRef} className="language-tsx">
                    {loading ? "// Loading..." : code}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const PreviewBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[400px] overflow-hidden rounded-lg border bg-background transition hover:border-primary">
      <div className="w-[1200px] origin-top-left scale-[0.35]">
        {children}
      </div>
    </div>
  );
};
