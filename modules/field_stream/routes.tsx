import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { FieldStreamScreen } from './index';
import { TrackerAIScreen } from './screens/TrackerAIScreen';
import { HarvestLogScreen } from './screens/HarvestLogScreen';
import { TrailheadDashboardScreen } from './screens/trailhead/TrailheadDashboardScreen';
import { colors } from '../../theme/colors';

const Stack = createNativeStackNavigator();

export const FieldStreamStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
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
                component={FieldStreamScreen}
                options={{ headerShown: false }} // Custom header implemented inside
            />
            <Stack.Screen
                name="TrackerAI"
                component={TrackerAIScreen}
                options={{ title: 'Tracker AI' }}
            />
            <Stack.Screen
                name="HarvestLog"
                component={HarvestLogScreen}
                options={{ title: 'Harvest Log' }}
            />
            <Stack.Screen
                name="TrailheadDashboard"
                component={TrailheadDashboardScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
