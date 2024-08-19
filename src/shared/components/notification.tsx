import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationProps {
  message: string;
  type?: NotificationType;
  onClose: () => void;
}

const alertStyles: Record<NotificationType, string> = {
  info: 'bg-blue-800 text-blue-100',
  success: 'bg-green-800 text-green-100',
  warning: 'bg-yellow-800 text-yellow-100',
  error: 'bg-red-800 text-red-100',
};

export const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type = 'info', 
  onClose 
}) => {
  return (
    <div id='notification' className={`w-11/12 mx-auto rounded-md mt-5 ${alertStyles[type]} py-3 px-4 flex items-center`}>
      <div className="w-full flex items-center justify-between">
        <p className="text-sm font-medium">
          {message}
        </p>
        <button
          onClick={onClose}
          className="text-current hover:opacity-75 transition-opacity duration-200"
          aria-label="Close notification"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};