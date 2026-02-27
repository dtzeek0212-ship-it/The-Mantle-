export interface WeatherData {
    temperature: number;
    windDirection: string;
    windSpeed: number;
    barometricPressure: number;
    moonPhase: string;
    activityLevel: 'Low' | 'Moderate' | 'Peak';
}

export const fetchOutdoorData = async (): Promise<WeatherData> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock API Response
    return {
        temperature: 42,
        windDirection: 'NW',
        windSpeed: 12,
        barometricPressure: 29.8,
        moonPhase: 'Waning Gibbous',
        activityLevel: 'Peak',
    };
};
