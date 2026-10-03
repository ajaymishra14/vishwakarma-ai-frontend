"use client";

import { Sparkles } from "lucide-react";
import Sidebar from "@/components/sidebar/Sidebar";

type ModulePageProps = {
  title: string;
  description: string;
};

export default function ModulePage({
  title,
  description,
}: ModulePageProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0d10] text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
              <Sparkles size={16} />
            </div>
            <div>
              <h1 className="text-sm font-semibold">{title}</h1>
              <p className="text-[11px] text-white/35">
                Vishwakarma AI workspace
              </p>
            </div>
          </div>
        </header>

        <section className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-6">
          <div className="max-w-xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Sparkles size={25} />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              {description}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
