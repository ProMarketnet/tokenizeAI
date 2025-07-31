import React, { useState } from 'react';
import claudeService, { InfoBlock, MessageButton } from './services/claudeService';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  blocks?: InfoBlock[];
  buttons?: MessageButton[];
}

function App() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [infoBlocks, setInfoBlocks] = useState<InfoBlock[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your TokenizeAI assistant. I help turn illiquid assets into tradeable tokens.\n\nWhat brings you here today? Are you looking to:\n• Get liquidity from company shares you own\n• Make your real estate investment tradeable\n• Convert partnership stakes into tokens\n• Something else entirely?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await claudeService.sendMessage(message);
      
      // Add any new blocks to our collection
      if (response.blocks && response.blocks.length > 0) {
        setInfoBlocks(prev => [...prev, ...response.blocks!]);
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        blocks: response.blocks,
        buttons: response.buttons
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = (button: MessageButton) => {
    setMessage(button.text);
    // Auto-send the button click
    setTimeout(() => {
      const event = new Event('submit') as any;
      handleSendMessage(event);
    }, 100);
  };

  const completionPercentage = infoBlocks.length > 0 
    ? Math.round((infoBlocks.filter(b => b.status === 'complete' || b.status === 'verified').length / infoBlocks.length) * 100)
    : Math.min(messages.length * 10, 100);

  return (
    <div className="h-screen bg-background flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">TA</span>
            </div>
            <h1 className="text-lg font-semibold text-text-primary">TokenizeAI</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
              ⋯
            </button>
            <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
              🔔
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.type === 'user' ? 'max-w-[70%]' : ''}`}>
                <div className={`px-4 py-3 rounded-message ${
                  msg.type === 'user' 
                    ? 'bg-accent text-white rounded-br-message-corner' 
                    : 'bg-surface text-text-primary rounded-bl-message-corner'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.content}
                  </div>
                  
                  {/* Info Blocks */}
                  {msg.blocks && msg.blocks.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.blocks.map((block) => (
                        <div key={block.id} className="bg-white border border-border rounded-lg p-3 text-text-primary">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold">{block.title}</span>
                              {block.sourceNumber && (
                                <span className="bg-accent text-white text-xs px-2 py-1 rounded">
                                  [{block.sourceNumber}]
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="space-y-1">
                            {Object.entries(block.data).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-xs">
                                <span className="text-text-secondary capitalize">{key}:</span>
                                <span className="font-medium">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Buttons */}
                {msg.buttons && msg.buttons.length > 0 && (
                  <div className="mt-2 space-y-2 max-w-sm">
                    {msg.buttons.map((button) => (
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
                )}
                
                <div className={`text-xs text-text-secondary mt-1 px-1 ${
                  msg.type === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-surface text-text-primary rounded-message rounded-bl-message-corner px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-text-secondary ml-2">TokenizeAI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border bg-background p-4">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Message TokenizeAI..."
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent max-h-32 transition-all"
                rows={1}
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="p-3 bg-accent text-white rounded-lg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <span className="text-sm">→</span>
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar (Desktop) */}
      <div className="hidden lg:block w-80 border-l border-border bg-surface p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Progress</h2>
          <div className="bg-border rounded-full h-2">
            <div 
              className="bg-accent rounded-full h-2 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-text-secondary mt-1">{completionPercentage}% complete</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-semibold">Information Blocks</h3>
          {infoBlocks.length === 0 ? (
            <div className="bg-white border border-border rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg">🏢</span>
                <span className="font-semibold text-sm">Asset Details</span>
              </div>
              <p className="text-sm text-text-secondary">
                Information will appear here as we collect it through our conversation.
              </p>
            </div>
          ) : (
            infoBlocks.map((block) => (
              <div key={block.id} className="bg-white border border-border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {block.type === 'asset' ? '🏢' : 
                       block.type === 'liquidity' ? '🎯' :
                       block.type === 'legal' ? '⚖️' :
                       block.type === 'compliance' ? '✅' :
                       block.type === 'token' ? '🪙' : '📋'}
                    </span>
                    <span className="font-semibold text-sm">{block.title}</span>
                    {block.sourceNumber && (
                      <span className="bg-accent text-white text-xs px-2 py-1 rounded">
                        [{block.sourceNumber}]
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    block.status === 'complete' || block.status === 'verified' ? 'text-success' : 'text-warning'
                  }`}>
                    {block.status}
                  </span>
                </div>
                <div className="space-y-2">
                  {Object.entries(block.data).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-sm font-medium text-text-primary">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
