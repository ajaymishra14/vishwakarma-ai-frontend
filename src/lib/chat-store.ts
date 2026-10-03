"use client";

import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage, Conversation } from "@/types/chat";

type ChatStore = {
  conversations: Conversation[];
  activeConversationId: string | null;

  createConversation: () => string;
  setActiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;

  addMessage: (
    role: ChatMessage["role"],
    content: string
  ) => string;

  updateMessage: (id: string, content: string) => void;

  setMessageStatus: (
    id: string,
    status: ChatMessage["status"]
  ) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
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
    set({ activeConversationId: id });
  },

  deleteConversation: (id) => {
    set((state) => {
      const remaining = state.conversations.filter(
        (conversation) => conversation.id !== id
      );

      return {
        conversations: remaining,
        activeConversationId:
          state.activeConversationId === id
            ? remaining[remaining.length - 1]?.id ?? null
            : state.activeConversationId,
      };
    });
  },

  addMessage: (role, content) => {
    const id = uuidv4();
    const now = Date.now();

    set((state) => {
      let conversationId = state.activeConversationId;

      if (!conversationId) {
        conversationId = uuidv4();
      }

      let conversations = state.conversations;
      let conversation = conversations.find(
        (item) => item.id === conversationId
      );

      if (!conversation) {
        conversation = {
          id: conversationId,
          title:
            role === "user"
              ? content.slice(0, 40)
              : "New conversation",
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

      const updatedConversation: Conversation = {
        ...conversation,
        title:
          conversation.title === "New conversation" && role === "user"
            ? content.slice(0, 40)
            : conversation.title,
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
          message.id === id
            ? { ...message, content }
            : message
        ),
      })),
    }));
  },

  setMessageStatus: (id, status) => {
    set((state) => ({
      conversations: state.conversations.map((conversation) => ({
        ...conversation,
        messages: conversation.messages.map((message) =>
          message.id === id
            ? { ...message, status }
            : message
        ),
      })),
    }));
  },
}));
