"use client";

import { useState } from "react";
import { Check, Clock3, Play, Plus, Trash2, Workflow } from "lucide-react";
import ModulePage from "@/components/workspace/ModulePage";

type Automation = { id: string; name: string; schedule: string; enabled: boolean };

export default function AutomationsPage() {
  const [items, setItems] = useState<Automation[]>([]);
  const add = () => {
    const name = window.prompt("Automation name");
    if (!name?.trim()) return;
    setItems((v) => [...v, { id: crypto.randomUUID(), name: name.trim(), schedule: "Manual", enabled: true }]);
  };

  return (
    <ModulePage title="Automations" description="Design repeatable workflows with clear triggers, actions, and execution state.">
      <button onClick={add} className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black"><Plus size={15} /> New automation</button>
      <div className="mt-5 space-y-2">
        {items.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center"><Workflow className="mx-auto text-white/25" /><div className="mt-3 text-sm text-white/45">No automations configured</div></div> : items.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"><Workflow size={17} /></div>
            <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{item.name}</div><div className="mt-1 flex items-center gap-2 text-xs text-white/30"><Clock3 size={13} />{item.schedule}</div></div>
            <button onClick={() => setItems((v) => v.map((a) => a.id === item.id ? { ...a, enabled: !a.enabled } : a))} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs">{item.enabled ? <><Check size={13} /> Enabled</> : "Disabled"}</button>
            <button onClick={() => setItems((v) => v.filter((a) => a.id !== item.id))} className="rounded-lg p-2 text-white/25 hover:bg-white/5 hover:text-white"><Trash2 size={15} /></button>
            <button className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/15"><Play size={13} /> Run</button>
          </div>
        ))}
      </div>
    </ModulePage>
  );
}
