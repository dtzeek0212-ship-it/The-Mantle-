import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors } from '../../../../theme/colors';
import { typography } from '../../../../theme/typography';
import { Icon } from '../../../../components/Icon';

type ChecklistItem = {
    id: string;
    task: string;
    completed: boolean;
    claimedBy?: string; // e.g., 'David', 'John', etc.
    isCrucial?: boolean;
    price?: number; // Price in Cred for Pro Shop suggestions
};

const STADIUM_LIST: ChecklistItem[] = [
    { id: 'c1', task: 'Portable Charcoal Grill', completed: false, claimedBy: 'John' },
    { id: 'c2', task: 'YETI Tundra 45 Cooler (Ice+Drinks)', completed: true, claimedBy: 'David' },
    { id: 'c3', task: 'Clear Stadium Bags (Policy Check)', completed: false, isCrucial: true, price: 25 },
    { id: 'c4', task: 'Team Flag & Mounting Pole', completed: false },
    { id: 'c5', task: 'Black Rifle Coffee Thermos', completed: false, isCrucial: true, price: 35 },
];

const TRAILHEAD_LIST: ChecklistItem[] = [
    { id: 't1', task: 'WARN Recovery Winch Kit', completed: false, isCrucial: true, price: 150 },
    { id: 't2', task: 'Spare Fuel / Jerry Cans', completed: false, claimedBy: 'Mike' },
    { id: 't3', task: 'Portable Air Compressor', completed: false },
    { id: 't4', task: 'Leatherman Wave Multi-Tool', completed: false, isCrucial: true, price: 120 },
    { id: 't5', task: 'Trauma First-Aid Kit', completed: true, claimedBy: 'David' },
];

const DEFAULT_LIST: ChecklistItem[] = [
    { id: 'd1', task: 'Lawn Chairs', completed: false },
    { id: 'd2', task: 'Hydration Packs', completed: false },
    { id: 'd3', task: 'Rain Ponchos (INCOMING WEATHER)', completed: false, isCrucial: true, price: 15 },
];

export const TailgateChecklistScreen = () => {
    const route = useRoute();
    const { eventTitle, category } = route.params as { eventTitle: string, category: string };

    const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

    useEffect(() => {
        // Dynamic Checklist Generation based on Mission Profile
        if (category === 'THE TRACK' || category === 'THE ARENA') {
            setChecklist(STADIUM_LIST);
        } else if (category === 'THE GRIND' || category === 'THE EXPO') {
            setChecklist(TRAILHEAD_LIST); // Reusing as proxy
        } else {
            setChecklist(DEFAULT_LIST);
        }

        // Mock System Notification
        setTimeout(() => {
            Alert.alert("🚨 SQUAD REMINDER", "Event is in 24 Hours. Checklist is incomplete. Did somebody grab the ice?", [{ text: "ACKNOWLEDGE" }]);
        }, 1000);
    }, [category]);

    const toggleItem = (id: string) => {
        setChecklist(prev => prev.map(item => {
            if (item.id === id) {
                // Play Mock Mechanical Sound
                console.log("[LOG] Played Mechanical Click Sound");
                return { ...item, completed: !item.completed };
            }
            return item;
        }));
    };

    const progress = checklist.length > 0
        ? (checklist.filter(i => i.completed).length / checklist.length) * 100
        : 0;

    // Status Bar Context (Red -> Orange based on readiness)
    const progressColor = progress === 100 ? colors.fieldStreamAccent : (progress > 50 ? colors.workshopAction : colors.error);

    return (
        <View style={styles.container}>
            {/* Tactical Tablet Header */}
            <View style={styles.tabletHeader}>
                <View style={styles.tabletClipRow}>
                    <View style={styles.clipHinge} />
                    <View style={styles.clipCenter} />
                    <View style={styles.clipHinge} />
                </View>
                <Text style={styles.eventTitle}>{eventTitle}</Text>
                <Text style={styles.missionProfile}>MISSION PROFILE: {category}</Text>
            </View>

            {/* Readiness Progress Bar */}
            <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>SQUAD READINESS</Text>
                <Text style={[styles.progressValue, { color: progressColor }]}>{progress.toFixed(0)}%</Text>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: progressColor }]} />
                </View>
            </View>

            {/* Weather Alert Mock */}
            {category === 'THE STAGE' && (
                <View style={styles.weatherBanner}>
                    <Icon name="CloudRain" size={20} color={colors.radarNeon} />
                    <Text style={styles.weatherText}>WEATHER ALERT: 60% chance of rain at venue.</Text>
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.listSection}>
                    {checklist.map(item => (
                        <View key={item.id}>
                            <TouchableOpacity
                                style={[styles.taskRow, item.completed && styles.taskRowCompleted]}
                                onPress={() => toggleItem(item.id)}
                            >
                                <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
                                    {item.completed && <Icon name="Check" size={14} color="#121212" />}
                                </View>
                                <View style={styles.taskTextContent}>
                                    <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>{item.task}</Text>

                                    {/* Squad Sync Claim UI */}
                                    {item.claimedBy && (
                                        <View style={styles.claimedBadge}>
                                            <Icon name="User" size={10} color={colors.textSecondary} />
                                            <Text style={styles.claimedText}>CLAIMED BY {item.claimedBy.toUpperCase()}</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>

                            {/* The Quartermaster (Contextual Monetization) */}
                            {item.isCrucial && !item.completed && !item.claimedBy && (
                                <View style={styles.quartermasterBanner}>
                                    <View style={styles.qmHeader}>
                                        <Icon name="AlertCircle" size={14} color={colors.workshopAccent} />
                                        <Text style={styles.qmWarningText}>CRUCIAL GEAR MISSING</Text>
                                    </View>
                                    <View style={styles.qmActionRow}>
                                        <Text style={styles.qmPrice}>{item.price} CRED</Text>
                                        <TouchableOpacity style={styles.buyNowBtn}>
                                            <Text style={styles.buyNowText}>BUY FOR DELIVERY</Text>
                                            <Icon name="ShoppingCart" size={12} color="#121212" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {/* Invite Squad Button */}
                <TouchableOpacity style={styles.inviteBtn}>
                    <Icon name="UserPlus" size={18} color={colors.radarNeon} />
                    <Text style={styles.inviteText}>INVITE MANTLE SQUAD</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E0E0E0' }, // Clipboard aesthetic (Light Gray)
    tabletHeader: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 10,
    },
    tabletClipRow: {
        flexDirection: 'row',
        position: 'absolute',
        top: 20,
        width: 120,
        height: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clipHinge: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#999',
    },
    clipCenter: {
        flex: 1,
        height: 8,
        backgroundColor: '#777',
        marginHorizontal: 8,
        borderRadius: 4,
    },
    eventTitle: {
        ...typography.brand,
        fontFamily: 'Orbitron_900Black',
        fontSize: 22,
        color: '#121212',
        textAlign: 'center',
        marginTop: 10,
    },
    missionProfile: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
        letterSpacing: 2,
    },
    progressContainer: {
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    progressLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    progressValue: {
        ...typography.brand,
        fontSize: 32,
        marginTop: 4,
        marginBottom: 12,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
    },
    weatherBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121212', // Dark contrast banner
        padding: 16,
    },
    weatherText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.radarNeon,
        marginLeft: 12,
    },
    scrollContent: { padding: 16, paddingBottom: 100 },
    listSection: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginBottom: 24,
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    taskRowCompleted: {
        opacity: 0.6,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        marginTop: 2,
    },
    checkboxCompleted: {
        backgroundColor: colors.fieldStreamAccent,
        borderColor: colors.fieldStreamAccent,
    },
    taskTextContent: {
        flex: 1,
    },
    taskText: {
        ...typography.body,
        color: '#121212',
        fontWeight: '500',
    },
    taskTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#666',
    },
    claimedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginTop: 6,
    },
    claimedText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.textSecondary,
        marginLeft: 4,
    },
    quartermasterBanner: {
        backgroundColor: '#1E1D1A', // Dark tactical contrast inside checklist
        padding: 12,
        borderRadius: 4,
        marginTop: 8,
        marginBottom: 16,
        marginLeft: 40, // Indent to align with text
    },
    qmHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    qmWarningText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.workshopAccent,
        marginLeft: 6,
    },
    qmActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    qmPrice: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: '#FFF',
    },
    buyNowBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.proShopAccent,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    buyNowText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: '#121212',
        marginRight: 6,
    },
    inviteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
        paddingVertical: 16,
        borderRadius: 8,
    },
    inviteText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: colors.radarNeon,
        marginLeft: 12,
        letterSpacing: 1,
    }
});
