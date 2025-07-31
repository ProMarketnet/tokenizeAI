import React from 'react';
import { MessageButton } from '../types';
import { useChat } from '../context/ChatContext';

interface MessageButtonsProps {
  buttons: MessageButton[];
}

const MessageButtons: React.FC<MessageButtonsProps> = ({ buttons }) => {
  const { addMessage } = useChat();

  const handleButtonClick = (button: MessageButton) => {
    addMessage(button.text, 'user');
  };

  return (
    <div className="space-y-2 max-w-sm">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => handleButtonClick(button)}
          className="w-full text-left p-3 border border-border rounded-lg hover:bg-surface hover:border-accent transition-all duration-200 group"
        >
          <div className="flex items-center space-x-3">
            {button.icon && (
              <span className="text-lg group-hover:scale-110 transition-transform">
                {button.icon}
              </span>
            )}
            <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
              {button.text}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MessageButtons;
