import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="message-bubble-ai">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
            <div 
              className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" 
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div 
              className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" 
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
          <span className="text-sm text-text-secondary ml-2">TokenizeAI is typing...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
