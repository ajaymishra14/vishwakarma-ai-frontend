"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Sidebar from "@/components/sidebar/Sidebar";

type ModulePageProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

export default function ModulePage({
  title,
  description,
  eyebrow = "Vishwakarma workspace",
  children,
}: ModulePageProps) {
  return (
    <div className="flex min-h-screen bg-[#0b0d10] text-white">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[#0b0d10]/90 px-4 backdrop-blur md:px-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/30">{eyebrow}</div>
            <h1 className="text-sm font-semibold">{title}</h1>
          </div>
          <Link href="/chat" className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/65 hover:bg-white/5 hover:text-white">
            <Sparkles size={14} />
            Ask Vishwakarma
          </Link>
        </header>
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-10">
          <div className="mb-8 max-w-3xl">
            <div className="mb-3 text-xs font-medium text-white/35">{eyebrow}</div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/45">{description}</p>
          </div>
          {children ?? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Sparkles size={17} />
                </div>
                <div>
                  <div className="text-sm font-medium">Workspace ready</div>
                  <div className="text-xs text-white/35">Use the tools in this workspace or ask Vishwakarma for help.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
