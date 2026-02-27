import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, RefreshControl, Vibration } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { ScoreTicker } from './components/ScoreTicker';
import { PickEmCard } from './components/PickEmCard';
import { PlayerLab } from './components/PlayerLab';
import { TheBooks } from './components/TheBooks';
import { SportsNewsFeed } from './components/SportsNewsFeed';
import { FanLoadout } from './components/FanLoadout';
import { UpcomingMatchup, fetchUpcomingMatchups } from './services/SportsAPI';
import { Icon } from '../../components/Icon';
import { useAppContext } from '../../store/AppContext';

export const CommandCenterScreen = () => {
    const { credBalance, setCredBalance } = useAppContext();
    const [matchups, setMatchups] = useState<UpcomingMatchup[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Track user picks by matchup ID mapping to 'away' or 'home'
    const [picks, setPicks] = useState<Record<string, 'away' | 'home'>>({});

    const loadMatchups = async () => {
        const data = await fetchUpcomingMatchups();
        setMatchups(data);
        setLoading(false);
    };

    useEffect(() => {
        loadMatchups();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // Mock "Whistle" interaction
        Vibration.vibrate([0, 100, 50, 200]); // Short-long mock whistle pattern
        await loadMatchups();
        setRefreshing(false);
    }, []);

    const handlePick = (matchupId: string, pick: 'away' | 'home') => {
        // If the user already made this exact pick, do nothing or untoggle
        if (picks[matchupId] === pick) return;

        // If the user hasn't made a pick for this matchup yet, deduct Cred
        if (!picks[matchupId]) {
            if (credBalance >= 10) {
                setCredBalance(prev => prev - 10);
            } else {
                // Not enough Cred (In a real app, show an Alert)
                return;
            }
        }

        // Update the pick
        setPicks(prev => ({ ...prev, [matchupId]: pick }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Command Center</Text>
                <View style={styles.credBadge}>
                    <Icon name="Coins" size={16} color={colors.primary} />
                    <Text style={styles.credText}>{credBalance} Cred</Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#00FF41"
                        colors={["#00FF41"]} // Android
                    />
                }
            >
                <ScoreTicker />

                <View style={styles.content}>
                    <PlayerLab />
                    <TheBooks />

                    <Text style={[styles.sectionTitle, { color: '#00FF41', fontFamily: 'Orbitron' }]}>PICK-EM: UPCOMING MATCHUPS</Text>

                    {loading ? (
                        <View style={styles.skeletonContainer}>
                            <View style={[styles.skeletonBlock, { height: 120 }]} />
                            <View style={[styles.skeletonBlock, { height: 120 }]} />
                        </View>
                    ) : (
                        <View style={styles.pickEmContainer}>
                            {matchups.map(item => (
                                <PickEmCard
                                    key={item.id}
                                    matchup={item}
                                    selectedPick={picks[item.id] || null}
                                    onPick={(pick) => handlePick(item.id, pick)}
                                />
                            ))}
                        </View>
                    )}

                    <FanLoadout />
                    <SportsNewsFeed />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 48, // Safe area padding rough estimate
        paddingBottom: 16,
        backgroundColor: colors.surface,
    },
    headerTitle: {
        ...typography.header,
    },
    credBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 102, 0, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    credText: {
        ...typography.subheader,
        fontFamily: 'Roboto Mono',
        color: colors.primary,
        marginLeft: 6,
        fontSize: 14,
    },
    scrollContainer: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        ...typography.subheader,
        marginBottom: 16,
        fontSize: 16,
    },
    pickEmContainer: {
        marginBottom: 24,
    },
    skeletonContainer: {
        marginBottom: 24,
    },
    skeletonBlock: {
        backgroundColor: '#333',
        borderRadius: 8,
        marginBottom: 12,
        opacity: 0.5,
    }
});
