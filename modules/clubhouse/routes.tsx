import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';

import { ClubhouseStack } from './index';
import { DailyGrindFeed } from './components/DailyGrindFeed';
import { CredLeaderboardScreen } from './screens/CredLeaderboardScreen';
import { TailgateChecklistScreen } from './screens/radar/TailgateChecklistScreen';

export type ClubhouseStackParamList = {
    Dashboard: undefined;
    CredLeaderboard: undefined;
    TailgateChecklist: { eventTitle: string, category: string };
};

const Stack = createNativeStackNavigator<ClubhouseStackParamList>();

export const ClubhouseNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // This was added from the new code block
                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerTintColor: colors.textPrimary,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={ClubhouseStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CredLeaderboard"
                component={CredLeaderboardScreen}
                options={{ title: 'Cred & Drops' }}
            />
            <Stack.Screen
                name="TailgateChecklist"
                component={TailgateChecklistScreen}
                options={{ title: 'Squad Sync' }}
            />
        </Stack.Navigator>
    );
};
