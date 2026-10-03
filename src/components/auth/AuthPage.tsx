"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Mail, Phone, Sparkles } from "lucide-react";

type AuthMode = "sign-in" | "sign-up";

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const isSignUp = mode === "sign-up";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 py-10 text-[var(--foreground)]">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm opacity-50 hover:opacity-100">
          <ArrowLeft size={15} /> Back
        </Link>

        <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-[#15181e] sm:p-9">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
              <Sparkles size={20} />
            </div>
            <h1 className="text-2xl font-semibold">{isSignUp ? "Create your account" : "Welcome back"}</h1>
            <p className="mt-2 text-sm opacity-50">{isSignUp ? "Create your Vishwakarma AI account." : "Sign in to continue to Vishwakarma AI."}</p>
          </div>

          <button type="button" className="flex w-full items-center justify-center gap-3 rounded-xl border border-black/10 py-3 text-sm font-medium hover:bg-black/[.03] dark:border-white/10 dark:hover:bg-white/[.04]">
            <span className="text-base font-semibold">G</span> Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-[11px] opacity-35"><span className="h-px flex-1 bg-current" />OR<span className="h-px flex-1 bg-current" /></div>

          {isSignUp && <input type="text" placeholder="Full name" className="mb-3 w-full rounded-xl border border-black/10 bg-transparent px-3 py-3 text-sm outline-none dark:border-white/10" />}

          <div className="mb-3 grid grid-cols-2 rounded-xl border border-black/10 p-1 dark:border-white/10">
            <button type="button" onClick={() => setMethod("email")} className={`rounded-lg py-2 text-xs ${method === "email" ? "bg-black text-white dark:bg-white dark:text-black" : "opacity-50"}`}><Mail size={13} className="mr-1 inline" /> Email</button>
            <button type="button" onClick={() => setMethod("phone")} className={`rounded-lg py-2 text-xs ${method === "phone" ? "bg-black text-white dark:bg-white dark:text-black" : "opacity-50"}`}><Phone size={13} className="mr-1 inline" /> Phone</button>
          </div>

          {method === "email" ? (
            <input type="email" placeholder="Email address" className="mb-3 w-full rounded-xl border border-black/10 bg-transparent px-3 py-3 text-sm outline-none dark:border-white/10" />
          ) : (
            <input type="tel" placeholder="+91 Phone number" className="mb-3 w-full rounded-xl border border-black/10 bg-transparent px-3 py-3 text-sm outline-none dark:border-white/10" />
          )}

          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full rounded-xl border border-black/10 bg-transparent px-3 py-3 pr-10 text-sm outline-none dark:border-white/10" />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-3 opacity-40 hover:opacity-100" aria-label="Toggle password visibility">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>

          {!isSignUp && <div className="mt-2 text-right"><button type="button" className="text-xs opacity-50 hover:opacity-100">Forgot password?</button></div>}

          <button type="button" className="mt-5 w-full rounded-xl bg-black py-3 text-sm font-medium text-white hover:opacity-85 dark:bg-white dark:text-black">{isSignUp ? "Create account" : "Sign in"}</button>

          <p className="mt-6 text-center text-sm opacity-50">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link href={isSignUp ? "/sign-in" : "/sign-up"} className="font-medium opacity-100 underline underline-offset-4">
              {isSignUp ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>

        <p className="mt-5 text-center text-[11px] opacity-35">Vishwakarma AI authentication</p>
      </div>
    </main>
  );
}
