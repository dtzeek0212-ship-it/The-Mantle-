import { useState, useCallback } from 'react';

// This hook abstracts the complexity of Apple HealthKit and Google Fit.
// Since standard Expo Go doesn't support these native modules without ejecting
// to a custom dev client, we simulate the authorization and data fetching process here.
export const useBiometrics = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [steps, setSteps] = useState<number>(0);
    const [recoveryScore, setRecoveryScore] = useState<number>(0);
    const [isSyncing, setIsSyncing] = useState(false);

    const authorizeAndSync = useCallback(async () => {
        setIsSyncing(true);

        // Simulate native permission dialog and data fetching delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate random realistic data for demonstration
        // Sometimes recovery is high (70-100), sometimes low (10-40) to test conditional logic
        const randomRecovery = Math.floor(Math.random() * 100);
        const randomSteps = Math.floor(Math.random() * 8000) + 2000;

        setIsAuthorized(true);
        setRecoveryScore(randomRecovery);
        setSteps(randomSteps);
        setIsSyncing(false);
    }, []);

    return {
        isAuthorized,
        isSyncing,
        steps,
        recoveryScore,
        authorizeAndSync,
    };
};
