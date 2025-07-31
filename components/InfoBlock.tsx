import React from 'react';
import { InfoBlock } from '../types';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface InfoBlockProps {
  block: InfoBlock;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ block }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'asset': return '🏢';
      case 'liquidity': return '🎯';
      case 'legal': return '⚖️';
      case 'compliance': return '✅';
      case 'token': return '🪙';
      default: return '📋';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'incomplete':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-error" />;
      default:
        return <Clock className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
      case 'verified':
        return 'text-success';
      case 'incomplete':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const formatValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  };

  return (
    <div className="info-block">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getIcon(block.type)}</span>
          <span className="font-semibold text-sm text-text-primary">{block.title}</span>
          {block.sourceNumber && (
            <span className="bg-accent text-white text-xs px-2 py-1 rounded font-medium">
              [{block.sourceNumber}]
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {getStatusIcon(block.status)}
          <span className={`text-xs font-medium capitalize ${getStatusColor(block.status)}`}>
            {block.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        {Object.entries(block.data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-start">
            <span className="text-sm text-text-secondary font-medium min-w-0 flex-shrink-0 mr-3">
              {formatKey(key)}:
            </span>
            <span className="text-sm font-medium text-text-primary text-right flex-1 min-w-0">
              {formatValue(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBlock;
