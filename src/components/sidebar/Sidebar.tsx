"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import {
  Sparkles,
  MessageSquare,
  Search,
  FolderKanban,
  Code2,
  Bug,
  Workflow,
  Files,
  Settings,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useChatStore } from "@/lib/chat-store";

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

export default function Sidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState<{name: string; photo: string | null}>({ name: "Ajay", photo: null });

  useEffect(() => {
    const load = () => setProfile({ name: localStorage.getItem("vishwakarma-profile-name") || "Ajay", photo: localStorage.getItem("vishwakarma-profile-photo") });
    load();
    window.addEventListener("vishwakarma-profile-updated", load);
    return () => window.removeEventListener("vishwakarma-profile-updated", load);
  }, []);

  const conversations = useChatStore(
    (state) => state.conversations
  );

  const createConversation = useChatStore(
    (state) => state.createConversation
  );

  const setActiveConversation = useChatStore(
    (state) => state.setActiveConversation
  );

  const deleteConversation = useChatStore(
    (state) => state.deleteConversation
  );

  return (
    <aside className="flex h-screen w-[270px] shrink-0 flex-col border-r border-white/10 bg-[#090b0e] text-white">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
          <Sparkles size={17} />
        </div>

        <span className="text-sm font-semibold">
          Vishwakarma AI
        </span>
      </div>

      <div className="p-3">
        <button
          onClick={() => createConversation()}
          className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white hover:bg-white/[0.08]"
        >
          <Plus size={18} />
          New chat
        </button>
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search size={14} className="pointer-events-none absolute left-3 top-2.5 text-white/25" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search chats" aria-label="Search chats" className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-white outline-none placeholder:text-white/25 focus:border-white/20" />
        </div>
      </div>

      <nav className="space-y-1 px-3">
        {navigation.slice(1).map((item) => {
          const Icon = item.icon;
          const active =
            item.href === pathname ||
            (item.label === "Chats" && pathname === "/chat");

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 min-h-0 flex-1 px-3">
        <div className="mb-2 px-3 text-[10px] font-medium uppercase tracking-wider text-white/25">
          Recent chats
        </div>

        <div className="max-h-full space-y-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="px-3 py-3 text-xs text-white/25">
              No conversations yet
            </p>
          ) : (
            conversations
              .slice()
              .reverse()
              .map((conversation) => (
                <div
                  key={conversation.id}
                  className="group flex items-center gap-1 rounded-lg hover:bg-white/5"
                >
                  <button
                    onClick={() =>
                      setActiveConversation(conversation.id)
                    }
                    className={`min-w-0 flex-1 truncate rounded-lg px-3 py-2 text-left text-xs hover:text-white ${activeConversationId === conversation.id ? "bg-white/10 text-white" : "text-white/50"}`}
                  >
                    {conversation.title}
                  </button>

                  <button
                    onClick={() =>
                      deleteConversation(conversation.id)
                    }
                    className="mr-1 hidden rounded p-1.5 text-white/25 hover:bg-white/10 hover:text-white group-hover:block"
                    aria-label="Delete conversation"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
          )}
        </div>
      </div>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 hover:bg-white/5 hover:text-white"
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>
    </aside>
  );
}
