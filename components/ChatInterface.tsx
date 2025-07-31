import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Sidebar from './Sidebar';
import { aiResponseHandler } from '../services/aiService';
import { UI_CONSTANTS } from '../utils/constants';

const ChatInterface: React.FC = () => {
  const { state, addMessage, setTyping } = useChat();
  const [isMobile, setIsMobile] = useState(window.innerWidth < UI_CONSTANTS.MOBILE_BREAKPOINT);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < UI_CONSTANTS.MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage(content, 'user');
    
    // Show typing indicator
    setTyping(true);
    
    // Simulate realistic AI response delay
    const delay = UI_CONSTANTS.TYPING_DELAY_MIN + 
      Math.random() * (UI_CONSTANTS.TYPING_DELAY_MAX - UI_CONSTANTS.TYPING_DELAY_MIN);
    
    setTimeout(async () => {
      try {
        const response = await aiResponseHandler(content, state.currentStep);
        addMessage(response.content, 'ai', {
          blocks: response.blocks,
          buttons: response.buttons,
          documents: response.documents,
        });
      } catch (error) {
        addMessage(
          "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
          'ai'
        );
      }
    }, delay);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main Chat Area */}
      <div className={`flex flex-col ${isMobile ? 'w-full' : 'flex-1'}`}>
        {/* Header */}
        <header className="border-b border-border bg-background px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">TA</span>
            </div>
            <h1 className="text-lg font-semibold text-text-primary">TokenizeAI</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface">
              <span className="text-lg">⋯</span>
            </button>
            <button className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface">
              🔔
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <MessageList messages={state.messages} isTyping={state.isTyping} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      {/* Sidebar (Desktop only) */}
      {!isMobile && <Sidebar />}
    </div>
  );
};

export default ChatInterface;
