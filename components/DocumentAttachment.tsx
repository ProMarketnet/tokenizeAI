import React from 'react';
import { Document } from '../types';
import { FileText, Download, Eye, CheckCircle, Clock, Edit } from 'lucide-react';

interface DocumentAttachmentProps {
  document: Document;
}

const DocumentAttachment: React.FC<DocumentAttachmentProps> = ({ document }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
      case 'signed':
      case 'executed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'draft':
        return <Edit className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
      case 'signed':
      case 'executed':
        return 'text-success';
      case 'draft':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready':
        return 'Ready for review';
      case 'signed':
        return 'Signed';
      case 'executed':
        return 'Executed';
      case 'draft':
        return 'Draft';
      default:
        return 'Processing';
    }
  };

  const handleView = () => {
    if (document.url) {
      window.open(document.url, '_blank');
    } else {
      // Handle document preview/view logic
      console.log('Viewing document:', document.id);
    }
  };

  const handleDownload = () => {
    if (document.url) {
      const link = document.createElement('a');
      link.href = document.url;
      link.download = document.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Handle document download logic
      console.log('Downloading document:', document.id);
    }
  };

  return (
    <div className="info-block">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0
