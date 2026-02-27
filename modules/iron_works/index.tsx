import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/Icon';
import { ReadinessRing } from './components/ReadinessRing';
import { IronCrewFeed } from './components/IronCrewFeed';
import { PRTracker } from './components/PRTracker';
import { fetchBiometricData, BiometricData } from './services/BiometricSyncEngine';

export const IronWorksScreen = () => {
    const navigation = useNavigation();
    const [biometrics, setBiometrics] = useState<BiometricData | null>(null);

    useEffect(() => {
        fetchBiometricData().then(setBiometrics);
    }, []);

    const renderAdaptiveWorkout = () => {
        if (!biometrics) return null;

        const isRecovery = biometrics.readinessScore < 40;

        return (
            <TouchableOpacity style={[styles.adaptiveCard, { borderColor: isRecovery ? colors.ironWorksAccent : colors.commandCenterAccent }]}>
                <View style={styles.cardHeader}>
                    <Icon name={isRecovery ? "HeartPulse" : "Dumbbell"} size={24} color={isRecovery ? colors.ironWorksAccent : colors.commandCenterAccent} />
                    <Text style={[styles.cardTitle, { color: isRecovery ? colors.ironWorksAccent : colors.commandCenterAccent }]}>
                        {isRecovery ? "Recovery Required" : "High-Intensity Optimal"}
                    </Text>
                </View>
                <Text style={styles.cardSubtitle}>
                    {isRecovery
                        ? "Your HRV is low and sleep was poor. Focus on mobility today."
                        : "Biometrics prime. Hit the weights hard today."}
                </Text>
                <View style={styles.actionRow}>
                    <Text style={styles.actionText}>{isRecovery ? "Start 20m Mobility Flow" : "Start Heavy Push Day"}</Text>
                    <Icon name="ChevronRight" size={20} color={colors.textSecondary} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Iron Works</Text>
                    <Text style={styles.headerSubtitle}>Physical Readiness & Fuel</Text>
                </View>
                <TouchableOpacity style={styles.syncBtn} onPress={() => { setBiometrics(null); fetchBiometricData().then(setBiometrics); }}>
                    <Icon name="RefreshCw" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Biometric Sync Engine Dashboard */}
                <View style={styles.dashboardGrid}>
                    <View style={styles.ringContainer}>
                        {biometrics ? (
                            <ReadinessRing score={biometrics.readinessScore} size={140} />
                        ) : (
                            <View style={{ height: 140, width: 140, borderRadius: 70, borderWidth: 8, borderColor: '#333', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                                <View style={{ width: 40, height: 20, backgroundColor: '#333', borderRadius: 4 }} />
                            </View>
                        )}
                        <Text style={styles.ringLabel}>READINESS</Text>
                    </View>

                    <View style={styles.metricsColumn}>
                        <View style={styles.metricItem}>
                            <Icon name="Moon" size={16} color={colors.textSecondary} />
                            <View style={styles.metricTexts}>
                                <Text style={styles.metricValue}>{biometrics ? `${biometrics.sleepHours}h` : '--'}</Text>
                                <Text style={styles.metricLabel}>Sleep</Text>
                            </View>
                        </View>
                        <View style={styles.metricItem}>
                            <Icon name="Activity" size={16} color={colors.textSecondary} />
                            <View style={styles.metricTexts}>
                                <Text style={styles.metricValue}>{biometrics ? `${biometrics.hrv}ms` : '--'}</Text>
                                <Text style={styles.metricLabel}>HRV</Text>
                            </View>
                        </View>
                        <View style={styles.metricItem}>
                            <Icon name="Heart" size={16} color={colors.textSecondary} />
                            <View style={styles.metricTexts}>
                                <Text style={styles.metricValue}>{biometrics ? `${biometrics.restingHr}` : '--'}</Text>
                                <Text style={styles.metricLabel}>Rest HR</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* AI-Adaptive Workout Suggestion */}
                <Text style={styles.sectionHeader}>AI-Adaptive Protocol</Text>
                {renderAdaptiveWorkout()}

                {/* Module Interlinks */}
                <Text style={styles.sectionHeader}>Cross-Module Integrations</Text>

                <TouchableOpacity style={styles.interlinkCard}>
                    <View style={styles.interlinkHeader}>
                        <Icon name="Tent" size={20} color={colors.fieldStreamAccent} />
                        <Text style={styles.interlinkTitle}>Field & Stream Prep</Text>
                    </View>
                    <Text style={styles.interlinkDesc}>24 Days until Elk Season. Suggested workout: 5-Mile Heavy Ruck.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.interlinkCard}>
                    <View style={styles.interlinkHeader}>
                        <Icon name="Wrench" size={20} color={colors.workshopAccent} />
                        <Text style={styles.interlinkTitle}>Workshop Recovery</Text>
                    </View>
                    <Text style={styles.interlinkDesc}>Heavy lifting logged yesterday. Suggested: Lower back active release.</Text>
                </TouchableOpacity>

                <Text style={styles.sectionHeader}>Tactical Training</Text>
                <View style={styles.navGrid}>
                    <TouchableOpacity style={styles.navBlock} onPress={() => navigation.navigate('TrainingPrograms' as never)}>
                        <Icon name="Dumbbell" size={32} color={colors.textPrimary} />
                        <Text style={styles.navText}>Programs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navBlock} onPress={() => navigation.navigate('FuelStation' as never)}>
                        <Icon name="Coffee" size={32} color={colors.textPrimary} />
                        <Text style={styles.navText}>Fuel Station</Text>
                    </TouchableOpacity>
                </View>

                {/* Community & Accountability */}
                <Text style={styles.sectionHeader}>Accountability & Records</Text>
                <PRTracker />
                <Text style={styles.sectionHeader}>The Iron Crew</Text>
                <IronCrewFeed />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    headerTitle: {
        ...typography.header,
    },
    headerSubtitle: {
        ...typography.body,
        color: colors.ironWorksAccent, // Crimson Red theme
    },
    syncBtn: {
        backgroundColor: colors.border,
        padding: 10,
        borderRadius: 8,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    sectionHeader: {
        ...typography.subheader,
        color: colors.textSecondary,
        marginTop: 24,
        marginBottom: 12,
    },
    dashboardGrid: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
    },
    ringContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ringLabel: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        fontWeight: 'bold',
        marginTop: 8,
        letterSpacing: 2,
    },
    metricsColumn: {
        flex: 1,
        paddingLeft: 20,
        borderLeftWidth: 1,
        borderLeftColor: colors.border,
    },
    metricItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    metricTexts: {
        marginLeft: 12,
    },
    metricValue: {
        ...typography.body, // Roboto Mono for data
        color: colors.textPrimary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    metricLabel: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
    },
    adaptiveCard: {
        backgroundColor: 'rgba(255, 0, 0, 0.05)', // Slight red tint
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        ...typography.body,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    cardSubtitle: {
        ...typography.body,
        color: colors.textSecondary,
        lineHeight: 20,
        marginBottom: 16,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 12,
    },
    actionText: {
        ...typography.body,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    interlinkCard: {
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 12,
    },
    interlinkHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    interlinkTitle: {
        ...typography.body,
        fontWeight: 'bold',
        marginLeft: 8,
        color: colors.textPrimary,
    },
    interlinkDesc: {
        ...typography.body,
        color: colors.textSecondary,
    },
    navGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    navBlock: {
        width: '48%',
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 16,
    },
    navText: {
        ...typography.body,
        marginTop: 12,
        fontWeight: 'bold',
    }
});
