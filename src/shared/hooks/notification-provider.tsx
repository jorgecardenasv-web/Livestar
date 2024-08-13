'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification } from '../components/notification';
import { Portal } from '../components/portal';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
  hideNotification: () => void;
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
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);
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
    if (notification) {
      document.body.style.setProperty('--notification-height', '64px');
    } else {
      document.body.style.setProperty('--notification-height', '0px');
    }
  }, [notification]);

  const showNotification = (message: string, type: NotificationType = 'info') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {notification && (
        <Portal>
          <div 
            className="fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out"
            style={{ top: `${headerHeight}px` }}
          >
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={hideNotification}
            />
          </div>
        </Portal>
      )}
    </NotificationContext.Provider>
  );
};