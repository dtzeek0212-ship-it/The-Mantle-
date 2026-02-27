import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { UpcomingMatchup } from '../services/SportsAPI';

interface PickEmCardProps {
    matchup: UpcomingMatchup;
    selectedPick: 'away' | 'home' | null;
    onPick: (pick: 'away' | 'home') => void;
}

export const PickEmCard: React.FC<PickEmCardProps> = ({ matchup, selectedPick, onPick }) => {
    return (
        <Card style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.league}>{matchup.league}</Text>
                <Text style={styles.time}>{matchup.time}</Text>
            </View>

            <Text style={styles.odds}>{matchup.odds}</Text>

            <View style={styles.teamsRow}>
                <TouchableOpacity
                    style={[styles.teamBox, selectedPick === 'away' && styles.selectedBox]}
                    onPress={() => onPick('away')}
                >
                    <Text style={[styles.teamText, selectedPick === 'away' && styles.selectedText]}>{matchup.awayTeam}</Text>
                </TouchableOpacity>

                <Text style={styles.vsText}>VS</Text>

                <TouchableOpacity
                    style={[styles.teamBox, selectedPick === 'home' && styles.selectedBox]}
                    onPress={() => onPick('home')}
                >
                    <Text style={[styles.teamText, selectedPick === 'home' && styles.selectedText]}>{matchup.homeTeam}</Text>
                </TouchableOpacity>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    league: {
        ...typography.subheader,
        fontSize: 14,
        color: colors.commandCenterAccent,
    },
    time: {
        ...typography.body,
        fontSize: 12,
    },
    odds: {
        ...typography.body,
        textAlign: 'center',
        marginBottom: 12,
        fontWeight: 'bold',
    },
    teamsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    teamBox: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    selectedBox: {
        backgroundColor: colors.commandCenterAccent,
        borderColor: colors.commandCenterAccent,
    },
    vsText: {
        ...typography.body,
        marginHorizontal: 16,
        fontWeight: 'bold',
    },
    teamText: {
        ...typography.subheader,
    },
    selectedText: {
        color: '#FFF',
    },
});
