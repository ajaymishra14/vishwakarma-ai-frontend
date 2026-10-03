"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, Phone, Sparkles } from "lucide-react";

export default function SignUpPage() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [value, setValue] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 text-[var(--foreground)]">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 text-sm font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20 dark:border-white/10">
            <Sparkles size={18} />
          </span>
          Vishwakarma AI
        </Link>
        <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#111318] sm:p-8">
          <div className="text-center"><h1 className="text-2xl font-semibold">Create your account</h1><p className="mt-2 text-sm opacity-55">Start building with Vishwakarma AI</p></div>
          <button onClick={() => window.alert("Google sign-up will use the configured authentication gateway.")} className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-black/10 py-3 text-sm font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"><span className="font-bold">G</span> Continue with Google</button>
          <div className="my-5 flex items-center gap-3 text-[11px] opacity-35"><span className="h-px flex-1 bg-current" />OR<span className="h-px flex-1 bg-current" /></div>
          <div className="mb-3 grid grid-cols-2 rounded-xl bg-black/5 p-1 dark:bg-white/5"><button onClick={() => setMethod("email")} className={`rounded-lg py-2 text-xs ${method === "email" ? "bg-white shadow dark:bg-[#22252b]" : "opacity-50"}`}>Email</button><button onClick={() => setMethod("phone")} className={`rounded-lg py-2 text-xs ${method === "phone" ? "bg-white shadow dark:bg-[#22252b]" : "opacity-50"}`}>Phone</button></div>
          <label className="text-xs opacity-55">{method === "email" ? "Email address" : "Phone number"}</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-black/10 px-3 dark:border-white/10">{method === "email" ? <Mail size={16} className="opacity-40" /> : <Phone size={16} className="opacity-40" />}<input value={value} onChange={(e) => setValue(e.target.value)} type={method === "email" ? "email" : "tel"} placeholder={method === "email" ? "you@example.com" : "+91 98765 43210"} className="w-full bg-transparent py-3 text-sm outline-none" /></div>
          <button onClick={() => window.alert("The verification flow will start after the authentication gateway is connected.")} disabled={!value.trim()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white disabled:opacity-30 dark:bg-white dark:text-black">Create account <ArrowRight size={15} /></button>
          <p className="mt-6 text-center text-xs opacity-50">Already have an account? <Link href="/sign-in" className="font-medium underline opacity-100">Sign in</Link></p>
        </section>
      </div>
    </main>
  );
}