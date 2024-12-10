import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
    const { user } = useAuth();
    const [progress, setProgress] = useState({});

    const fetchUserProgress = useCallback(async () => {
        try {
            const response = await fetch('/api/progress', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            setProgress(data);
        } catch (error) {
            console.error('Error fetching progress:', error);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchUserProgress();
        }
    }, [user, fetchUserProgress]);

    const updateProgress = async (topicId, moduleId, completed) => {
        try {
            const response = await fetch('/api/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ topicId, moduleId, completed })
            });
            const data = await response.json();
            setProgress(prev => ({
                ...prev,
                [topicId]: {
                    ...prev[topicId],
                    [moduleId]: completed
                }
            }));
            return data;
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    return (
        <ProgressContext.Provider value={{ progress, updateProgress }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
}; 