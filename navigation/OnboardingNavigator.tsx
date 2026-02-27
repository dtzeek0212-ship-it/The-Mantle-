import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TheCreedScreen } from '../screens/onboarding/TheCreedScreen';
import { CorePillarsScreen } from '../screens/onboarding/CorePillarsScreen';
import { CredBriefingScreen } from '../screens/onboarding/CredBriefingScreen';
import { TheSyncScreen } from '../screens/onboarding/TheSyncScreen';

const Stack = createNativeStackNavigator();

export const OnboardingStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen name="TheCreed" component={TheCreedScreen} />
            <Stack.Screen name="CorePillars" component={CorePillarsScreen} />
            <Stack.Screen name="CredBriefing" component={CredBriefingScreen} />
            <Stack.Screen name="TheSync" component={TheSyncScreen} />
        </Stack.Navigator>
    );
};
