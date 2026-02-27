import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

export const TheBooks = () => {
    const oddsData = [
        { id: 'gm1', matchup: 'KC @ PHI', spread: 'KC -3.5', total: 'O/U 49.5', ml: 'KC -175 | PHI +150', publicLean: 'KC', publicPercent: 68 },
        { id: 'gm2', matchup: 'SF @ DAL', spread: 'SF -4.5', total: 'O/U 46.0', ml: 'SF -210 | DAL +180', publicLean: 'DAL', publicPercent: 55 },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Icon name="LineChart" size={20} color="#00FF41" />
                <Text style={styles.sectionTitle}>THE BOOKS</Text>
            </View>

            {oddsData.map(game => (
                <View key={game.id} style={styles.oddsCard}>
                    <Text style={styles.matchupText}>{game.matchup}</Text>

                    <View style={styles.oddsRow}>
                        <View style={styles.oddsBox}>
                            <Text style={styles.oddsLabel}>SPREAD</Text>
                            <Text style={styles.oddsValue}>{game.spread}</Text>
                        </View>
                        <View style={styles.oddsBox}>
                            <Text style={styles.oddsLabel}>TOTAL</Text>
                            <Text style={styles.oddsValue}>{game.total}</Text>
                        </View>
                        <View style={styles.oddsBox}>
                            <Text style={styles.oddsLabel}>MONEYLINE</Text>
                            <Text style={styles.oddsValue}>{game.ml}</Text>
                        </View>
                    </View>

                    <View style={styles.publicLeanContainer}>
                        <Text style={styles.oddsLabel}>THE PUBLIC LEAN (MANTLE CRED)</Text>
                        <View style={styles.leanBarBg}>
                            <View style={[styles.leanBarFill, { width: `${game.publicPercent}%` }]} />
                        </View>
                        <Text style={styles.leanText}>{game.publicPercent}% RIDING WITH {game.publicLean}</Text>
                    </View>
                </View>
            ))}
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
    oddsCard: {
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        marginBottom: 12,
    },
    matchupText: {
        fontFamily: 'Orbitron',
        fontSize: 14,
        color: '#FFF',
        marginBottom: 12,
    },
    oddsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    oddsBox: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: 4,
        padding: 8,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    oddsLabel: {
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    oddsValue: {
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#00FF41',
    },
    publicLeanContainer: {
        marginTop: 4,
    },
    leanBarBg: {
        height: 8,
        backgroundColor: '#333',
        borderRadius: 4,
        marginTop: 4,
        marginBottom: 6,
        overflow: 'hidden',
    },
    leanBarFill: {
        height: '100%',
        backgroundColor: '#00FF41',
        borderRadius: 4,
    },
    leanText: {
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: '#FFF',
        textAlign: 'right',
    }
});
