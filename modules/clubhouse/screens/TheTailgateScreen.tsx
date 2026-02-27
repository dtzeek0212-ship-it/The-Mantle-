import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { useUser } from '../../../context/UserContext';

// Mock Thread Data
const FORUM_THREADS = [
    {
        id: 't1',
        author: 'TexasRanger99',
        rank: 'Legend',
        topic: 'THE OPEN ROAD',
        title: 'Took the promotion, but it means moving to the city. Thoughts?',
        content: 'Gentlemen, I need some unbiased input. They offered me the Regional Manager spot. It’s a 40% pay bump, but it means moving out of the county and into an HOA neighborhood. I’m trading my acre and my workshop for a concrete driveway. Has anyone made this trade-off? Was it worth it for the family?',
        replies: 45,
        bullshitVotes: 2,
        isGearLinked: false,
    },
    {
        id: 't2',
        author: 'SmokerDad',
        rank: 'Veteran',
        topic: 'THE BRAG BOARD',
        title: 'First Brisket on the Traeger Ironwood. Nailed the bark.',
        content: '14 hours straight. Used a mix of hickory and apple wood pellets. Best ring I’ve ever seen. The kids actually ate it without complaining this time. That’s a win in my book.',
        replies: 112,
        bullshitVotes: 0,
        isGearLinked: true,
        linkedGear: {
            name: 'Traeger Ironwood 885',
            price: '$1,499',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        }
    },
    {
        id: 't3',
        author: 'RookieLifter',
        rank: 'Rookie',
        topic: 'FATHERHOOD',
        title: 'How do you train with a newborn at home?',
        content: 'I haven’t hit the Iron Works in three weeks. Sleep deprivation is real. How did you guys manage to keep your routines when the first kid arrived?',
        replies: 89,
        bullshitVotes: 0,
        isGearLinked: false,
    }
];

export const TheTailgateScreen = () => {
    const { user, setUser } = useUser();
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const filteredThreads = activeFilter
        ? FORUM_THREADS.filter(t => t.topic === activeFilter)
        : FORUM_THREADS;

    const handleClinkTip = () => {
        if (user.credBalance >= 5) {
            setUser(prev => ({ ...prev, credBalance: prev.credBalance - 5 }));
            Alert.alert("Clink Sent!", "-5 Cred. Good advice should be rewarded.");
        } else {
            Alert.alert("Insufficient Funds", "You need at least 5 Cred to Tip a brother.");
        }
    };

    const handleBullshitVote = () => {
        Alert.alert("BS Flagged", "The community will review this claim.");
    };

    const [newThreadText, setNewThreadText] = useState('');

    const sanitizeInput = (input: string) => {
        // Simulated Security Hardening: Basic XSS prevention by stripping script tags
        return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    };

    const handlePostThread = () => {
        const cleanText = sanitizeInput(newThreadText);
        if (cleanText.trim() === '') return;

        Alert.alert("Thread Posted", `Sanitized Input Success: \n${cleanText}`);
        setNewThreadText('');
    };

    return (
        <View style={styles.container}>
            {/* New Thread Input Area (Security Hardened) */}
            <View style={styles.newThreadBox}>
                <TextInput
                    style={styles.threadInput}
                    placeholder="Start a new thread..."
                    placeholderTextColor={colors.textSecondary}
                    value={newThreadText}
                    onChangeText={setNewThreadText}
                    multiline
                />
                <TouchableOpacity style={styles.postBtn} onPress={handlePostThread}>
                    <Icon name="Send" size={16} color="#121212" />
                    <Text style={styles.postBtnText}>POST</Text>
                </TouchableOpacity>
            </View>

            {/* Forum Sub-Nav */}
            <View style={styles.subNav}>
                <TouchableOpacity onPress={() => setActiveFilter(null)} style={[styles.navItem, activeFilter === null && styles.navItemActive]}>
                    <Text style={[styles.navText, activeFilter === null && styles.navTextActive]}>ALL BOARDS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveFilter('FATHERHOOD')} style={[styles.navItem, activeFilter === 'FATHERHOOD' && styles.navItemActive]}>
                    <Text style={[styles.navText, activeFilter === 'FATHERHOOD' && styles.navTextActive]}>FATHERHOOD</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveFilter('THE OPEN ROAD')} style={[styles.navItem, activeFilter === 'THE OPEN ROAD' && styles.navItemActive]}>
                    <Text style={[styles.navText, activeFilter === 'THE OPEN ROAD' && styles.navTextActive]}>THE OPEN ROAD</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveFilter('THE BRAG BOARD')} style={[styles.navItem, activeFilter === 'THE BRAG BOARD' && styles.navItemActive]}>
                    <Text style={[styles.navText, activeFilter === 'THE BRAG BOARD' && styles.navTextActive]}>BRAG BOARD</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.forumContent} showsVerticalScrollIndicator={false}>

                {/* Global State Tracker for Cred */}
                <View style={styles.walletStrap}>
                    <Text style={styles.walletLabel}>AVAILABLE CRED FOR TIPPING:</Text>
                    <View style={styles.walletBalanceBox}>
                        <Icon name="Zap" size={12} color={colors.clubhouseAccent} />
                        <Text style={styles.walletBalance}>{user.credBalance}</Text>
                    </View>
                </View>

                {filteredThreads.map(thread => (
                    <View key={thread.id} style={styles.threadCard}>

                        {/* Author Header */}
                        <View style={styles.threadHeader}>
                            <View style={styles.authorRow}>
                                <Text style={styles.authorText}>{thread.author}</Text>
                                <View style={styles.rankBadge}>
                                    <Icon name={thread.rank === 'Legend' ? 'Award' : 'Shield'} size={10} color={thread.rank === 'Legend' ? colors.workshopAccent : colors.textSecondary} />
                                    <Text style={styles.rankText}>{thread.rank}</Text>
                                </View>
                            </View>
                            <Text style={styles.topicBadge}>{thread.topic}</Text>
                        </View>

                        {/* Thread Body */}
                        <View style={styles.threadBody}>
                            <Text style={styles.threadTitle}>{thread.title}</Text>
                            <Text style={styles.threadContent}>{thread.content}</Text>
                        </View>

                        {/* Native Monetization: The Gear List */}
                        {thread.isGearLinked && thread.linkedGear && (
                            <View style={styles.gearLinkBox}>
                                <View style={{ marginRight: 12 }}>
                                    <Icon name="Package" size={16} color={colors.proShopAccent} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.gearTitle}>GEAR MENTIONED IN THIS THREAD</Text>
                                    <Text style={styles.gearName}>{thread.linkedGear.name} - {thread.linkedGear.price}</Text>
                                </View>
                                <TouchableOpacity style={styles.shopBtn}>
                                    <Text style={styles.shopBtnText}>VIEW IN SHOP</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Banter Tools Footer */}
                        <View style={styles.threadFooter}>
                            <TouchableOpacity style={styles.footerAction}>
                                <Icon name="MessageCircle" size={16} color={colors.textSecondary} />
                                <Text style={styles.footerActionText}>{thread.replies} Replies</Text>
                            </TouchableOpacity>

                            <View style={styles.toolGroup}>
                                {/* The Clink Rule */}
                                <TouchableOpacity style={[styles.banterTool, styles.toolClink]} onPress={handleClinkTip}>
                                    <Icon name="Coffee" size={14} color="#FFF" />
                                    <Text style={styles.banterText}>TIP 5 CRED</Text>
                                </TouchableOpacity>

                                {/* The Bullshit Meter */}
                                <TouchableOpacity style={[styles.banterTool, styles.toolBullshit]} onPress={handleBullshitVote}>
                                    <Icon name="AlertTriangle" size={14} color={colors.workshopAction} />
                                    <Text style={[styles.banterText, { color: colors.workshopAction }]}>CALL B.S.</Text>
                                </TouchableOpacity>
                            </View>
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
    subNav: {
        flexDirection: 'row',
        backgroundColor: '#121212',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingHorizontal: 8,
    },
    navItem: {
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    navItemActive: {
        borderBottomWidth: 2,
        borderBottomColor: colors.clubhouseAccent,
    },
    navText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.textSecondary,
    },
    navTextActive: {
        color: '#FFF',
    },
    forumContent: {
        padding: 16,
        paddingBottom: 100,
    },
    walletStrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1A1A1A',
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 20,
    },
    walletLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
    },
    walletBalanceBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.clubhouseAccent,
    },
    walletBalance: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 6,
    },
    threadCard: {
        backgroundColor: '#1E1E1E', // Brushed steel base
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    threadHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#262626',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorText: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
    },
    rankBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8,
    },
    rankText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 9,
        color: colors.textSecondary,
        marginLeft: 4,
    },
    topicBadge: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.clubhouseAccent,
        fontWeight: 'bold',
    },
    threadBody: {
        padding: 16,
    },
    threadTitle: {
        ...typography.header,
        fontSize: 18,
        color: '#FFF',
        marginBottom: 12,
    },
    threadContent: {
        ...typography.body,
        color: '#E0E0E0',
        lineHeight: 24,
    },
    gearLinkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 87, 34, 0.1)', // Pro shop orange mock
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.proShopAccent,
        borderBottomWidth: 1,
        borderBottomColor: colors.proShopAccent,
    },
    gearTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    gearName: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
    },
    shopBtn: {
        backgroundColor: colors.proShopAccent,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
    },
    shopBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: '#121212',
    },
    threadFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#333',
        backgroundColor: '#1A1A1A',
    },
    footerAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerActionText: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
        marginLeft: 8,
    },
    toolGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    banterTool: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: 12,
    },
    toolClink: {
        borderColor: colors.clubhouseAccent,
        backgroundColor: 'rgba(56, 142, 60, 0.2)', // Target green highlight
    },
    toolBullshit: {
        borderColor: colors.workshopAction,
        backgroundColor: 'rgba(255, 87, 34, 0.1)',
    },
    banterText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 6,
    },
    newThreadBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#1E1E1E',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    threadInput: {
        ...typography.body,
        flex: 1,
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: '#FFF',
        marginRight: 8,
        minHeight: 40,
    },
    postBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 4,
    },
    postBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 6,
    }
});
