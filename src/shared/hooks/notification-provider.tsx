'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Notification } from '../components/notification';
import { Portal } from '../components/portal';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationItem {
  id: number;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
  hideNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.getBoundingClientRect().height);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  useEffect(() => {
    document.body.style.setProperty('--notification-height', notifications.length ? '64px' : '0px');
  }, [notifications]);

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    setNotifications(prev => [...prev, { id: Date.now(), message, type }]);
  }, []);

  const hideNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <Portal>
        <div 
          className="fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out"
          style={{ top: `${headerHeight}px` }}
        >
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => hideNotification(notification.id)}
            />
          ))}
        </div>
      </Portal>
    </NotificationContext.Provider>
  );
};