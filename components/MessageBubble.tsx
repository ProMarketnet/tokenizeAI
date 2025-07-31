import React from 'react';
import { Message } from '../types';
import InfoBlockComponent from './InfoBlock';
import MessageButtons from './MessageButtons';
import DocumentAttachment from './DocumentAttachment';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] ${isUser ? 'max-w-[70%]' : ''}`}>
        <div className={isUser ? 'message-bubble-user' : 'message-bubble-ai'}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
          
          {/* Info Blocks */}
          {message.blocks && message.blocks.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.blocks.map((block) => (
                <InfoBlockComponent key={block.id} block={block} />
              ))}
            </div>
          )}
          
          {/* Documents */}
          {message.documents && message.documents.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.documents.map((doc) => (
                <DocumentAttachment key={doc.id} document={doc} />
              ))}
            </div>
          )}
        </div>
        
        {/* Buttons (outside bubble) */}
        {message.buttons && message.buttons.length > 0 && (
          <div className="mt-2">
            <MessageButtons buttons={message.buttons} />
          </div>
        )}
        
        <div className={`text-xs text-text-secondary mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
