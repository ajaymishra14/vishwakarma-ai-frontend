"use client";

import { useRef, useState } from "react";
import { ArrowUp, Paperclip, Square, SlidersHorizontal, X } from "lucide-react";

type ChatComposerProps = {
  onSend: (message: string) => void;
  isGenerating?: boolean;
  onStop?: () => void;
};

export default function ChatComposer({
  onSend,
  isGenerating = false,
  onStop,
}: ChatComposerProps) {
  const [value, setValue] = useState("");
  const [attached, setAttached] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const submit = () => {
    const message = value.trim();
    if ((!message && !attached) || isGenerating) return;

    const attachmentText = attached
      ? `\n\n[Attached file: ${attached.name} (${Math.ceil(attached.size / 1024)} KB)]`
      : "";

    onSend(message + attachmentText);
    setValue("");
    setAttached(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="border-t border-white/10 bg-[#0b0d10] p-4">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-white/10 bg-[#15181e] shadow-2xl">
          <input
            ref={fileInput}
            type="file"
            className="hidden"
            accept="*/*"
            onChange={(event) => setAttached(event.target.files?.[0] ?? null)}
          />

          {attached && (
            <div className="mx-4 mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs">
              <Paperclip size={13} className="shrink-0 opacity-50" />
              <span className="min-w-0 flex-1 truncate">{attached.name}</span>
              <button
                type="button"
                onClick={() => {
                  setAttached(null);
                  if (fileInput.current) fileInput.current.value = "";
                }}
                aria-label="Remove attachment"
                className="rounded p-1 opacity-50 hover:bg-white/10 hover:opacity-100"
              >
                <X size={13} />
              </button>
            </div>
          )}

          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
            placeholder="Ask Vishwakarma anything..."
            rows={3}
            className="w-full resize-none bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-white/25"
          />

          <div className="flex items-center justify-between border-t border-white/10 px-3 py-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white"
                aria-label="Attach file"
                onClick={() => fileInput.current?.click()}
              >
                <Paperclip size={18} />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white"
                aria-label="Options"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>

            {isGenerating ? (
              <button
                type="button"
                onClick={onStop}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black"
                aria-label="Stop generation"
              >
                <Square size={15} fill="currentColor" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={!value.trim() && !attached}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Send message"
              >
                <ArrowUp size={18} />
              </button>
            )}
          </div>
        </div>

        <p className="mt-2 text-center text-[10px] text-white/25">
          Vishwakarma can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
