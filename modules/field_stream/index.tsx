import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/Icon';
import { ScouterWidget } from './components/ScouterWidget';
import { TacticalMap } from './components/TacticalMap';
import { LoadoutTabs } from './components/LoadoutTabs';
import { FieldTalkFeed } from './components/FieldTalkFeed';
import { TrailCamFeed } from './components/TrailCamFeed';
import { AddCameraModal, CameraData } from './components/AddCameraModal';
import { WeatherData, fetchOutdoorData } from './services/OutdoorAPI';

export const FieldStreamScreen = () => {
    const navigation = useNavigation();
    const [flashlightActive, setFlashlightActive] = useState(false);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [cams, setCams] = useState<CameraData[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        fetchOutdoorData().then(setWeatherData);
    }, []);

    const handleSOS = () => {
        Alert.alert("Emergency Beacon", "Simulating SOS sequence transmission via satellite...", [
            { text: "Cancel", style: "cancel" },
            { text: "Transmit", onPress: () => console.log("SOS Sent") }
        ]);
    };

    return (
        <View style={styles.container}>
            {/* Contextual Top Header with Emergency Actions */}
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.headerTitle}>Field & Stream</Text>
                    <Text style={styles.headerSubtitle}>The 'Scouter' Dashboard</Text>
                </View>
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.actionBtn, flashlightActive && styles.actionBtnActive]}
                        onPress={() => setFlashlightActive(!flashlightActive)}
                    >
                        <Icon name="Flashlight" size={20} color={flashlightActive ? '#000' : colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.sosBtn]}
                        onPress={handleSOS}
                    >
                        <Text style={styles.sosText}>SOS</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Simulated Flashlight Overlay */}
            {flashlightActive && <View style={styles.flashlightOverlay} />}

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ScouterWidget />
                <TacticalMap />

                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionHeader}>Live Trail Cams</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addCamBtn}>
                        <Icon name="Plus" size={16} color={colors.fieldStreamAccent} />
                        <Text style={styles.addCamText}>Add Cam</Text>
                    </TouchableOpacity>
                </View>

                {cams.length === 0 ? (
                    <View style={styles.emptyCamBox}>
                        <Icon name="CameraOff" size={32} color={colors.textSecondary} />
                        <Text style={styles.emptyCamText}>No Active Cameras</Text>
                    </View>
                ) : (
                    cams.map((cam) => (
                        <TrailCamFeed key={cam.id} name={cam.name} ipLink={cam.ipLink} />
                    ))
                )}

                {/* Placeholder Hooks for Next Tasks */}
                <Text style={styles.sectionHeader}>Hyper-Utility Tools</Text>
                <View style={styles.toolsGrid}>
                    <TouchableOpacity style={styles.toolCard} onPress={() => navigation.navigate('TrackerAI' as never)}>
                        <Icon name="Search" size={32} color={colors.fieldStreamAccent} />
                        <Text style={styles.toolText}>Tracker AI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolCard} onPress={() => navigation.navigate('HarvestLog' as never)}>
                        <Icon name="FileText" size={32} color={colors.fieldStreamAccent} />
                        <Text style={styles.toolText}>Harvest Log</Text>
                    </TouchableOpacity>
                </View>

                {/* The Trailhead Sub-Module Button */}
                <TouchableOpacity
                    style={[styles.toolCard, { marginTop: 12, marginHorizontal: 4, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#1E1D1A', borderColor: colors.trailheadAccent }]}
                    onPress={() => navigation.navigate('TrailheadDashboard' as never)}
                >
                    <Icon name="Compass" size={24} color={colors.trailheadAccent} />
                    <Text style={[styles.toolText, { marginTop: 0, marginLeft: 12, color: colors.trailheadAccent, fontFamily: 'Roboto Mono' }]}>THE TRAILHEAD</Text>
                </TouchableOpacity>

                <Text style={styles.sectionHeader}>Activity Loadouts</Text>
                <LoadoutTabs weatherData={weatherData} />

                <Text style={[styles.sectionHeader, { color: colors.fieldStreamAccent, marginTop: 24 }]}>Secure Comms</Text>
                <FieldTalkFeed />

                <AddCameraModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onAdd={(newCam) => setCams([newCam, ...cams])}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        zIndex: 10,
    },
    headerTitle: {
        ...typography.header,
    },
    headerSubtitle: {
        ...typography.body,
        color: colors.fieldStreamAccent,
    },
    actionRow: {
        flexDirection: 'row',
    },
    actionBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    actionBtnActive: {
        backgroundColor: '#FFFFFF',
    },
    sosBtn: {
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        borderColor: '#F44336',
    },
    sosText: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#F44336',
        fontSize: 12,
    },
    flashlightOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // High brightness simulation
        zIndex: 5,
        pointerEvents: 'none',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    sectionHeader: {
        ...typography.subheader,
        marginTop: 8,
        marginBottom: 16,
        color: colors.forestMoss,
    },
    addCamBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(121, 85, 72, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    addCamText: {
        ...typography.body,
        fontSize: 12,
        color: colors.fieldStreamAccent,
        marginLeft: 4,
        fontWeight: 'bold',
    },
    emptyCamBox: {
        height: 120,
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyCamText: {
        ...typography.body,
        color: colors.textSecondary,
        marginTop: 8,
    },
    toolsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    toolCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 24,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    toolText: {
        ...typography.body,
        marginTop: 12,
        fontWeight: 'bold',
    },
});
