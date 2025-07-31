import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your TokenizeAI assistant. I help turn illiquid assets into tradeable tokens.\n\nWhat brings you here today? Are you looking to:\n• Get liquidity from company shares you own\n• Make your real estate investment tradeable\n• Convert partnership stakes into tokens\n• Something else entirely?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: "I understand you want to tokenize your assets. Let me help you with that process.\n\n(This is a demo - full AI integration coming soon!)",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

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
          {messages.map((msg: any) => (
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
                </div>
                <div className={`text-xs text-text-secondary mt-1 px-1 ${
                  msg.type === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
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
              />
            </div>
            
            <button
              type="submit"
              disabled={!message.trim()}
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
            <div className="bg-accent rounded-full h-2 w-1/4 transition-all duration-300"></div>
          </div>
          <p className="text-sm text-text-secondary mt-1">25% complete</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-semibold">Information Blocks</h3>
          <div className="bg-white border border-border rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg">🏢</span>
              <span className="font-semibold text-sm">Asset Details</span>
              <span className="bg-accent text-white text-xs px-2 py-1 rounded">[1]</span>
            </div>
            <p className="text-sm text-text-secondary">
              Information will appear here as we collect it through our conversation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
