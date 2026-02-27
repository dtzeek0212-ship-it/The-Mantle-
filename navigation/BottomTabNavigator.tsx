import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { Icon } from '../components/Icon';
import { DeerAntlerIcon } from '../components/DeerAntlerIcon';

import { WorkshopScreen } from '../modules/workshop';
import { CommandCenterScreen } from '../modules/command_center';
import { FieldStreamScreen } from '../modules/field_stream';
import { FieldStreamStack } from '../modules/field_stream/routes';
import { IronWorksStack } from '../modules/iron_works/routes';
import { ClubhouseNavigator } from '../modules/clubhouse/routes';
import { ProShopStack } from '../modules/pro_shop';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Field & Stream') {
                        return <DeerAntlerIcon size={size} color={color} />;
                    }

                    let iconName: React.ComponentProps<typeof Icon>['name'] = 'Home';

                    if (route.name === 'Workshop') iconName = 'Wrench';
                    else if (route.name === 'Command Center') iconName = 'Activity';
                    else if (route.name === 'Iron Works') iconName = 'Dumbbell';
                    // The Clubhouse icon is now defined directly on its Tab.Screen
                    else if (route.name === 'Pro Shop') iconName = 'ShoppingCart';

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary, // Safety Orange
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                },
                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            })}
        >
            <Tab.Screen name="Workshop" component={WorkshopScreen} />
            <Tab.Screen name="Command Center" component={CommandCenterScreen} />
            <Tab.Screen name="Field & Stream" component={FieldStreamStack} />
            <Tab.Screen name="Iron Works" component={IronWorksStack} />
            <Tab.Screen
                name="TheClubhouse"
                component={ClubhouseNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="Radio" size={size} color={color} />
                    ),
                    tabBarActiveTintColor: colors.clubhouseAccent,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Pro Shop" // Changed from "ProShop" to "Pro Shop" to match existing name
                component={ProShopStack} // Changed component from ProShopScreen to ProShopStack
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="Package" size={size} color={color} />
                    ),
                    tabBarActiveTintColor: colors.proShopAccent,
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};
