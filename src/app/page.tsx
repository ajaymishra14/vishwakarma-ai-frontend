"use client";

import Link from "next/link";
import { ArrowRight, Bug, Code2, Files, Sparkles, Workflow } from "lucide-react";
import Sidebar from "@/components/sidebar/Sidebar";
import { useChatStore } from "@/lib/chat-store";

const capabilities = [
  { title: "Build software", description: "Plan, write, refactor, and review code.", icon: Code2, href: "/code" },
  { title: "Find bugs", description: "Trace failures across code and project structure.", icon: Bug, href: "/debug" },
  { title: "Automate work", description: "Turn repeatable tasks into workflows.", icon: Workflow, href: "/automations" },
  { title: "Work with files", description: "Organize and inspect project files.", icon: Files, href: "/files" },
];

export default function Home() {
  const createConversation = useChatStore((state) => state.createConversation);

  return (
    <div className="flex min-h-screen bg-[#0b0d10] text-white">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-5 py-12 md:px-10">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Sparkles size={28} />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">Vishwakarma Intelligence</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Build. Debug. Automate.</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/40">A unified workspace for software development, debugging, files, projects, and automation.</p>
          </div>

          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-[#15181e] p-3 shadow-2xl">
            <Link href="/chat" onClick={() => createConversation()} className="group flex min-h-28 flex-col justify-between rounded-xl p-3">
              <div className="text-sm text-white/35">Start a new conversation</div>
              <div className="flex items-center justify-between">
                <span className="text-base text-white/70">What are you building today?</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition group-hover:scale-105"><ArrowRight size={17} /></span>
              </div>
            </Link>
          </div>

          <div className="mx-auto mt-4 grid w-full max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ title, description, icon: Icon, href }) => (
              <Link key={title} href={href} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.05]">
                <Icon size={17} className="mb-4 text-white/70" />
                <div className="text-sm font-medium">{title}</div>
                <div className="mt-1 text-xs leading-5 text-white/35">{description}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
