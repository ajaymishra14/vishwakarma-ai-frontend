"use client";

import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "@/types/chat";

type MessageListProps = {
  messages: ChatMessage[];
};

export default function MessageList({
  messages,
}: MessageListProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-8">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={`flex gap-3 ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            {!isUser && (
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                <Bot size={16} />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                isUser
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/[0.03] text-white/85"
              }`}
            >
              {isUser ? (
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}

              {message.status === "thinking" && (
                <div className="mt-2 flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50 delay-100" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50 delay-200" />
                </div>
              )}
            </div>

            {isUser && (
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <User size={16} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
