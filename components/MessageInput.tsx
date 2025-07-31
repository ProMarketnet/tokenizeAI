import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { UI_CONSTANTS } from '../utils/constants';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && message.length <= UI_CONSTANTS.MAX_MESSAGE_LENGTH) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= UI_CONSTANTS.MAX_MESSAGE_LENGTH) {
      setMessage(value);
    }
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const characterCount = message.length;
  const isNearLimit = characterCount > UI_CONSTANTS.MAX_MESSAGE_LENGTH * 0.9;

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Message TokenizeAI..."
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent max-h-32 transition-all"
            rows={1}
          />
          
          {/* Character count */}
          {isNearLimit && (
            <div className="absolute bottom-1 left-2 text-xs text-text-secondary">
              {characterCount}/{UI_CONSTANTS.MAX_MESSAGE_LENGTH}
            </div>
          )}
          
          {/* Action buttons */}
          <div className="absolute right-2 bottom-2 flex space-x-1">
            <button
              type="button"
              className="p-1.5 text-text-secondary hover:text-text-primary rounded transition-colors"
              title="Voice message"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1.5 text-text-secondary hover:text-text-primary rounded transition-colors"
              title="Attach file"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!message.trim() || message.length > UI_CONSTANTS.MAX_MESSAGE_LENGTH}
          className="p-3 bg-accent text-white rounded-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
