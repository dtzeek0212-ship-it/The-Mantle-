import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Rank = 'Rookie' | 'Veteran' | 'Legend';

interface HomeStats {
    paintColors?: string;
    filterSizes?: string;
    breakerBoxLogged?: boolean;
}

export interface UserSchema {
    username: string;
    credBalance: number;
    rank: Rank;
    homeStats: HomeStats;
    hasCompletedOnboarding: boolean;
}

interface UserContextType {
    user: UserSchema;
    setUser: React.Dispatch<React.SetStateAction<UserSchema>>;
    completeOnboarding: () => void;
    addCred: (amount: number) => void;
}

const defaultUser: UserSchema = {
    username: 'Guest',
    credBalance: 0,
    rank: 'Rookie',
    homeStats: {},
    hasCompletedOnboarding: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserSchema>(defaultUser);

    const completeOnboarding = () => {
        setUser((prev) => ({ ...prev, hasCompletedOnboarding: true }));
    };

    const addCred = (amount: number) => {
        setUser((prev) => ({ ...prev, credBalance: prev.credBalance + amount }));
    };

    return (
        <UserContext.Provider value={{ user, setUser, completeOnboarding, addCred }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
