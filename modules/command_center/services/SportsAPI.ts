import sportsData from '../../../data/sports.json';

// In a real production environment, you would use an active API key here:
// const SPORTRADAR_API_KEY = process.env.EXPO_PUBLIC_SPORTRADAR_KEY;
// const RAPIDAPI_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY;

export interface LiveScore {
    id: string;
    league: string;
    awayTeam: string;
    awayScore: number;
    homeTeam: string;
    homeScore: number;
    status: string;
}

export interface UpcomingMatchup {
    id: string;
    league: string;
    awayTeam: string;
    homeTeam: string;
    time: string;
    odds: string;
}

export const fetchLiveScores = async (): Promise<LiveScore[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(sportsData.liveScores);
        }, 800);
    });
};

export const fetchUpcomingMatchups = async (): Promise<UpcomingMatchup[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(sportsData.upcomingMatchups);
        }, 1000);
    });
};
