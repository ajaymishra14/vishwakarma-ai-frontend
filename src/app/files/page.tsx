"use client";

import { useEffect, useState } from "react";
import { File, FileText, Folder, Search, Trash2, Upload } from "lucide-react";
import ModulePage from "@/components/workspace/ModulePage";

type LocalFile = { id: string; name: string; size: number; type: string };

export default function FilesPage() {
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [query, setQuery] = useState("");\n  const [ready, setReady] = useState(false);\n\n  useEffect(() => {\n    try {\n      const saved = localStorage.getItem("vishwakarma-files");\n      if (saved) setFiles(JSON.parse(saved));\n    } catch {}\n    setReady(true);\n  }, []);\n\n  useEffect(() => {\n    if (ready) localStorage.setItem("vishwakarma-files", JSON.stringify(files));\n  }, [files, ready]);

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    setFiles((items) => [...items, ...selected.map((file) => ({ id: crypto.randomUUID(), name: file.name, size: file.size, type: file.type || "file" }))]);
    event.target.value = "";
  };

  const visible = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <ModulePage title="Files" description="Bring project files into the workspace, search them, and prepare them for inspection or AI-assisted work.">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3"><Search size={16} className="text-white/30" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search files" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/25" /></label>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black"><Upload size={15} /> Upload<input type="file" multiple className="hidden" onChange={upload} /></label>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        {visible.length === 0 ? <div className="p-12 text-center"><Folder className="mx-auto text-white/25" /><div className="mt-3 text-sm text-white/40">No files in this workspace</div></div> : visible.map((file) => (
          <div key={file.id} className="flex items-center gap-3 border-b border-white/10 px-4 py-3 last:border-0">
            {file.type.startsWith("text") ? <FileText size={17} className="text-white/45" /> : <File size={17} className="text-white/45" />}
            <div className="min-w-0 flex-1"><div className="truncate text-sm">{file.name}</div><div className="text-[11px] text-white/25">{Math.max(1, Math.round(file.size / 1024))} KB</div></div>
            <button onClick={() => setFiles((v) => v.filter((f) => f.id !== file.id))} className="rounded-lg p-2 text-white/20 hover:bg-white/5 hover:text-white"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </ModulePage>
  );
}
