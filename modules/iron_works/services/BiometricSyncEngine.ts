export interface BiometricData {
    readinessScore: number;
    sleepHours: number;
    hrv: number; // Heart Rate Variability
    restingHr: number;
    lastSync: Date;
}

export const fetchBiometricData = async (): Promise<BiometricData> => {
    // Simulate Apple HealthKit / Garmin API latency
    return new Promise((resolve) => {
        setTimeout(() => {
            // Generate a slightly randomized readiness score to test dynamic UI
            const isReady = Math.random() > 0.4;
            const score = isReady ? Math.floor(Math.random() * 20) + 75 : Math.floor(Math.random() * 20) + 15;

            resolve({
                readinessScore: score,
                sleepHours: isReady ? 7.5 : 4.2,
                hrv: isReady ? 65 : 32,
                restingHr: isReady ? 48 : 62,
                lastSync: new Date(),
            });
        }, 1200);
    });
};
