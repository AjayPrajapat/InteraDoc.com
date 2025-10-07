import { defineStore } from 'pinia';

const generateId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
};

export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user' | 'system';
  content: string;
  createdAt: string;
};

export type ConversationState = {
  messages: ChatMessage[];
  loading: boolean;
  templateId: string | null;
  answers: Record<string, unknown>;
  questionProgress: {
    current: number;
    total: number;
  };
};

export const useConversationStore = defineStore('conversation', {
  state: (): ConversationState => ({
    messages: [],
    loading: false,
    templateId: null,
    answers: {},
    questionProgress: {
      current: 0,
      total: 0
    }
  }),
  actions: {
    setTemplate(id: string | null, totalQuestions: number) {
      this.templateId = id;
      this.questionProgress.total = totalQuestions;
      this.questionProgress.current = 0;
      this.answers = {};
      this.messages = [];
      this.loading = false;
    },
    pushMessage(message: Omit<ChatMessage, 'createdAt' | 'id'>) {
      const newMessage: ChatMessage = {
        ...message,
        id: generateId(),
        createdAt: new Date().toISOString()
      };
      this.messages.push(newMessage);
    },
    updateLoading(value: boolean) {
      this.loading = value;
    },
    updateAnswer(questionId: string, value: unknown) {
      this.answers = {
        ...this.answers,
        [questionId]: value
      };
    },
    advanceProgress() {
      if (this.questionProgress.current < this.questionProgress.total) {
        this.questionProgress.current += 1;
      }
    }
  }
});
