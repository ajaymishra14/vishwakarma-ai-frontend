export type MessageRole = "user" | "assistant" | "system";

export type MessageStatus =
  | "idle"
  | "thinking"
  | "streaming"
  | "complete"
  | "error";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
  status?: MessageStatus;
};

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};
