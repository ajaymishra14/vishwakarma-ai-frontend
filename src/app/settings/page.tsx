"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useChatStore } from "@/lib/chat-store";
import { Moon, Trash2, Languages, ShieldCheck, UserRound, Camera, LogOut, Bell, Lock, SlidersHorizontal } from "lucide-react";

export default function SettingsPage() {
  const [compact, setCompact] = useState(false);
  const [name, setName] = useState("Ajay");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const clearConversations = useChatStore((state) => state.clearConversations);
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setName(localStorage.getItem("vishwakarma-profile-name") || "Ajay");
    setEmail(localStorage.getItem("vishwakarma-profile-email") || "");
    setPhoto(localStorage.getItem("vishwakarma-profile-photo"));
  }, []);

  const saveProfile = () => {
    localStorage.setItem("vishwakarma-profile-name", name.trim() || "User");
    localStorage.setItem("vishwakarma-profile-email", email.trim());
    window.dispatchEvent(new Event("vishwakarma-profile-updated"));
  };

  const uploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result);
      setPhoto(value);
      localStorage.setItem("vishwakarma-profile-photo", value);
      window.dispatchEvent(new Event("vishwakarma-profile-updated"));
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm opacity-55">Manage your Vishwakarma AI account and preferences.</p>

        <div className="mt-8 space-y-4">
          <section className="rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#111318]">
            <div className="flex items-center gap-3 border-b border-black/10 p-5 dark:border-white/10"><UserRound size={18}/><div><div className="text-sm font-medium">Profile</div><div className="text-xs opacity-45">Your photo and account information.</div></div></div>
            <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center">
              <label className="group relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                {photo ? <img src={photo} alt="Profile" className="h-full w-full object-cover"/> : <UserRound size={28} className="opacity-35"/>}
                <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-white opacity-0 transition group-hover:opacity-100"><Camera size={18}/></span>
                <input type="file" accept="image/*" className="hidden" onChange={uploadPhoto}/>
              </label>
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <input value={name} onChange={(e)=>setName(e.target.value)} onBlur={saveProfile} placeholder="Name" className="rounded-xl border border-black/10 bg-transparent px-3 py-2.5 text-sm outline-none dark:border-white/10"/>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} onBlur={saveProfile} type="email" placeholder="Email" className="rounded-xl border border-black/10 bg-transparent px-3 py-2.5 text-sm outline-none dark:border-white/10"/>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#111318]">
            <div className="flex items-center gap-3 border-b border-black/10 p-5 dark:border-white/10"><Moon size={18}/><div><div className="text-sm font-medium">Appearance</div><div className="text-xs opacity-45">Choose Light, Dark, or System.</div></div></div>
            <div className="grid grid-cols-3 gap-2 p-5">{(["dark","light","system"] as const).map((option)=><button key={option} onClick={()=>setTheme(option)} className={`rounded-xl border px-3 py-2.5 text-xs capitalize ${theme===option?"border-black/30 bg-black/5 dark:border-white/30 dark:bg-white/10":"border-black/10 opacity-50 dark:border-white/10"}`}>{option}</button>)}</div>
            <label className="flex items-center justify-between border-t border-black/10 p-5 text-sm opacity-70 dark:border-white/10">Compact workspace<input type="checkbox" checked={compact} onChange={(e)=>setCompact(e.target.checked)}/></label>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#111318]">
            <div className="flex items-center gap-3 border-b border-black/10 p-5 dark:border-white/10"><Languages size={18}/><div><div className="text-sm font-medium">Language</div><div className="text-xs opacity-45">Choose your interface language.</div></div></div>
            <div className="p-5"><select value={language} onChange={(e)=>setLanguage(e.target.value as Parameters<typeof setLanguage>[0])} className="w-full rounded-xl border border-black/10 bg-transparent px-3 py-2.5 text-sm outline-none dark:border-white/10"><option value="en">English</option><option value="hi">हिन्दी</option><option value="bn">বাংলা</option><option value="te">తెలుగు</option><option value="mr">मराठी</option><option value="ta">தமிழ்</option><option value="gu">ગુજરાતી</option><option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option><option value="pa">ਪੰਜਾਬੀ</option><option value="ur">اردو</option><option value="or">ଓଡ଼ିଆ</option><option value="as">অসমীয়া</option></select></div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#111318]">
            <div className="border-b border-black/10 p-5 dark:border-white/10"><div className="flex items-center gap-3"><SlidersHorizontal size={18}/><div><div className="text-sm font-medium">Preferences</div><div className="text-xs opacity-45">Conversation and notification controls.</div></div></div></div>
            <div className="divide-y divide-black/10 dark:divide-white/10">
              <label className="flex items-center justify-between p-5 text-sm">Notifications<input type="checkbox" defaultChecked/></label>
              <label className="flex items-center justify-between p-5 text-sm">Save chat history<input type="checkbox" defaultChecked/></label>
              <button onClick={()=>window.alert("Security controls will be connected to the authentication gateway.")} className="flex w-full items-center justify-between p-5 text-left text-sm"><span className="flex items-center gap-3"><Lock size={16}/>Security & authentication</span><span className="text-xs opacity-40">Manage</span></button>
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#111318]">
            <div className="flex items-center gap-3 border-b border-black/10 p-5 dark:border-white/10"><ShieldCheck size={18}/><div><div className="text-sm font-medium">Data & privacy</div><div className="text-xs opacity-45">Conversation data currently stays in this browser.</div></div></div>
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="text-xs opacity-45">Permanently remove saved conversations from this browser.</div><button onClick={()=>{if(window.confirm("Delete all saved conversations?")) clearConversations();}} className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-600 dark:text-red-200"><Trash2 size={14}/>Clear chat history</button></div>
          </section>

          <button onClick={()=>window.alert("Logout will be connected to the authentication gateway.")} className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 py-3 text-sm opacity-70 hover:opacity-100 dark:border-white/10"><LogOut size={16}/>Log out</button>
        </div>
      </div>
    </main>
  );
}
