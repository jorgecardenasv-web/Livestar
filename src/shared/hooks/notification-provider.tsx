import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Notification } from '../components/notification';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationItem {
  id: number;
  message: string;
  type: NotificationType;
  timeout: number;
}

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType, timeout?: number) => void;
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
  defaultTimeout?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ 
  children, 
  defaultTimeout = 5000
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const showNotification = useCallback((
    message: string, 
    type: NotificationType = 'info',
    timeout: number = defaultTimeout
  ) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, timeout }]);

    setTimeout(() => {
      hideNotification(id);
    }, timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTimeout]);

  const hideNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

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
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
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
      {children}
    </NotificationContext.Provider>
  );
};