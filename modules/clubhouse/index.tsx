import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/Icon';

// Mock Screens for Top Tabs
import { LivePulseScreen } from './screens/LivePulseScreen';
import { TheTailgateScreen } from './screens/TheTailgateScreen';
import { MantleTalkScreen } from './screens/MantleTalkScreen';
import { RadarDashboardScreen } from './screens/radar/RadarDashboardScreen';

const Stack = createNativeStackNavigator();

export const ClubhouseDashboard = () => {
    const [activeTab, setActiveTab] = useState<'PULSE' | 'THE TAILGATE' | 'HUDDLES' | 'THE RADAR'>('PULSE');

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.headerSpacer} />
            <View style={styles.header}>
                <View style={styles.logoRow}>
                    <Icon name="Radio" size={24} color={colors.clubhouseAccent} />
                    <Text style={styles.headerTitle}>THE CLUBHOUSE</Text>
                </View>
                <TouchableOpacity style={styles.actionBtn}>
                    <Icon name="Plus" size={20} color="#121212" />
                </TouchableOpacity>
            </View>

            {/* Top Tab Navigator Shell */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'PULSE' && styles.activeTab]}
                    onPress={() => setActiveTab('PULSE')}
                >
                    <Text style={[styles.tabText, activeTab === 'PULSE' && styles.activeTabText]}>PULSE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'THE TAILGATE' && styles.activeTab]}
                    onPress={() => setActiveTab('THE TAILGATE')}
                >
                    <Text style={[styles.tabText, activeTab === 'THE TAILGATE' && styles.activeTabText]}>THE TAILGATE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'HUDDLES' && styles.activeTab]}
                    onPress={() => setActiveTab('HUDDLES')}
                >
                    <Text style={[styles.tabText, activeTab === 'HUDDLES' && styles.activeTabText]}>HUDDLES</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'THE RADAR' && styles.activeTabRadar]}
                    onPress={() => setActiveTab('THE RADAR')}
                >
                    <Text style={[styles.tabText, activeTab === 'THE RADAR' && styles.activeTabTextRadar]}>THE RADAR</Text>
                </TouchableOpacity>
            </View>

            {/* Dynamic Content Area */}
            <View style={styles.contentArea}>
                {activeTab === 'PULSE' && <LivePulseScreen />}
                {activeTab === 'THE TAILGATE' && <TheTailgateScreen />}
                {activeTab === 'HUDDLES' && <MantleTalkScreen />}
                {activeTab === 'THE RADAR' && <RadarDashboardScreen />}
            </View>
        </View>
    );
};

export const ClubhouseStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen name="ClubhouseDashboard" component={ClubhouseDashboard} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerSpacer: {
        height: 60,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#121212',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        ...typography.brand,
        fontSize: 24,
        color: '#FFF',
        marginLeft: 12,
        letterSpacing: 2,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.clubhouseAccent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#1A1A1A',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: colors.clubhouseAccent,
    },
    tabText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    activeTabText: {
        color: colors.clubhouseAccent,
    },
    activeTabRadar: {
        borderBottomColor: colors.radarNeon,
    },
    activeTabTextRadar: {
        color: colors.radarNeon,
    },
    contentArea: {
        flex: 1,
    }
});
