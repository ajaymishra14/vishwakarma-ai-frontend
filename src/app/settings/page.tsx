"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Trash2, Languages, ShieldCheck } from "lucide-react";
import ModulePage from "@/components/workspace/ModulePage";
import { useChatStore } from "@/lib/chat-store";

export default function SettingsPage() {
  const [compact, setCompact] = useState(false);
  const clearConversations = useChatStore((state) => state.clearConversations);\n  const { language, setLanguage } = useLanguage();\n  const { theme, setTheme } = useTheme();

  return (
    <ModulePage title="Settings" description="Control the frontend experience, conversation storage, and workspace preferences.">
      <div className="space-y-3">
        <section className="rounded-2xl border border-white/10 bg-white/[0.025]">
          <div className="flex items-center gap-3 border-b border-white/10 p-5"><Moon size={17} /><div><div className="text-sm font-medium">Appearance</div><div className="text-xs text-white/30">Choose how Vishwakarma should look on this device.</div></div></div><div className="grid grid-cols-3 gap-2 p-5">{(["dark","light","system"] as const).map((option) => <button key={option} onClick={() => setTheme(option)} className={`rounded-xl border px-3 py-2 text-xs capitalize ${theme === option ? "border-white/30 bg-white/10 text-white" : "border-white/10 text-white/40 hover:bg-white/5"}`}>{option}</button>)}</div>
          <label className="flex items-center justify-between p-5"><span className="text-sm text-white/60">Compact workspace</span><input type="checkbox" checked={compact} onChange={(e) => setCompact(e.target.checked)} /></label>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.025]">
          <div className="flex items-center gap-3 border-b border-white/10 p-5"><Languages size={17} /><div><div className="text-sm font-medium">Language</div><div className="text-xs text-white/30">Language infrastructure is ready for the supported locale set.</div></div></div>
          <div className="p-5"><select value={language} onChange={(e) => setLanguage(e.target.value as Parameters<typeof setLanguage>[0])} className="w-full rounded-xl border border-white/10 bg-[#111318] px-3 py-2.5 text-sm text-white outline-none"><option value="en">English</option><option value="hi">हिन्दी</option><option value="bn">বাংলা</option><option value="te">తెలుగు</option><option value="mr">मराठी</option><option value="ta">தமிழ்</option><option value="gu">ગુજરાતી</option><option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option><option value="pa">ਪੰਜਾਬੀ</option><option value="ur">اردو</option><option value="or">ଓଡ଼ିଆ</option><option value="as">অসমীয়া</option></select></div>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.025]">
          <div className="flex items-center gap-3 border-b border-white/10 p-5"><ShieldCheck size={17} /><div><div className="text-sm font-medium">Local conversation storage</div><div className="text-xs text-white/30">Chat history is stored in this browser until a backend storage layer is connected.</div></div></div>
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="text-xs text-white/35">This permanently removes saved conversations from this browser.</div><button onClick={() => { if (window.confirm("Delete all saved conversations?")) clearConversations(); }} className="flex items-center justify-center gap-2 rounded-lg border border-red-400/20 px-3 py-2 text-xs text-red-200 hover:bg-red-400/10"><Trash2 size={14} /> Clear chat history</button></div>
        </section>
      </div>
    </ModulePage>
  );
}
