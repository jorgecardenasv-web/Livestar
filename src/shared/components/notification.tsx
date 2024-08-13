'use client'

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationProps {
  message: string;
  type?: NotificationType;
  onClose: () => void;
}

const alertStyles: Record<NotificationType, string> = {
  info: 'bg-blue-900 text-blue-100',
  success: 'bg-green-900 text-green-100',
  warning: 'bg-yellow-900 text-yellow-100',
  error: 'bg-red-900 text-red-100',
};

export const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type = 'info', 
  onClose 
}) => {
  return (
    <div className={`w-full h-14 ${alertStyles[type]} py-2 px-4 grid items-center`}>
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm font-medium">
          {message}
        </p>
        <button
          onClick={onClose}
          className="text-current hover:opacity-75 transition-opacity duration-200"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};