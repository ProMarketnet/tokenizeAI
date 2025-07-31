import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { InfoBlock } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface BlockContextType {
  blocks: InfoBlock[];
  addBlock: (block: Omit<InfoBlock, 'id'>) => void;
  updateBlock: (id: string, data: Partial<InfoBlock>) => void;
  getBlock: (type: string) => InfoBlock | undefined;
}

const BlockContext = createContext<BlockContextType | undefined>(undefined);

type BlockAction =
  | { type: 'ADD_BLOCK'; payload: InfoBlock }
  | { type: 'UPDATE_BLOCK'; payload: { id: string; data: Partial<InfoBlock> } };

const blockReducer = (state: InfoBlock[], action: BlockAction): InfoBlock[] => {
  switch (action.type) {
    case 'ADD_BLOCK':
      return [...state, action.payload];
    case 'UPDATE_BLOCK':
      return state.map(block =>
        block.id === action.payload.id
          ? { ...block, ...action.payload.data }
          : block
      );
    default:
      return state;
  }
};

export const BlockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blocks, dispatch] = useReducer(blockReducer, []);

  const addBlock = (blockData: Omit<InfoBlock, 'id'>) => {
    const block: InfoBlock = {
      id: uuidv4(),
      ...blockData,
    };
    dispatch({ type: 'ADD_BLOCK', payload: block });
  };

  const updateBlock = (id: string, data: Partial<InfoBlock>) => {
    dispatch({ type: 'UPDATE_BLOCK', payload: { id, data } });
  };

  const getBlock = (type: string) => {
    return blocks.find(block => block.type === type);
  };

  return (
    <BlockContext.Provider value={{ blocks, addBlock, updateBlock, getBlock }}>
      {children}
    </BlockContext.Provider>
  );
};

export const useBlocks = () => {
  const context = useContext(BlockContext);
  if (context === undefined) {
    throw new Error('useBlocks must be used within a BlockProvider');
  }
  return context;
};
