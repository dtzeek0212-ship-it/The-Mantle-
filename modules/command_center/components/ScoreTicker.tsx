import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { LiveScore, fetchLiveScores } from '../services/SportsAPI';

export const ScoreTicker = () => {
    const [scores, setScores] = useState<LiveScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const loadScores = async () => {
            const data = await fetchLiveScores();
            setScores(data);
            setLoading(false);
        };
        loadScores();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color="#00FF41" />
            </View>
        );
    }

    const renderDeepDive = (item: LiveScore) => {
        return (
            <View style={styles.deepDiveContainer}>
                <Text style={styles.deepDiveTitle}>LIVE PULSE: DEEP DIVE</Text>

                {/* Win Probability Graph Mock */}
                <View style={styles.graphContainer}>
                    <Text style={styles.graphLabel}>WIN PROBABILITY</Text>
                    <View style={styles.probBarContainer}>
                        <View style={[styles.probAway, { width: '40%' }]}><Text style={styles.probText}>{item.awayTeam} 40%</Text></View>
                        <View style={[styles.probHome, { width: '60%' }]}><Text style={styles.probText}>{item.homeTeam} 60%</Text></View>
                    </View>
                </View>

                {/* Momentum Meter Mock */}
                <View style={styles.graphContainer}>
                    <Text style={styles.graphLabel}>MOMENTUM METER (LAST 5 MIN)</Text>
                    <View style={styles.momentumContainer}>
                        {/* Mocking recent momentum shifts */}
                        <View style={[styles.momentumBlock, { backgroundColor: '#FF0033' }]} />
                        <View style={[styles.momentumBlock, { backgroundColor: '#333' }]} />
                        <View style={[styles.momentumBlock, { backgroundColor: '#333' }]} />
                        <View style={[styles.momentumBlock, { backgroundColor: '#00FF41' }]} />
                        <View style={[styles.momentumBlock, { backgroundColor: '#00FF41' }]} />
                        <View style={[styles.momentumBlock, { backgroundColor: '#00FF41' }]} />
                        <Text style={styles.momentumAlert}> {item.homeTeam} IS SURGING</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>TOP GAMES</Text>
            <FlatList
                data={scores}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const isExpanded = expandedId === item.id;
                    return (
                        <TouchableOpacity
                            style={[styles.scoreBox, isExpanded && styles.scoreBoxExpanded]}
                            onPress={() => setExpandedId(isExpanded ? null : item.id)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.scoreBoxInner}>
                                <Text style={styles.leagueText}>{item.league}</Text>
                                <View style={styles.teamRow}>
                                    <Text style={styles.teamText}>{item.awayTeam}</Text>
                                    <Text style={styles.scoreText}>{item.awayScore}</Text>
                                </View>
                                <View style={styles.teamRow}>
                                    <Text style={styles.teamText}>{item.homeTeam}</Text>
                                    <Text style={styles.scoreText}>{item.homeScore}</Text>
                                </View>
                                <Text style={styles.statusText}>{item.status}</Text>
                            </View>
                            {isExpanded && renderDeepDive(item)}
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderColor: colors.border,
        paddingVertical: 12,
    },
    sectionHeader: {
        ...typography.subheader,
        color: '#00FF41',
        fontFamily: 'Orbitron',
        paddingHorizontal: 16,
        marginBottom: 8,
        fontSize: 14,
    },
    loaderContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    scoreBox: {
        width: 160,
        backgroundColor: colors.background,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        marginHorizontal: 8,
        overflow: 'hidden',
    },
    scoreBoxExpanded: {
        width: 320, // Double width to fit deep dive
        borderColor: '#00FF41',
    },
    scoreBoxInner: {
        padding: 12,
    },
    leagueText: {
        ...typography.body,
        fontSize: 10,
        fontFamily: 'Orbitron',
        fontWeight: 'bold',
        color: '#00FF41', // Stadium Green
        marginBottom: 6,
    },
    teamRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    teamText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
        fontWeight: 'bold',
    },
    scoreText: {
        ...typography.body,
        fontFamily: 'Orbitron',
        color: '#FFF',
        fontWeight: 'bold',
    },
    statusText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        marginTop: 6,
        color: colors.textSecondary,
        textAlign: 'right',
    },
    deepDiveContainer: {
        padding: 12,
        backgroundColor: '#1A1A1A',
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    deepDiveTitle: {
        fontFamily: 'Orbitron',
        fontSize: 12,
        color: '#FFF',
        marginBottom: 12,
    },
    graphContainer: {
        marginBottom: 12,
    },
    graphLabel: {
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    probBarContainer: {
        flexDirection: 'row',
        height: 24,
        borderRadius: 4,
        overflow: 'hidden',
    },
    probAway: {
        backgroundColor: '#FF0033', // Buzzer Red
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 4,
    },
    probHome: {
        backgroundColor: '#00FF41', // Stadium Green
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 4,
    },
    probText: {
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: '#121212',
        fontWeight: 'bold',
    },
    momentumContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 16,
    },
    momentumBlock: {
        width: 12,
        height: 16,
        marginRight: 2,
        borderRadius: 2,
    },
    momentumAlert: {
        fontFamily: 'Orbitron',
        fontSize: 10,
        color: '#00FF41',
        marginLeft: 8,
    }
});
