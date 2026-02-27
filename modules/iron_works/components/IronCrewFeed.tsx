import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { Card } from '../../../components/Card';

const FEED_DATA = [
    {
        id: '1',
        user: 'ApexHunter_92',
        avatar: 'https://i.pravatar.cc/100?img=11',
        action: 'crushed the Backcountry Beast Protocol.',
        stats: 'Total Volume: 14,500 lbs • RPE: 8.5',
        time: '2h ago',
        likes: 12,
    },
    {
        id: '2',
        user: 'MountainMan_Dan',
        avatar: 'https://i.pravatar.cc/100?img=33',
        action: 'hit a new Personal Record!',
        stats: 'Deadlift: 405 lbs (1RM)',
        time: '4h ago',
        isPR: true,
        likes: 34,
    },
    {
        id: '3',
        user: 'DIY_Junkie',
        avatar: 'https://i.pravatar.cc/100?img=59',
        action: 'completed Active Recovery.',
        stats: '20m Mobility Flow • HRV +5ms',
        time: '6h ago',
        likes: 8,
    }
];

export const IronCrewFeed = () => {
    return (
        <View style={styles.container}>
            {FEED_DATA.map((post) => (
                <Card key={post.id} style={[styles.postCard, post.isPR && styles.prCard]}>
                    <View style={styles.headerRow}>
                        <Image source={{ uri: post.avatar }} style={styles.avatar} />
                        <View style={styles.textStack}>
                            <Text style={styles.userName}>
                                {post.user} <Text style={styles.actionText}>{post.action}</Text>
                            </Text>
                            <Text style={styles.timeText}>{post.time}</Text>
                        </View>
                    </View>

                    <View style={styles.statsContainer}>
                        <Icon name={post.isPR ? "Award" : "Activity"} size={16} color={post.isPR ? colors.workshopAccent : colors.ironWorksAccent} />
                        <Text style={[styles.statsText, post.isPR && { color: colors.workshopAccent, fontWeight: 'bold' }]}>
                            {post.stats}
                        </Text>
                    </View>

                    <View style={styles.footerRow}>
                        <View style={styles.likeGroup}>
                            <Icon name="ThumbsUp" size={14} color={colors.textSecondary} />
                            <Text style={styles.likeText}>{post.likes}</Text>
                        </View>
                        <Icon name="MessageSquare" size={14} color={colors.textSecondary} />
                    </View>
                </Card>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    postCard: {
        marginBottom: 12,
        padding: 16,
    },
    prCard: {
        borderColor: colors.workshopAccent,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 193, 7, 0.05)',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    textStack: {
        flex: 1,
    },
    userName: {
        ...typography.body,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    actionText: {
        fontWeight: 'normal',
        color: colors.textSecondary,
    },
    timeText: {
        ...typography.body,
        fontSize: 10,
        color: colors.textSecondary,
        marginTop: 2,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 2,
        borderLeftColor: colors.ironWorksAccent,
        marginBottom: 12,
    },
    statsText: {
        ...typography.body, // Roboto Mono for data
        fontSize: 12,
        marginLeft: 8,
        color: colors.textPrimary,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 12,
    },
    likeGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    likeText: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginLeft: 4,
    }
});
