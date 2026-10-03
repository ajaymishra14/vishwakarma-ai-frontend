"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage, Conversation } from "@/types/chat";

type ChatStore = {
  conversations: Conversation[];
  activeConversationId: string | null;
  createConversation: () => string;
  setActiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  clearConversations: () => void;
  addMessage: (role: ChatMessage["role"], content: string) => string;
  updateMessage: (id: string, content: string) => void;
  setMessageStatus: (id: string, status: ChatMessage["status"]) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      conversations: [],
      activeConversationId: null,

      createConversation: () => {
        const now = Date.now();
        const id = uuidv4();
        const conversation: Conversation = {
          id,
          title: "New conversation",
          messages: [],
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          conversations: [...state.conversations, conversation],
          activeConversationId: id,
        }));

        return id;
      },

      setActiveConversation: (id) => {
        set((state) =>
          state.conversations.some((conversation) => conversation.id === id)
            ? { activeConversationId: id }
            : state
        );
      },

      deleteConversation: (id) => {
        set((state) => {
          const index = state.conversations.findIndex(
            (conversation) => conversation.id === id
          );
          if (index === -1) return state;

          const remaining = state.conversations.filter(
            (conversation) => conversation.id !== id
          );

          let nextActive = state.activeConversationId;
          if (nextActive === id) {
            nextActive =
              remaining[Math.max(0, index - 1)]?.id ??
              remaining[0]?.id ??
              null;
          }

          return {
            conversations: remaining,
            activeConversationId: nextActive,
          };
        });
      },

      clearConversations: () => {
        set({
          conversations: [],
          activeConversationId: null,
        });
      },

      addMessage: (role, content) => {
        const id = uuidv4();
        const now = Date.now();

        set((state) => {
          let conversationId = state.activeConversationId;
          let conversations = state.conversations;
          let conversation = conversations.find(
            (item) => item.id === conversationId
          );

          if (!conversation) {
            conversationId = uuidv4();
            conversation = {
              id: conversationId,
              title: "New conversation",
              messages: [],
              createdAt: now,
              updatedAt: now,
            };
            conversations = [...conversations, conversation];
          }

          const message: ChatMessage = {
            id,
            role,
            content,
            createdAt: now,
            status: "complete",
          };

          const title =
            conversation.title === "New conversation" && role === "user"
              ? content.trim().replace(/\s+/g, " ").slice(0, 48) || "New conversation"
              : conversation.title;

          const updatedConversation: Conversation = {
            ...conversation,
            title,
            messages: [...conversation.messages, message],
            updatedAt: now,
          };

          return {
            conversations: conversations.map((item) =>
              item.id === conversationId ? updatedConversation : item
            ),
            activeConversationId: conversationId,
          };
        });

        return id;
      },

      updateMessage: (id, content) => {
        set((state) => ({
          conversations: state.conversations.map((conversation) => ({
            ...conversation,
            messages: conversation.messages.map((message) =>
              message.id === id ? { ...message, content } : message
            ),
          })),
        }));
      },

      setMessageStatus: (id, status) => {
        set((state) => ({
          conversations: state.conversations.map((conversation) => ({
            ...conversation,
            messages: conversation.messages.map((message) =>
              message.id === id ? { ...message, status } : message
            ),
          })),
        }));
      },
    }),
    {
      name: "vishwakarma-ai-chat",
      version: 1,
      partialize: (state) => ({
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
      }),
    }
  )
);
