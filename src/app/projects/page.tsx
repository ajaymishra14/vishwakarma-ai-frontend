"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Plus, Search, Trash2 } from "lucide-react";
import ModulePage from "@/components/workspace/ModulePage";

type Project = { id: string; name: string; description: string };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");\n  const [ready, setReady] = useState(false);\n\n  useEffect(() => {\n    try {\n      const saved = localStorage.getItem("vishwakarma-projects");\n      if (saved) setProjects(JSON.parse(saved));\n    } catch {}\n    setReady(true);\n  }, []);\n\n  useEffect(() => {\n    if (ready) localStorage.setItem("vishwakarma-projects", JSON.stringify(projects));\n  }, [projects, ready]);

  const create = () => {
    const name = window.prompt("Project name");
    if (!name?.trim()) return;
    setProjects((items) => [...items, { id: crypto.randomUUID(), name: name.trim(), description: "New Vishwakarma project" }]);
  };

  const visible = projects.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <ModulePage title="Projects" description="Keep related conversations, code, files, and tasks together in focused workspaces.">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3">
          <Search size={16} className="text-white/30" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/25" />
        </label>
        <button onClick={create} className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black hover:bg-white/85"><Plus size={16} /> New project</button>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center md:col-span-2">
            <FolderKanban className="mx-auto text-white/25" />
            <div className="mt-3 text-sm text-white/50">No projects yet</div>
            <div className="mt-1 text-xs text-white/25">Create one to organize your work.</div>
          </div>
        ) : visible.map((project) => (
          <div key={project.id} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-start justify-between">
              <FolderKanban size={18} className="text-white/50" />
              <button onClick={() => setProjects((items) => items.filter((p) => p.id !== project.id))} className="rounded-lg p-2 text-white/20 hover:bg-white/5 hover:text-white"><Trash2 size={15} /></button>
            </div>
            <div className="mt-6 text-sm font-medium">{project.name}</div>
            <div className="mt-1 text-xs text-white/35">{project.description}</div>
          </div>
        ))}
      </div>
    </ModulePage>
  );
}
