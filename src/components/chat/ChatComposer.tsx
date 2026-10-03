"use client";

import { useState, useRef } from "react";
import {
  ArrowUp,
  Paperclip,
  Square,
  SlidersHorizontal,
} from "lucide-react";

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
  const [value, setValue] = useState("");\n  const [attached, setAttached] = useState<string | null>(null);\n  const fileInput = useRef<HTMLInputElement>(null);

  const submit = () => {
    const message = value.trim();

    if (!message || isGenerating) {
      return;
    }

    onSend(attached ? `${message}\\n\\n[Attached file: ${attached}]` : message);
    setValue("");\n    setAttached(null);
  };

  return (
    <div className="border-t border-white/10 bg-[#0b0d10] p-4">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-white/10 bg-[#15181e] shadow-2xl">
          <input ref={fileInput} type="file" className="hidden" onChange={(event) => setAttached(event.target.files?.[0]?.name ?? null)} />\n          {attached && <div className="mx-4 mt-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/50">Attached: {attached}</div>}\n\n          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
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
                className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white"
                aria-label="Attach file"\n                onClick={() => fileInput.current?.click()}
              >
                <Paperclip size={18} />
              </button>

              <button
                className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white"
                aria-label="Options"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>

            {isGenerating ? (
              <button
                onClick={onStop}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black"
                aria-label="Stop generation"
              >
                <Square size={15} fill="currentColor" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!value.trim()}
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
