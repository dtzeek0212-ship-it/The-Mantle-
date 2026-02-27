import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { VoiceThreadCard } from './VoiceThreadCard';

const { width } = Dimensions.get('window');

const CHANNELS = ['OSHA\'s Nightmare', 'The Smoke Pit', 'The Penalty Box'];

const MOCK_FEED = [
    {
        id: '1',
        channel: 'OSHA\'s Nightmare',
        user: 'GarageBrew',
        time: '1h ago',
        content: 'Testing the structural integrity of this lawn chair with a V8.',
        mediaUrl: 'https://images.unsplash.com/photo-1542382103-6052f36f6d22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        clinks: 98, // Almost triggers foam
        comments: 42,
        tips: 50,
    },
    {
        id: '2',
        channel: 'The Smoke Pit',
        user: 'E4_Mafia_Don',
        time: '3h ago',
        content: '"It pass motor pool inspection if we just paint over the rust." - Chief',
        mediaUrl: 'https://images.unsplash.com/photo-1530982011887-3cc11cc85693?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        clinks: 890,
        comments: 112,
        tips: 150,
    },
    {
        id: '3',
        channel: 'The Penalty Box',
        user: 'MondayMorningQB',
        time: '5h ago',
        content: 'POV: Your team when they need 1 yard on 4th down.',
        mediaUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        clinks: 1200,
        comments: 340,
        tips: 800,
    }
];

export const DailyGrindFeed = () => {
    const [activeChannel, setActiveChannel] = useState('OSHA\'s Nightmare');

    const filteredFeed = MOCK_FEED.filter(post => post.channel === activeChannel);

    return (
        <View style={styles.container}>
            {/* Channel Toggles */}
            <View style={styles.channelScroll}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.channelContent}>
                    {CHANNELS.map((channel) => (
                        <TouchableOpacity
                            key={channel}
                            style={[styles.channelPill, activeChannel === channel && styles.channelPillActive]}
                            onPress={() => setActiveChannel(channel)}
                        >
                            <Text style={[styles.channelText, activeChannel === channel && styles.channelTextActive]}>
                                {channel.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Content Feed */}
            {filteredFeed.map((post) => (
                <View key={post.id} style={styles.postCard}>
                    {/* Dark Mode Media Player (Edge to Edge) */}
                    <Image source={{ uri: post.mediaUrl }} style={styles.mediaPlayer} />

                    <View style={styles.postOverlay}>
                        <View style={styles.postHeader}>
                            <Image source={{ uri: `https://i.pravatar.cc/100?u=${post.user}` }} style={styles.avatar} />
                            <View>
                                <Text style={styles.username}>{post.user}</Text>
                                <Text style={styles.timestamp}>{post.time}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.postFooter}>
                        <Text style={styles.postContent}>{post.content}</Text>

                        {/* Voice Thread Injection */}
                        <VoiceThreadCard
                            user={`RandomRef_${post.id}`}
                            avatar={`https://i.pravatar.cc/100?img=${parseInt(post.id) + 10}`}
                            duration="0:15"
                            topic="Re: That's hilarious"
                        />

                        <View style={styles.actionRow}>
                            <View style={styles.actionGroup}>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <View style={styles.clinkCircle}>
                                        <Icon name="Coffee" size={14} color="#121212" />
                                    </View>
                                    <Text style={styles.actionText}>{post.clinks}</Text>
                                </TouchableOpacity>

                                {/* Bullshit Button for specific posts */}
                                {post.id === '1' && (
                                    <TouchableOpacity style={[styles.actionBtn, { marginLeft: 16, backgroundColor: 'rgba(244, 67, 54, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }]}>
                                        <Icon name="AlertTriangle" size={16} color={colors.ironWorksAccent} />
                                        <Text style={[styles.actionText, { color: colors.ironWorksAccent, marginLeft: 4 }]}>CALL BS</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <TouchableOpacity style={styles.tipBtn}>
                                <Icon name="Zap" size={14} color={colors.clubhouseAccent} />
                                <Text style={styles.tipText}>Tip {post.tips}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    channelScroll: {
        borderBottomWidth: 1,
        borderBottomColor: colors.clubhouseAccent,
        backgroundColor: '#121212', // Midnight
    },
    channelContent: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    channelPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 12,
    },
    channelPillActive: {
        backgroundColor: colors.clubhouseAccent,
        borderColor: colors.clubhouseAccent,
    },
    channelText: {
        ...typography.body,
        fontSize: 12,
        fontFamily: 'Courier New', // Digital Garage data feel
        fontWeight: 'bold',
        letterSpacing: 1,
        color: colors.textSecondary,
    },
    channelTextActive: {
        color: '#121212',
    },
    postCard: {
        marginBottom: 8,
        backgroundColor: '#121212',
        borderBottomWidth: 1,
        borderBottomColor: colors.clubhouseAccent,
    },
    mediaPlayer: {
        width: width,
        height: width, // 1:1 Aspect Ratio
        backgroundColor: '#000',
    },
    postOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 16,
        paddingTop: 24, // Account for visual breathing room over the image
        // Simulate a dark gradient overlay at the top if needed
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
        borderWidth: 2,
        borderColor: colors.clubhouseAccent,
    },
    username: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        color: colors.clubhouseAccent,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    timestamp: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontSize: 10,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 2,
    },
    postFooter: {
        padding: 16,
    },
    postContent: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontSize: 16,
        color: colors.textPrimary,
        marginBottom: 16,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 16,
    },
    actionGroup: {
        flexDirection: 'row',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clinkCircle: {
        backgroundColor: colors.clubhouseAccent,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        color: colors.clubhouseAccent,
        marginLeft: 8,
    },
    tipBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 152, 0, 0.1)', // Amber tint
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.clubhouseAccent,
    },
    tipText: {
        ...typography.body,
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.clubhouseAccent,
        marginLeft: 4,
    }
});
