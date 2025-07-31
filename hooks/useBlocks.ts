import { useContext } from 'react';
import { BlockContext } from '../context/BlockContext';

export const useBlocks = () => {
  const context = useContext(BlockContext);
  if (context === undefined) {
    throw new Error('useBlocks must be used within a BlockProvider');
  }
  return context;
};
