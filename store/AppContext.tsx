import React, { createContext, useState, useContext, ReactNode } from 'react';

// Defines the topics a user could currently be engaged with
export type AppTopicContext = 'general' | 'plumbing' | 'fitness' | 'sports';

interface AppContextType {
    credBalance: number;
    setCredBalance: React.Dispatch<React.SetStateAction<number>>;
    activeContext: AppTopicContext;
    setActiveContext: React.Dispatch<React.SetStateAction<AppTopicContext>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Start the user with 1000 Cred points
    const [credBalance, setCredBalance] = useState<number>(1000);

    // Track what the user is doing to serve native contextual ads
    const [activeContext, setActiveContext] = useState<AppTopicContext>('general');

    return (
        <AppContext.Provider
            value={{
                credBalance,
                setCredBalance,
                activeContext,
                setActiveContext,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
