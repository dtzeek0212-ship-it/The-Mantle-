import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { Card } from '../../../components/Card';

const MOCK_LEADERBOARD = [
    { rank: 1, user: 'E4_Mafia_Don', cred: 14500, avatar: 'https://i.pravatar.cc/100?img=33', title: 'Legend (Meme of the Week Winner)' },
    { rank: 2, user: 'GarageBrew', cred: 12200, avatar: 'https://i.pravatar.cc/100?img=11', title: 'Neon Member' },
    { rank: 3, user: 'ApexHunter_92', cred: 8900, avatar: 'https://i.pravatar.cc/100?img=68', title: 'Carbon Member' },
    { rank: 4, user: 'MondayMorningQB', cred: 4500, avatar: 'https://i.pravatar.cc/100?img=59', title: 'Bronze Member' },
    { rank: 5, user: 'DIY_Junkie', cred: 2100, avatar: 'https://i.pravatar.cc/100?img=15', title: 'Iron Member' },
];

export const CredLeaderboardScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.credWallet}>
                    <Icon name="Zap" size={24} color={colors.clubhouseAccent} />
                    <Text style={styles.credBalance}>4,250</Text>
                </View>
                <Text style={styles.walletLabel}>Your Garage Cred</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>The Mantle Legends</Text>
                <Text style={styles.sectionSubtitle}>Top earners this week. #1 pins the 'Meme of the Week'.</Text>

                {MOCK_LEADERBOARD.map((user) => {
                    const isLegend = user.rank === 1;

                    return (
                        <Card key={user.rank} style={styles.rankCard}>
                            <View style={styles.rankCol}>
                                <Text style={[styles.rankNumber, isLegend && { color: colors.clubhouseAccent }]}>
                                    #{user.rank}
                                </Text>
                            </View>

                            <View style={styles.userCol}>
                                <Image
                                    source={{ uri: user.avatar }}
                                    style={[styles.avatar, isLegend && styles.legendAvatar]}
                                />
                                <View>
                                    <Text style={[styles.username, isLegend && { color: colors.clubhouseAccent }]}>
                                        {user.user}
                                    </Text>
                                    <View style={styles.titleRow}>
                                        {isLegend && <Icon name="Award" size={12} color={colors.clubhouseAccent} />}
                                        <Text style={[styles.userTitle, isLegend && { color: colors.clubhouseAccent }]}>
                                            {user.title}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.credCol}>
                                <Text style={styles.credScore}>{user.cred}</Text>
                                <Text style={styles.credLabel}>CRED</Text>
                            </View>
                        </Card>
                    );
                })}

                {/* The Vault Ad injected via the Leaderboard flow */}
                <Text style={[styles.sectionTitle, { marginTop: 32 }]}>The Vault Drops</Text>
                <TouchableOpacity style={styles.dropCard}>
                    <View style={styles.dropHeader}>
                        <Icon name="Lock" size={16} color={colors.textSecondary} />
                        <Text style={styles.dropTag}>VAULT EXCLUSIVE</Text>
                    </View>
                    <Text style={styles.dropTitle}>Tactical Spatula (Matte Black)</Text>
                    <Text style={styles.dropDesc}>Unlock this limited edition drop with 10,000 Cred + $15. Only 500 minted. Perfect for the grill.</Text>

                    <View style={styles.dropFooter}>
                        <View style={styles.priceRow}>
                            <Icon name="Zap" size={16} color={colors.clubhouseAccent} />
                            <Text style={styles.credPrice}>10K </Text>
                            <Text style={styles.cashPrice}>+ $15.00</Text>
                        </View>
                        <Text style={styles.buyBtn}>UNLOCK NOW</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 32,
        backgroundColor: '#1A1A1A',
        borderBottomWidth: 1,
        borderBottomColor: colors.clubhouseAccent,
    },
    credWallet: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    credBalance: {
        fontFamily: 'Roboto Mono',
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.clubhouseAccent,
        marginLeft: 12,
        textShadowColor: 'rgba(57, 255, 20, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    walletLabel: {
        ...typography.body,
        fontFamily: 'Courier New',
        color: colors.textSecondary,
        marginTop: 8,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    sectionTitle: {
        ...typography.header,
        color: '#FFF',
    },
    sectionSubtitle: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 24,
    },
    rankCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 8,
    },
    rankCol: {
        width: 40,
        alignItems: 'center',
    },
    rankNumber: {
        ...typography.subheader,
        color: colors.textSecondary,
    },
    userCol: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    legendAvatar: {
        borderWidth: 2,
        borderColor: colors.clubhouseAccent,
    },
    username: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        color: '#FFF',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    userTitle: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontSize: 10,
        color: colors.textSecondary,
        maxWidth: 200,
    },
    credCol: {
        alignItems: 'flex-end',
    },
    credScore: {
        ...typography.body, // Roboto Mono fallback
        fontFamily: 'Roboto Mono',
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    credLabel: {
        ...typography.body,
        fontSize: 10,
        color: colors.textSecondary,
    },
    dropCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.clubhouseAccent,
    },
    dropHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    dropTag: {
        ...typography.body,
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.textSecondary,
        marginLeft: 4,
        letterSpacing: 1,
    },
    dropTitle: {
        ...typography.subheader,
        color: '#FFF',
        marginBottom: 4,
    },
    dropDesc: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 16,
    },
    dropFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    credPrice: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        color: colors.clubhouseAccent,
        marginLeft: 4,
    },
    cashPrice: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        color: '#FFF',
    },
    buyBtn: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        color: colors.clubhouseAccent,
    }
});
