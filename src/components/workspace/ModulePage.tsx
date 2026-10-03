"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

type ModulePageProps = {
  title: string;
  description: string;
};

export default function ModulePage({
  title,
  description,
}: ModulePageProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0b0d10] text-white">
      <header className="flex h-16 items-center border-b border-white/10 px-5">
        <button
          onClick={() => router.push("/")}
          className="mr-4 rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft size={19} />
        </button>

        <div>
          <h1 className="text-sm font-semibold">{title}</h1>
          <p className="text-[11px] text-white/35">
            Vishwakarma AI workspace
          </p>
        </div>
      </header>

      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
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
  );
}
