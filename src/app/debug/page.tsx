"use client";

import { useState } from "react";
import { AlertTriangle, Bug, CheckCircle2, Search } from "lucide-react";
import ModulePage from "@/components/workspace/ModulePage";

export default function DebugPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyze = () => {
    if (!input.trim() || analyzing) return;
    setAnalyzing(true);
    const checks = [
      input.includes("undefined") ? "Possible undefined value detected." : "No obvious undefined reference found.",
      input.includes("null") ? "Null handling should be reviewed." : "No explicit null handling issue detected.",
      input.includes("TODO") ? "TODO marker found; implementation may be incomplete." : "No TODO marker found.",
    ];
    window.setTimeout(() => {
      setResult(checks.join("\n"));
      setAnalyzing(false);
    }, 350);
  };

  return (
    <ModulePage title="Debug" description="Inspect snippets, errors, logs, and symptoms systematically. This frontend workspace prepares diagnostics for the real debugging engine.">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium"><Bug size={16} /> Diagnostic input</div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste an error, stack trace, log, or code snippet..." className="min-h-72 w-full resize-y rounded-xl border border-white/10 bg-[#090b0e] p-4 font-mono text-xs leading-5 outline-none placeholder:text-white/20 focus:border-white/25" />
          <button onClick={analyze} disabled={analyzing || !input.trim()} className="mt-3 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-40"><Search size={15} /> {analyzing ? "Analyzing..." : "Analyze"}</button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <div className="flex items-center gap-2 text-sm font-medium"><AlertTriangle size={16} /> Findings</div>
          {result ? <pre className="mt-5 whitespace-pre-wrap text-xs leading-6 text-white/55">{result}</pre> : <div className="mt-16 text-center text-xs text-white/25"><CheckCircle2 className="mx-auto mb-3" />No analysis yet.</div>}
        </div>
      </div>
    </ModulePage>
  );
}
