import React, { createContext, useContext, useState, useCallback } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now().toString();
        setNotifications((prev) => [...prev, { id, message, type, duration }]);
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div
                aria-live="assertive"
                className="fixed inset-0 z-50 flex flex-col items-end gap-2 px-4 py-6 pointer-events-none sm:p-6 sm:items-end top-16"
            >
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        {...notification}
                        onClose={removeNotification}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
