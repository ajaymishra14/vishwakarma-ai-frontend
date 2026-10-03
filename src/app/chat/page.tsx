"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles, MoreHorizontal, Trash2 } from "lucide-react";

import Sidebar from "@/components/sidebar/Sidebar";
import MessageList from "@/components/chat/MessageList";
import ChatComposer from "@/components/chat/ChatComposer";
import { useChatStore } from "@/lib/chat-store";

export default function ChatPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const conversations = useChatStore(
    (state) => state.conversations
  );

  const activeConversationId = useChatStore(
    (state) => state.activeConversationId
  );

  const createConversation = useChatStore(
    (state) => state.createConversation
  );

  const addMessage = useChatStore(
    (state) => state.addMessage
  );

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (conversation) =>
          conversation.id === activeConversationId
      ),
    [conversations, activeConversationId]
  );

  useEffect(() => {
    if (!activeConversationId && conversations.length === 0) {
      createConversation();
    }
  }, [
    activeConversationId,
    conversations.length,
    createConversation,
  ]);

  const sendMessage = (content: string) => {
    const userMessage = content.trim();

    if (!userMessage || isGenerating) return;

    addMessage("user", userMessage);
    setIsGenerating(true);

    window.setTimeout(() => {
      addMessage(
        "assistant",
        `I received your request:

> ${userMessage}

Vishwakarma frontend is ready for the real inference connection.`
      );

      setIsGenerating(false);
    }, 700);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0d10] text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <Sparkles size={17} />

            <div>
              <div className="text-sm font-semibold">
                {activeConversation?.title ??
                  "New conversation"}
              </div>

              <div className="text-[11px] text-white/35">
                Vishwakarma AI
              </div>
            </div>
          </div>
        </header>

        <section className="min-h-0 flex-1 overflow-y-auto">
          {activeConversation?.messages.length ? (
            <MessageList
              messages={activeConversation.messages}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Sparkles size={25} />
                </div>

                <h1 className="text-2xl font-semibold">
                  Start with Vishwakarma
                </h1>

                <p className="mt-2 max-w-md text-sm text-white/40">
                  Ask a question, build software, find a bug,
                  analyze a file, or create an automation.
                </p>
              </div>
            </div>
          )}
        </section>

        <ChatComposer
          onSend={sendMessage}
          isGenerating={isGenerating}
          onStop={() => setIsGenerating(false)}
        />
      </main>
    </div>
  );
}
