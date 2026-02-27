import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

// Mock Data representing aggregated API feeds
const PULSE_FEEDS = [
    {
        id: '1',
        source: 'Instagram Graph API',
        broadcaster: 'Jocko Willink',
        handle: '@jockowillink',
        category: 'THE HEAVY HITTERS',
        time: '12m ago',
        content: 'Discipline Equals Freedom. Waking up at 0430 is a non-negotiable standard. The enemy is sleep. Get after it.',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        engagement: { clinks: 1420, comments: 450 }
    },
    {
        id: '2',
        source: 'X API',
        broadcaster: 'Weekend Warriors',
        handle: '@TheMantleGrind',
        category: 'THE DAILY GRIND',
        time: '1h ago',
        content: 'When you say "it\'ll just take 20 minutes to fix this pipe" and 6 hours later you are back at Home Depot for the 3rd time today. #WorkshopFails',
        image: null,
        engagement: { clinks: 342, comments: 89 }
    },
    {
        id: '3',
        source: 'X API',
        broadcaster: 'Terminal Lance',
        handle: '@TerminalLance',
        category: 'MILITARY TWITTER',
        time: '3h ago',
        content: 'Nothing bonds a group of grown men faster than collective suffering in the rain waiting for the armory to open.',
        image: 'https://images.unsplash.com/photo-1579952589255-bfa3b0704040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        engagement: { clinks: 890, comments: 210 }
    }
];

export const LivePulseScreen = () => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const filteredFeeds = activeFilter
        ? PULSE_FEEDS.filter(f => f.category === activeFilter)
        : PULSE_FEEDS;

    return (
        <View style={styles.container}>
            {/* Filter Ribbons */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
                <TouchableOpacity
                    style={[styles.filterPill, activeFilter === null && styles.filterActive]}
                    onPress={() => setActiveFilter(null)}
                >
                    <Icon name="Activity" size={14} color={activeFilter === null ? '#121212' : colors.textSecondary} />
                    <Text style={[styles.filterText, activeFilter === null && styles.filterTextActive]}>ALL FREQS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterPill, activeFilter === 'THE HEAVY HITTERS' && styles.filterActive]}
                    onPress={() => setActiveFilter('THE HEAVY HITTERS')}
                >
                    <Icon name="Shield" size={14} color={activeFilter === 'THE HEAVY HITTERS' ? '#121212' : colors.textSecondary} />
                    <Text style={[styles.filterText, activeFilter === 'THE HEAVY HITTERS' && styles.filterTextActive]}>HEAVY HITTERS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterPill, activeFilter === 'THE DAILY GRIND' && styles.filterActive]}
                    onPress={() => setActiveFilter('THE DAILY GRIND')}
                >
                    <Icon name="Hammer" size={14} color={activeFilter === 'THE DAILY GRIND' ? '#121212' : colors.textSecondary} />
                    <Text style={[styles.filterText, activeFilter === 'THE DAILY GRIND' && styles.filterTextActive]}>DAILY GRIND</Text>
                </TouchableOpacity>
            </ScrollView>

            <ScrollView contentContainerStyle={styles.feedContent} showsVerticalScrollIndicator={false}>
                {filteredFeeds.map(post => (
                    <View key={post.id} style={styles.postCard}>
                        {/* Brushed Steel gradient header simulation */}
                        <View style={styles.cardHeader}>
                            <View style={styles.broadcasterRow}>
                                <View style={styles.avatarPlaceholder} />
                                <View>
                                    <View style={styles.handleRow}>
                                        <Text style={styles.broadcasterName}>{post.broadcaster}</Text>
                                        <View style={{ marginLeft: 4 }}>
                                            <Icon name="CheckCircle" size={12} color={colors.clubhouseAccent} />
                                        </View>
                                    </View>
                                    <Text style={styles.broadcasterHandle}>{post.handle} • {post.time}</Text>
                                </View>
                            </View>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{post.category}</Text>
                            </View>
                        </View>

                        <Text style={styles.postContent}>{post.content}</Text>

                        {post.image && (
                            <Image source={{ uri: post.image }} style={styles.postImage} />
                        )}

                        <View style={styles.engagementRow}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Icon name="Coffee" size={18} color={colors.textSecondary} />
                                <Text style={styles.actionText}>{post.engagement.clinks}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Icon name="MessageSquare" size={18} color={colors.textSecondary} />
                                <Text style={styles.actionText}>{post.engagement.comments}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Icon name="Share2" size={18} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
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
    filterScroll: {
        flexGrow: 0,
        backgroundColor: '#121212',
    },
    filterContent: {
        padding: 16,
        paddingBottom: 20,
    },
    filterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 12,
    },
    filterActive: {
        backgroundColor: colors.clubhouseAccent,
        borderColor: colors.clubhouseAccent,
    },
    filterText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.textSecondary,
        marginLeft: 8,
    },
    filterTextActive: {
        color: '#121212',
    },
    feedContent: {
        padding: 16,
        paddingBottom: 100,
    },
    postCard: {
        backgroundColor: '#1E1E1E', // Base steel
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: '#262626', // Lighter steel header
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    broadcasterRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3A3A3A',
        marginRight: 12,
        borderWidth: 1,
        borderColor: colors.clubhouseAccent,
    },
    handleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    broadcasterName: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
    },
    broadcasterHandle: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    categoryBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    categoryText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 9,
        fontWeight: 'bold',
        color: colors.clubhouseAccent,
    },
    postContent: {
        ...typography.body,
        color: '#E0E0E0',
        padding: 16,
        lineHeight: 24,
    },
    postImage: {
        width: '100%',
        height: 250,
        backgroundColor: '#111',
    },
    engagementRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 32,
    },
    actionText: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
        marginLeft: 8,
        fontWeight: 'bold',
    }
});
