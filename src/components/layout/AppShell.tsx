"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Plus,
  Search,
  MessageSquare,
  FolderKanban,
  Code2,
  Bug,
  Workflow,
  Files,
  Settings,
  PanelLeftClose,
  Sparkles,
} from "lucide-react";

const navigation = [
  { label: "New chat", icon: Plus, href: "/chat" },
  { label: "Search", icon: Search, href: "/chat" },
  { label: "Chats", icon: MessageSquare, href: "/chat" },
  { label: "Projects", icon: FolderKanban, href: "/projects" },
  { label: "Code", icon: Code2, href: "/code" },
  { label: "Debug", icon: Bug, href: "/debug" },
  { label: "Automations", icon: Workflow, href: "/automations" },
  { label: "Files", icon: Files, href: "/files" },
];

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0d10] text-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-[270px]" : "w-0"
        } flex-shrink-0 overflow-hidden border-r border-white/10 bg-[#111318] transition-all duration-200`}
      >
        <div className="flex h-full w-[270px] flex-col">
          {/* Brand */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
                <Sparkles size={18} />
              </div>

              <div>
                <div className="text-sm font-semibold tracking-wide">
                  Vishwakarma AI
                </div>
                <div className="text-[11px] text-white/40">
                  Intelligent workspace
                </div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="my-5 h-px bg-white/10" />

            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">
              Recent
            </div>

            <div className="space-y-1">
              {[
                "Build Vishwakarma AI",
                "Debug transformer",
                "Frontend architecture",
              ].map((chat) => (
                <button
                  key={chat}
                  className="w-full truncate rounded-xl px-3 py-2 text-left text-sm text-white/50 hover:bg-white/5 hover:text-white"
                >
                  {chat}
                </button>
              ))}
            </div>
          </nav>

          {/* Bottom */}
          <div className="border-t border-white/10 p-3">
            <Link href="/settings" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white">
              <Settings size={18} />
              Settings
            </Link>

            <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                A
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm">Ajay</div>
                <div className="truncate text-[11px] text-white/35">
                  Vishwakarma AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white"
              >
                <Menu size={20} />
              </button>
            )}

            <div>
              <div className="text-sm font-medium">New conversation</div>
              <div className="text-[11px] text-white/35">
                Vishwakarma Intelligence
              </div>
            </div>
          </div>

          <button className="rounded-lg px-3 py-2 text-xs text-white/50 hover:bg-white/5 hover:text-white">
            Share
          </button>
        </header>

        {/* Workspace */}
        <section className="flex flex-1 items-center justify-center overflow-hidden">
          <div className="w-full max-w-3xl px-6">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Sparkles size={26} />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight">
                What can Vishwakarma do for you?
              </h1>

              <p className="mt-3 text-sm text-white/40">
                Build software, find bugs, automate tasks, analyze files, and
                work with your projects.
              </p>
            </div>

            {/* Composer */}
            <div className="rounded-2xl border border-white/10 bg-[#15181e] p-3 shadow-2xl">
              <textarea
                placeholder="Ask Vishwakarma anything..."
                className="min-h-[100px] w-full resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/25"
              />

              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-center gap-1">
                  <button className="rounded-lg p-2 text-white/45 hover:bg-white/5 hover:text-white">
                    <Files size={18} />
                  </button>

                  <button className="rounded-lg p-2 text-white/45 hover:bg-white/5 hover:text-white">
                    <Code2 size={18} />
                  </button>
                </div>

                <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition hover:bg-white/85">
                  <Sparkles size={17} />
                </button>
              </div>
            </div>

            {/* Capabilities */}
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ["Build", Code2],
                ["Debug", Bug],
                ["Automate", Workflow],
                ["Analyze", Search],
              ].map(([label, Icon]) => (
                <button
                  key={String(label)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-left text-xs text-white/50 hover:bg-white/[0.05] hover:text-white"
                >
                  {Icon && <Icon size={15} />}
                  {String(label)}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
