import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { Card } from '../../../components/Card';

interface FeedPost {
    id: string;
    user: string;
    content: string;
    time: string;
    location: string;
}

const LIVE_POSTS: FeedPost[] = [
    {
        id: '1',
        user: 'Hunter_45',
        content: 'Big rub spotted off the logging road. Looks fresh.',
        time: '15 mins ago',
        location: '0.4 mi away',
    },
    {
        id: '2',
        user: 'AnglerX',
        content: 'Water is murky at the spillway but temp is rising. Throwing chartreuse.',
        time: '42 mins ago',
        location: '1.2 mi away',
    },
];

export const FieldTalkFeed = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="Radio" size={20} color={colors.fieldStreamAccent} />
                <Text style={styles.title}>Live Field Talk</Text>
                <View style={styles.liveBadge}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LOCAL</Text>
                </View>
            </View>

            {LIVE_POSTS.map(post => (
                <Card key={post.id} style={styles.postCard}>
                    <View style={styles.postHeader}>
                        <Text style={styles.postUser}>@{post.user}</Text>
                        <Text style={styles.postTime}>{post.time}</Text>
                    </View>
                    <Text style={styles.postContent}>{post.content}</Text>
                    <View style={styles.postFooter}>
                        <Icon name="MapPin" size={12} color={colors.textSecondary} />
                        <Text style={styles.postLocation}>{post.location}</Text>
                    </View>
                </Card>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        ...typography.subheader,
        color: colors.textPrimary,
        marginLeft: 8,
        flex: 1,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.forestMoss,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.forestMoss,
        marginRight: 4,
    },
    liveText: {
        ...typography.body, // Roboto Mono
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.forestMoss,
    },
    postCard: {
        borderLeftColor: colors.border, // Neutral
        padding: 12,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    postUser: {
        ...typography.body,
        fontWeight: 'bold',
        color: colors.fieldStreamAccent,
    },
    postTime: {
        ...typography.body,
        fontSize: 11,
        color: colors.textSecondary,
    },
    postContent: {
        ...typography.body,
        lineHeight: 20,
        marginBottom: 12,
    },
    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postLocation: {
        ...typography.body, // Roboto Mono
        fontSize: 11,
        marginLeft: 6,
        color: colors.textSecondary,
    }
});
