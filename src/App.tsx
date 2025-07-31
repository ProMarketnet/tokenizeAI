import React from 'react';
import ChatInterface from './components/ChatInterface';
import { ChatProvider } from './context/ChatContext';
import { BlockProvider } from './context/BlockContext';

function App() {
  return (
    <div className="App h-screen bg-background">
      <ChatProvider>
        <BlockProvider>
          <ChatInterface />
        </BlockProvider>
      </ChatProvider>
    </div>
  );
}

export default App;
