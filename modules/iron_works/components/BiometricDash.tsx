import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

interface BiometricDashProps {
    isAuthorized: boolean;
    isSyncing: boolean;
    steps: number;
    recoveryScore: number;
    onSync: () => void;
}

export const BiometricDash: React.FC<BiometricDashProps> = ({
    isAuthorized,
    isSyncing,
    steps,
    recoveryScore,
    onSync,
}) => {
    if (!isAuthorized && !isSyncing) {
        return (
            <Card style={styles.container}>
                <View style={styles.unauthContent}>
                    <Icon name="Activity" size={32} color={colors.textSecondary} />
                    <Text style={styles.unauthText}>Connect Health Data to Unlock Personalized Training</Text>
                    <Button title="Sync Biometrics" onPress={onSync} style={styles.syncButton} />
                </View>
            </Card>
        );
    }

    if (isSyncing) {
        return (
            <Card style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={colors.ironWorksAccent} />
                <Text style={styles.syncingText}>Syncing Health Data...</Text>
            </Card>
        );
    }

    // Determine recovery color
    let recoveryColor = '#4CAF50'; // Green
    if (recoveryScore < 30) recoveryColor = '#F44336'; // Red
    else if (recoveryScore < 60) recoveryColor = '#FF9800'; // Orange

    return (
        <Card style={styles.container}>
            <Text style={styles.headerTitle}>Biometrics</Text>
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Icon name="HeartPulse" size={24} color={recoveryColor} />
                    <Text style={styles.statLabel}>Recovery</Text>
                    <Text style={[styles.statValue, { color: recoveryColor }]}>{recoveryScore}%</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statBox}>
                    <Icon name="Footprints" size={24} color={colors.ironWorksAccent} />
                    <Text style={styles.statLabel}>Steps</Text>
                    <Text style={styles.statValue}>{steps.toLocaleString()}</Text>
                </View>
            </View>
            <Button title="Re-Sync" variant="secondary" onPress={onSync} style={{ marginTop: 16 }} />
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
    },
    unauthContent: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    unauthText: {
        ...typography.body,
        textAlign: 'center',
        marginVertical: 16,
    },
    syncButton: {
        width: '100%',
    },
    syncingText: {
        ...typography.body,
        marginTop: 16,
    },
    headerTitle: {
        ...typography.subheader,
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: '80%',
        backgroundColor: colors.border,
    },
    statLabel: {
        ...typography.body,
        fontSize: 12,
        marginTop: 8,
    },
    statValue: {
        ...typography.header,
        marginTop: 4,
    },
});
