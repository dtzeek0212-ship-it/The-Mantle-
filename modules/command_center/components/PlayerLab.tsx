import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

export const PlayerLab = () => {
    const [followedPlayers, setFollowedPlayers] = useState<string[]>([]);

    const toggleFollow = (playerId: string) => {
        if (followedPlayers.includes(playerId)) {
            setFollowedPlayers(prev => prev.filter(id => id !== playerId));
        } else {
            // Mock Fantasy Sync Haptic Flash
            Vibration.vibrate();
            setFollowedPlayers(prev => [...prev, playerId]);
        }
    };

    const propsData = [
        { id: 'p1', name: 'P. Mahomes', stat: 'Pass Yds', current: 284, target: 300, isUp: true },
        { id: 'p2', name: 'L. James', stat: 'Points', current: 28, target: 35, isUp: true },
        { id: 'p3', name: 'A. Judge', stat: 'Home Runs', current: 1, target: 1, isUp: false },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Icon name="FlaskConical" size={20} color="#00FF41" />
                <Text style={styles.sectionTitle}>THE PLAYER LAB</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.propsScroll}>
                {propsData.map(player => {
                    const isFollowed = followedPlayers.includes(player.id);
                    return (
                        <View key={player.id} style={styles.propCard}>
                            <View style={styles.propHeader}>
                                <Text style={styles.playerName}>{player.name}</Text>
                                <TouchableOpacity onPress={() => toggleFollow(player.id)}>
                                    <Icon name={isFollowed ? "Star" : "Star"} size={16} color={isFollowed ? "#00FF41" : colors.textSecondary} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.statLabel}>{player.stat}</Text>
                            <View style={styles.statRow}>
                                <Text style={styles.currentStat}>{player.current}</Text>
                                <Text style={styles.targetStat}>/ {player.target}</Text>
                            </View>
                            <View style={styles.trendRow}>
                                <Icon name={player.isUp ? "TrendingUp" : "TrendingDown"} size={14} color={player.isUp ? "#00FF41" : "#FF0033"} />
                                <Text style={[styles.trendText, { color: player.isUp ? '#00FF41' : '#FF0033' }]}>
                                    {player.isUp ? 'ON PACE' : 'FALLING BEHIND'}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

            {/* Injury Wire Ticker */}
            <View style={styles.injuryWire}>
                <Icon name="Activity" size={16} color="#FF0033" />
                <Text style={styles.injuryWireLabel}>INJURY WIRE:</Text>
                <Text style={styles.injuryWireText} numberOfLines={1}>
                    LAL Davis (Ankle) questionable to return. SF Samuel (Hamstring) out 2-3 weeks.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        ...typography.subheader,
        color: '#00FF41',
        fontFamily: 'Orbitron',
        fontSize: 16,
        marginLeft: 8,
    },
    propsScroll: {
        marginBottom: 12,
    },
    propCard: {
        width: 150,
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        marginRight: 12,
    },
    propHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    playerName: {
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
    },
    statLabel: {
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    currentStat: {
        fontFamily: 'Orbitron',
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    targetStat: {
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        marginLeft: 4,
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendText: {
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    injuryWire: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 51, 0.1)',
        borderWidth: 1,
        borderColor: '#FF0033',
        borderRadius: 4,
        padding: 8,
    },
    injuryWireLabel: {
        fontFamily: 'Orbitron',
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FF0033',
        marginLeft: 6,
        marginRight: 6,
    },
    injuryWireText: {
        flex: 1,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: '#FFF',
    }
});
