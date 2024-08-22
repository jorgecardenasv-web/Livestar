'use client'

import React, { useEffect } from 'react';
import { useNotificationStore } from '../store/notification-store';
import { Notification } from './notification';

export const NotificationContainer: React.FC = () => {
  const { notifications, hideNotification } = useNotificationStore();

  useEffect(() => {
    const notificationHeight = notifications.length * 64;
    document.body.style.paddingTop = `${notificationHeight}px`;
    document.body.style.transition = 'padding-top 0.3s ease-in-out';

    return () => {
      document.body.style.paddingTop = '';
      document.body.style.transition = '';
    };
  }, [notifications.length]);

  return (
    <div className="fixed top-0 left-0 right-0">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => hideNotification(notification.id)}
        />
      ))}
    </div>
  );
};