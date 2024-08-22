import { create } from 'zustand'

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationItem {
  id: number;
  message: string;
  type: NotificationType;
  timeout: number;
}

interface NotificationStore {
  notifications: NotificationItem[];
  showNotification: (message: string, type?: NotificationType, timeout?: number) => void;
  hideNotification: (id: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  showNotification: (message, type = 'info', timeout = 3000) => {
    const id = Date.now();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type, timeout }],
    }));
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, timeout);
  },
  hideNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));