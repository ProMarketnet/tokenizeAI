import React from 'react';
import { useBlocks } from '../context/BlockContext';
import InfoBlockComponent from './InfoBlock';

const Sidebar: React.FC = () => {
  const { blocks } = useBlocks();

  const completionPercentage = blocks.length > 0 
    ? Math.round((blocks.filter(b => b.status === 'complete' || b.status === 'verified').length / blocks.length) * 100)
    : 0;

  return (
    <div className="w-80 border-l border-border bg-surface p-4 overflow-y-auto">
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
        {blocks.length === 0 ? (
          <p className="text-sm text-text-secondary">
            Information will appear here as we collect it through our conversation.
          </p>
        ) : (
          blocks.map((block) => (
            <InfoBlockComponent key={block.id} block={block} />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
