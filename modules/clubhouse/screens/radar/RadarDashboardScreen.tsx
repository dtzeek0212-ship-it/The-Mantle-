import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../../theme/colors';
import { typography } from '../../../../theme/typography';
import { Icon } from '../../../../components/Icon';
import { useUser } from '../../../../context/UserContext';

const RADAR_CATEGORIES = ['ALL', 'THE TRACK', 'THE STAGE', 'THE ARENA', 'THE GRIND', 'THE EXPO'];

const MOCK_EVENTS = [
    {
        id: 'e1',
        title: 'MONSTER JAM FINALS',
        category: 'THE TRACK',
        location: 'Nissan Stadium • 2.4 Mi Away',
        time: 'SAT 7:00 PM',
        attendees: 42,
        isAttending: false,
        image: 'https://images.unsplash.com/photo-1533083325603-625d996d92ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        gearSuggest: {
            item: 'Peltor Tactical Earpro',
            reason: 'Protect your hearing in the lower bowl.',
            price: '215 Cred'
        }
    },
    {
        id: 'e2',
        title: 'LUKE COMBS LIVE',
        category: 'THE STAGE',
        location: 'Bridgestone Arena • 4.1 Mi Away',
        time: 'FRI 8:00 PM',
        attendees: 115,
        isAttending: true,
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        gearSuggest: null
    },
    {
        id: 'e3',
        title: 'LOCAL CROSSFIT OPEN',
        category: 'THE GRIND',
        location: 'Iron Works Gym • 8.0 Mi Away',
        time: 'SUN 9:00 AM',
        attendees: 16,
        isAttending: false,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        gearSuggest: {
            item: 'Rogue Fitness Knee Sleeves',
            reason: 'Support for the heavy lifting block.',
            price: '85 Cred'
        }
    }
];

export const RadarDashboardScreen = () => {
    const navigation = useNavigation<any>();
    const { addCred } = useUser();
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [events, setEvents] = useState(MOCK_EVENTS);

    const toggleAttendance = (id: string) => {
        setEvents(events.map(ev =>
            ev.id === id ? { ...ev, isAttending: !ev.isAttending, attendees: ev.isAttending ? ev.attendees - 1 : ev.attendees + 1 } : ev
        ));
    };

    const handleCheckIn = () => {
        addCred(50);
        Alert.alert(
            "📍 GPS CHECK-IN VERIFIED",
            "You have arrived at the Event Zone. +50 Cred added to your wallet. Drop a Field Report to earn more.",
            [{ text: "COPY THAT" }]
        );
    };

    const handleUploadReport = () => {
        Alert.alert("Camera Module", "Opening system camera to snap a live Field Report...");
    };

    const filteredEvents = activeFilter === 'ALL'
        ? events
        : events.filter(e => e.category === activeFilter);

    return (
        <View style={styles.container}>
            {/* Interactive Neon Radar Map */}
            <View style={styles.radarMapArea}>
                {/* Mock Map Background */}
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }}
                    style={styles.mapDarken}
                />
                <View style={styles.mapOverlay}>
                    {/* Simulated Heatmap Blips */}
                    <View style={styles.radarCenter}>
                        <View style={styles.radarRing1} />
                        <View style={styles.radarRing2} />
                        <Icon name="Crosshair" size={24} color={colors.radarNeon} />
                    </View>
                    <View style={[styles.heatBlip, { top: 40, left: 60, width: 40, height: 40 }]} />
                    <View style={[styles.heatBlip, { bottom: 80, right: 100, width: 60, height: 60, opacity: 0.8 }]} />

                    <View style={styles.radarStatus}>
                        <Icon name="Activity" size={14} color={colors.radarNeon} />
                        <Text style={styles.radarStatusText}>SCANNING LOCAL SECTOR...</Text>
                    </View>
                </View>
            </View>

            {/* Event Filter Ribbon */}
            <View style={styles.filterRibbon}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
                    {RADAR_CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.filterPill, activeFilter === cat && styles.filterPillActive]}
                            onPress={() => setActiveFilter(cat)}
                        >
                            <Text style={[styles.filterText, activeFilter === cat && styles.filterTextActive]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Event Feed */}
            <ScrollView style={styles.feedArea} showsVerticalScrollIndicator={false}>
                {filteredEvents.map(ev => (
                    <View key={ev.id} style={styles.eventCard}>
                        {/* Performance Hardening: Simulated FastImage / Lazy Loading Cache Wrapper */}
                        <View style={[styles.eventImage, { backgroundColor: '#222', overflow: 'hidden' }]}>
                            <Image
                                source={{ uri: ev.image }}
                                style={[styles.eventImage, { position: 'absolute' }]}
                                resizeMode="cover"
                                // In a real app we'd use react-native-fast-image, here we simulate the cache control
                                onLoadEnd={() => { /* Remove skeleton loader if it were absolutely positioned over this */ }}
                            />
                        </View>

                        <View style={styles.eventContextStrap}>
                            <View style={styles.catBadge}>
                                <Text style={styles.catText}>{ev.category}</Text>
                            </View>
                            <Text style={styles.eventTime}>{ev.time}</Text>
                        </View>

                        <View style={styles.eventBody}>
                            <Text style={styles.eventTitle}>{ev.title}</Text>
                            <Text style={styles.eventLocation}>
                                <Icon name="MapPin" size={12} color={colors.textSecondary} /> {ev.location}
                            </Text>

                            <View style={styles.attendanceRow}>
                                <Icon name="Users" size={16} color={colors.radarNeon} />
                                <Text style={styles.attendeeCount}>{ev.attendees} MANTLE USERS ATTENDING</Text>
                            </View>

                            <View style={styles.eventActions}>
                                <TouchableOpacity
                                    style={[styles.actionBtn, ev.isAttending ? styles.actionBtnActive : styles.actionBtnOutline]}
                                    onPress={() => toggleAttendance(ev.id)}
                                >
                                    <Text style={[styles.actionBtnText, ev.isAttending && styles.actionBtnTextActive]}>
                                        {ev.isAttending ? 'GOING' : "I'M GOING"}
                                    </Text>
                                </TouchableOpacity>

                                {ev.isAttending && (
                                    <View style={styles.attendingActionsRow}>
                                        <TouchableOpacity style={styles.huddleBtn}>
                                            <Icon name="MessageSquare" size={16} color="#121212" />
                                            <Text style={styles.huddleBtnText}>EVENT CHAT</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.checklistBtn}
                                            onPress={() => navigation.navigate('TailgateChecklist' as never, { eventTitle: ev.title, category: ev.category } as never)}
                                        >
                                            <Icon name="Clipboard" size={16} color="#FFF" />
                                            <Text style={styles.checklistBtnText}>CHECKLIST</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>

                            {/* Check-In Incentive Array (Only if attending) */}
                            {ev.isAttending && (
                                <View style={styles.incentiveArea}>
                                    <TouchableOpacity style={styles.checkInBtn} onPress={handleCheckIn}>
                                        <Icon name="MapPin" size={16} color={colors.radarNeon} />
                                        <Text style={styles.checkInText}>GPS CHECK-IN (+50 CRED)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.reportBtn} onPress={handleUploadReport}>
                                        <Icon name="Camera" size={16} color={colors.textPrimary} />
                                        <Text style={styles.reportText}>FIELD REPORT</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/* Contextual Gear Integration */}
                            {ev.gearSuggest && (
                                <View style={styles.gearBanner}>
                                    <View style={styles.gearIconBox}>
                                        <Icon name="Shield" size={20} color={colors.proShopAccent} />
                                    </View>
                                    <View style={styles.gearTextContent}>
                                        <Text style={styles.gearReason}>{ev.gearSuggest.reason}</Text>
                                        <Text style={styles.gearItem}>{ev.gearSuggest.item}</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Icon name="ShoppingCart" size={20} color={colors.textPrimary} />
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/* Ticket Integration */}
                            <TouchableOpacity style={styles.ticketLanyard}>
                                <Text style={styles.ticketText}>SECURE TICKETS (EXTERNAL)</Text>
                                <Icon name="ExternalLink" size={14} color={colors.textSecondary} />
                            </TouchableOpacity>

                        </View>
                    </View>
                ))}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0A0A0A' }, // Extra dark for neon pop
    radarMapArea: {
        height: 220,
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        overflow: 'hidden',
    },
    mapDarken: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.3,
        tintColor: '#00FF41', // Creating a mock night-vision map tint
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(5, 5, 5, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radarCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    radarRing1: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 65, 0.4)',
    },
    radarRing2: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 65, 0.2)',
    },
    heatBlip: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 255, 65, 0.6)',
        borderRadius: 30,
        shadowColor: colors.radarNeon,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    radarStatus: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 65, 0.3)',
    },
    radarStatusText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.radarNeon,
        marginLeft: 6,
    },
    filterRibbon: {
        paddingVertical: 12,
        backgroundColor: '#111',
        borderBottomWidth: 1,
        borderBottomColor: '#222',
    },
    filterContent: {
        paddingHorizontal: 16,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 8,
        backgroundColor: '#1A1A1A',
    },
    filterPillActive: {
        borderColor: colors.radarNeon,
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
    },
    filterText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
    },
    filterTextActive: {
        fontWeight: 'bold',
        color: colors.radarNeon,
        textShadowColor: 'rgba(0, 255, 65, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    feedArea: {
        flex: 1,
        padding: 16,
    },
    eventCard: {
        backgroundColor: '#161616',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2A2A2A',
        marginBottom: 20,
        overflow: 'hidden',
    },
    eventImage: {
        width: '100%',
        height: 180,
    },
    eventContextStrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.radarNeon,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    catBadge: {
        backgroundColor: '#121212',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    catText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.radarNeon,
    },
    eventTime: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#121212',
    },
    eventBody: {
        padding: 16,
    },
    eventTitle: {
        ...typography.radarEventTitle,
        marginBottom: 8,
        letterSpacing: 1,
    },
    eventLocation: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 16,
    },
    attendanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'rgba(0, 255, 65, 0.05)',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 65, 0.2)',
    },
    attendeeCount: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.radarNeon,
        marginLeft: 8,
        fontWeight: 'bold',
    },
    eventActions: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    actionBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        marginRight: 8,
    },
    actionBtnOutline: {
        borderWidth: 1,
        borderColor: colors.radarNeon,
        backgroundColor: 'transparent',
    },
    actionBtnActive: {
        backgroundColor: colors.radarNeon,
    },
    actionBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.radarNeon,
    },
    actionBtnTextActive: {
        color: '#121212',
    },
    huddleBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 4,
        paddingVertical: 12,
        marginRight: 8,
    },
    huddleBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 8,
    },
    checklistBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        borderRadius: 4,
        paddingVertical: 12,
    },
    checklistBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 8,
    },
    attendingActionsRow: {
        flex: 2,
        flexDirection: 'row',
    },
    incentiveArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#2A2A2A',
        paddingTop: 16,
        marginBottom: 16,
    },
    checkInBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.radarNeon,
        borderRadius: 4,
        paddingVertical: 10,
        marginRight: 8,
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
    },
    checkInText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.radarNeon,
        marginLeft: 6,
    },
    reportBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 4,
        paddingVertical: 10,
    },
    reportText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginLeft: 6,
    },
    gearBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderWidth: 1,
        borderColor: colors.proShopAccent,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    gearIconBox: {
        marginRight: 12,
        backgroundColor: 'rgba(255, 87, 34, 0.1)',
        padding: 8,
        borderRadius: 20,
    },
    gearTextContent: {
        flex: 1,
    },
    gearReason: {
        ...typography.body,
        fontSize: 10,
        color: colors.textSecondary,
        marginBottom: 2,
    },
    gearItem: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.proShopAccent,
    },
    ticketLanyard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#111',
        padding: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333',
    },
    ticketText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        letterSpacing: 1,
    }
});
