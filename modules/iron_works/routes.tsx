import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';

import { IronWorksScreen } from './index';
import { TrainingProgramsScreen } from './screens/TrainingProgramsScreen';
import { ActiveWorkoutScreen } from './screens/ActiveWorkoutScreen';
import { FuelStationScreen } from './screens/FuelStationScreen';

export type IronWorksStackParamList = {
    Dashboard: undefined;
    TrainingPrograms: undefined;
    ActiveWorkout: undefined;
    FuelStation: undefined;
};

const Stack = createNativeStackNavigator<IronWorksStackParamList>();

export const IronWorksStack = () => {
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
                component={IronWorksScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TrainingPrograms"
                component={TrainingProgramsScreen}
                options={{ title: 'Protocol Select' }}
            />
            <Stack.Screen
                name="ActiveWorkout"
                component={ActiveWorkoutScreen}
                options={{ title: 'Live Session', presentation: 'fullScreenModal' }}
            />
            <Stack.Screen
                name="FuelStation"
                component={FuelStationScreen}
                options={{ title: 'Fuel Station' }}
            />
        </Stack.Navigator>
    );
};
