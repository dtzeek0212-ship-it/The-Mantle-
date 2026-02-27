import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

const ACTIVE_HUDDLES = [
    {
        id: 'h1',
        title: 'Home Defense Protocols: Layering Perimeter Security',
        host: 'Mike_G',
        rank: 'Legend',
        listeners: 342,
        status: 'LIVE',
        tags: ['Tactical', 'Home'],
        avatars: [
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            'https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        ]
    },
    {
        id: 'h2',
        title: 'Field Dressing a White-Tail: The 20-Minute Method',
        host: 'RangerDad',
        rank: 'Legend',
        listeners: 156,
        status: 'LIVE',
        tags: ['Hunting', 'Skills'],
        avatars: [
            'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        ]
    }
];

const SCHEDULED_HUDDLES = [
    {
        id: 's1',
        title: 'Draft Day Picks: Fantasy Football Strategy Room',
        host: 'GridironGuru',
        time: 'Tonight @ 20:00 EST',
        reminders: 1205
    }
];

export const MantleTalkScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.headerArea}>
                    <Text style={styles.sectionTitle}>ACTIVE COMMS</Text>
                    <Text style={styles.sectionDesc}>Secure audio channels hosted by Verified Legends.</Text>
                </View>

                {ACTIVE_HUDDLES.map(huddle => (
                    <TouchableOpacity key={huddle.id} style={styles.huddleCard}>
                        <View style={styles.liveIndicatorRow}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveText}>{huddle.status}</Text>
                        </View>

                        <Text style={styles.huddleTitle}>{huddle.title}</Text>

                        <View style={styles.hostRow}>
                            <Text style={styles.hostLabel}>HOST // </Text>
                            <Text style={styles.hostName}>{huddle.host}</Text>
                            <View style={{ marginLeft: 6 }}>
                                <Icon name="Award" size={14} color={colors.workshopAccent} />
                            </View>
                        </View>

                        <View style={styles.footerRow}>
                            <View style={styles.avatarStack}>
                                {huddle.avatars.map((uri, idx) => (
                                    <Image key={idx} source={{ uri }} style={[styles.avatarImg, { zIndex: huddle.avatars.length - idx }]} />
                                ))}
                            </View>

                            <View style={styles.tagGroup}>
                                {huddle.tags.map(tag => (
                                    <View key={tag} style={styles.tagBox}>
                                        <Text style={styles.tagText}>{tag}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.listenerCount}>
                                <Icon name="Headphones" size={12} color={colors.textSecondary} />
                                <Text style={styles.listenerText}>{huddle.listeners}</Text>
                            </View>
                        </View>

                        <View style={styles.joinBtn}>
                            <Text style={styles.joinText}>CONNECT TO FREQ</Text>
                            <Icon name="Mic" size={16} color="#121212" />
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={styles.divider} />

                <View style={styles.headerArea}>
                    <Text style={styles.sectionTitle}>SCHEDULED BRIEFINGS</Text>
                </View>

                {SCHEDULED_HUDDLES.map(huddle => (
                    <View key={huddle.id} style={styles.scheduledCard}>
                        <View style={styles.scheduleTimeRow}>
                            <Icon name="Calendar" size={14} color={colors.primary} />
                            <Text style={styles.scheduleTimeText}>{huddle.time}</Text>
                        </View>
                        <Text style={styles.huddleTitle}>{huddle.title}</Text>
                        <View style={styles.hostRow}>
                            <Text style={styles.hostLabel}>HOST // </Text>
                            <Text style={styles.hostName}>{huddle.host}</Text>
                        </View>

                        <TouchableOpacity style={styles.reminderBtn}>
                            <Icon name="Bell" size={16} color={colors.primary} />
                            <Text style={styles.reminderText}>SET ALARM ({huddle.reminders})</Text>
                        </TouchableOpacity>
                    </View>
                ))}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    headerArea: {
        marginBottom: 20,
    },
    sectionTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary,
        letterSpacing: 2,
    },
    sectionDesc: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
    huddleCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
        shadowColor: colors.workshopAction,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    liveIndicatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 87, 34, 0.1)', // Safety orange tint
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 16,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.workshopAction,
        marginRight: 6,
    },
    liveText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.workshopAction,
        letterSpacing: 1,
    },
    huddleTitle: {
        ...typography.header,
        fontSize: 20,
        color: '#FFF',
        marginBottom: 12,
    },
    hostRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    hostLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
    },
    hostName: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    avatarStack: {
        flexDirection: 'row',
    },
    avatarImg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#1E1E1E',
        marginLeft: -12, // overlap effect
    },
    tagGroup: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 20,
    },
    tagBox: {
        backgroundColor: '#2A2A2A',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 6,
    },
    tagText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 9,
        color: colors.textSecondary,
    },
    listenerCount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listenerText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.textSecondary,
        marginLeft: 4,
    },
    joinBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 8,
    },
    joinText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#121212',
        marginRight: 8,
        letterSpacing: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 10,
        marginBottom: 30,
    },
    scheduledCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    scheduleTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    scheduleTimeText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.primary,
        marginLeft: 8,
        letterSpacing: 1,
    },
    reminderBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2A2A2A',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#444',
    },
    reminderText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#FFF',
        marginLeft: 8,
    }
});
