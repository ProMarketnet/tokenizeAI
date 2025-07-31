import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message, ChatState } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ChatContextType {
  state: ChatState;
  addMessage: (content: string, type: 'user' | 'ai', options?: any) => void;
  setTyping: (typing: boolean) => void;
  updateCurrentStep: (step: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'UPDATE_STEP'; payload: string };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isTyping: false,
      };
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload,
      };
    case 'UPDATE_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    default:
      return state;
  }
};

const initialState: ChatState = {
  messages: [
    {
      id: uuidv4(),
      type: 'ai',
      content: "Hi! I'm your TokenizeAI assistant. I help turn illiquid assets into tradeable tokens.\n\nWhat brings you here today? Are you looking to:\n• Get liquidity from company shares you own\n• Make your real estate investment tradeable\n• Convert partnership stakes into tokens\n• Something else entirely?",
      timestamp: new Date(),
    }
  ],
  isTyping: false,
  currentStep: 'welcome',
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const addMessage = (content: string, type: 'user' | 'ai', options: any = {}) => {
    const message: Message = {
      id: uuidv4(),
      type,
      content,
      timestamp: new Date(),
      ...options,
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  const setTyping = (typing: boolean) => {
    dispatch({ type: 'SET_TYPING', payload: typing });
  };

  const updateCurrentStep = (step: string) => {
    dispatch({ type: 'UPDATE_STEP', payload: step });
  };

  return (
    <ChatContext.Provider value={{ state, addMessage, setTyping, updateCurrentStep }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
