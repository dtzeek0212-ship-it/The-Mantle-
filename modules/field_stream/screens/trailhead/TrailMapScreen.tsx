import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../../../theme/colors';
import { typography } from '../../../../theme/typography';
import { Icon } from '../../../../components/Icon';

const TRAIL_DATA = [
    {
        id: 'tr1',
        name: 'Black Bear Pass',
        location: 'Telluride, CO',
        terrain: 'Rock',
        ruggedness: 5,
        status: 'Clear',
        distance: '12.4 mi',
        image: 'https://images.unsplash.com/photo-1627063065600-e79435b8dd2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'tr2',
        name: 'Red River Gorge OHV',
        location: 'Slade, KY',
        terrain: 'Mud',
        ruggedness: 3,
        status: 'Flooded Sections',
        distance: '45.0 mi',
        image: 'https://images.unsplash.com/photo-1611186716298-0524cb1c3d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
];

export const TrailMapScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.mockMapArea}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }}
                    style={styles.mapBackground}
                />
                <View style={styles.mapOverlay}>
                    <View style={styles.targetCenter}>
                        <Icon name="Crosshair" size={32} color={colors.trailheadAccent} />
                    </View>
                </View>

                <View style={styles.mapControls}>
                    <TouchableOpacity style={styles.controlBtn}>
                        <Icon name="Compass" size={20} color="#121212" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlBtn}>
                        <Icon name="Layers" size={20} color="#121212" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.listArea} showsVerticalScrollIndicator={false}>
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>NEARBY TRAILS</Text>
                    <Text style={styles.listSubtitle}>Public OHV Access</Text>
                </View>

                {TRAIL_DATA.map(trail => (
                    <View key={trail.id} style={styles.trailCard}>
                        <Image source={{ uri: trail.image }} style={styles.trailImage} />

                        <View style={styles.trailContent}>
                            <View style={styles.trailHeaderRow}>
                                <Text style={styles.trailName}>{trail.name}</Text>
                                <View style={styles.ruggedBadge}>
                                    <Text style={styles.ruggedText}>CLASS {trail.ruggedness}</Text>
                                </View>
                            </View>

                            <Text style={styles.trailLocation}>{trail.location} • {trail.distance}</Text>

                            <View style={styles.statsRow}>
                                <View style={styles.statBox}>
                                    <Icon name="Map" size={14} color={colors.textSecondary} />
                                    <Text style={styles.statText}>{trail.terrain}</Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Icon name="AlertTriangle" size={14} color={trail.status.includes('Clear') ? '#388E3C' : colors.workshopAction} />
                                    <Text style={styles.statText}>{trail.status}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.downloadBtn}>
                                <Icon name="Download" size={16} color="#121212" />
                                <Text style={styles.downloadText}>DOWNLOAD FOR TRAIL (OFFLINE)</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#161513' },
    mockMapArea: {
        height: 300,
        position: 'relative',
        borderBottomWidth: 2,
        borderBottomColor: colors.trailheadAccent,
    },
    mapBackground: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.6,
    },
    mapOverlay: {
        flex: 1,
        backgroundColor: 'rgba(22, 21, 19, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    targetCenter: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgba(255, 215, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapControls: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        flexDirection: 'row',
    },
    controlBtn: {
        backgroundColor: colors.trailheadAccent,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    listArea: { flex: 1, padding: 16 },
    listHeader: { marginBottom: 16 },
    listTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.trailheadAccent,
        letterSpacing: 2,
    },
    listSubtitle: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
    trailCard: {
        backgroundColor: '#1E1D1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2C2A26',
        marginBottom: 16,
        overflow: 'hidden',
    },
    trailImage: {
        width: '100%',
        height: 140,
        backgroundColor: '#111',
    },
    trailContent: { padding: 16 },
    trailHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    trailName: {
        ...typography.header,
        fontSize: 18,
        color: '#FFF',
    },
    ruggedBadge: {
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.trailheadAccent,
    },
    ruggedText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.trailheadAccent,
    },
    trailLocation: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    statBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#11100F',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        marginRight: 12,
    },
    statText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: '#E0E0E0',
        marginLeft: 8,
    },
    downloadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.trailheadAccent,
        paddingVertical: 14,
        borderRadius: 4,
    },
    downloadText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 8,
        letterSpacing: 1,
    }
});
