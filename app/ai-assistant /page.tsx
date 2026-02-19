/* =========================================================
   WIKIKISAN AI – COMPLETE SINGLE FILE IMPLEMENTATION
   Frontend API Client + Backend API Logic (Demo)
   ========================================================= */

/* =======================
   FRONTEND API CLIENT
   ======================= */

export interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: string
  metadata?: {
    intent?: string
    confidence?: number
  }
}

export interface Conversation {
  sessionId: string
  topic: string
  lastMessage: string
  lastActivity: string
}

export const assistantApi = {
  startConversation: async (language: string) => {
    return {
      sessionId: crypto.randomUUID(),
      welcomeMessage:
        language === "hi"
          ? "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?"
          : "Hello! I am your AI farming assistant.",
      suggestedQuestions: [
        "How to increase crop yield?",
        "Best fertilizer for rice?",
        "How to control pests naturally?",
      ],
    }
  },

  sendMessage: async (
    sessionId: string,
    message: string,
    language: string
  ) => {
    return {
      response: `🌾 AI Advice: ${message}`,
      intent: "farming_advice",
      confidence: 0.85,
      suggestedQuestions: [
        "What is drip irrigation?",
        "Best season for wheat?",
      ],
    }
  },

  getConversations: async () => {
    return {
      conversations: [
        {
          sessionId: "demo",
          topic: "Rice Farming",
          lastMessage: "Best fertilizer?",
          lastActivity: new Date().toISOString(),
        },
      ],
    }
  },

  getHistory: async (sessionId: string) => {
    return {
      messages: [],
    }
  },

  deleteConversation: async (sessionId: string) => {
    return { success: true }
  },

  sendFeedback: async (
    sessionId: string,
    messageId: string,
    rating: number
  ) => {
    return { success: true }
  },
}

/* =======================
   BACKEND LOGIC (MOCK)
   ======================= */

// In-memory storage (demo)
const conversations = new Map<string, Message[]>()

export function startConversation(language: string) {
  const sessionId = crypto.randomUUID()
  conversations.set(sessionId, [])

  return {
    sessionId,
    welcomeMessage:
      language === "hi"
        ? "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?"
        : "Hello! I am your AI farming assistant.",
    suggestedQuestions: [
      "How to increase crop yield?",
      "Best fertilizer for rice?",
      "How to control pests naturally?",
    ],
  }
}

export function sendMessage(
  sessionId: string,
  message: string
) {
  const chat = conversations.get(sessionId) || []

  chat.push({
    id: crypto.randomUUID(),
    text: message,
    sender: "user",
    timestamp: new Date().toISOString(),
  })

  const aiReply: Message = {
    id: crypto.randomUUID(),
    text: `🌾 AI Advice: ${message}`,
    sender: "assistant",
    timestamp: new Date().toISOString(),
    metadata: {
      intent: "farming_advice",
      confidence: 0.85,
    },
  }

  chat.push(aiReply)
  conversations.set(sessionId, chat)

  return {
    response: aiReply.text,
    intent: "farming_advice",
    confidence: 0.85,
    suggestedQuestions: [
      "What is drip irrigation?",
      "Best season for wheat?",
    ],
  }
}

export function getConversationHistory(sessionId: string) {
  return {
    messages: conversations.get(sessionId) || [],
  }
}

export function deleteConversation(sessionId: string) {
  conversations.delete(sessionId)
  return { success: true }
}

/* =======================
   END OF FILE
   ======================= */
