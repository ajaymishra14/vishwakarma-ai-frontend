"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Code2, Play, Save } from "lucide-react";
import ModulePage from "@/components/workspace/ModulePage";

const starter = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Vishwakarma"));
`;

export default function CodePage() {
  const [code, setCode] = useState(starter);
  const [saved, setSaved] = useState(false);
  const [output, setOutput] = useState("Ready.");

  const run = () => {
    try {
      const logs: string[] = [];
      const consoleProxy = { log: (...args: unknown[]) => logs.push(args.map(String).join(" ")) };
      const fn = new Function("console", code);
      fn(consoleProxy);
      setOutput(logs.join("\\n") || "Executed successfully with no output.");
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "Execution failed.");
    }
  };

  return (
    <ModulePage title="Code" description="Edit code in a focused workspace, run safe browser-side JavaScript experiments, and prepare changes for the real project environment.">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c0f]">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-white/50"><Code2 size={15} /> playground.js</div>
          <div className="flex gap-2">
            <button onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 1500); }} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/55 hover:bg-white/5"><Save size={14} /> {saved ? "Saved" : "Save"}</button>
            <button onClick={run} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black"><Play size={14} /> Run</button>
          </div>
        </div>
        <Editor height="440px" theme="vs-dark" language="javascript" value={code} onChange={(value) => setCode(value ?? "")} options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 16 } }} />
        <div className="border-t border-white/10 px-4 py-3">
          <div className="mb-1 text-[10px] uppercase tracking-wider text-white/25">Output</div>
          <pre className="min-h-10 whitespace-pre-wrap text-xs text-white/55">{output}</pre>
        </div>
      </div>
    </ModulePage>
  );
}
