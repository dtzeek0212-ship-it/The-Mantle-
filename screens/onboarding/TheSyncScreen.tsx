import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/Icon';
import { useUser } from '../../context/UserContext';

const PERMISSIONS = [
    { id: 'location', title: 'LOCATION DATA', desc: 'Secure mapping. Required to find local tradesmen and hunting weather.', required: true },
    { id: 'health', title: 'HEALTH METRICS', desc: 'Sync with smart watches to populate Iron Works readiness scores.', required: false },
    { id: 'notifications', title: 'TARGETED ALERTS', desc: 'Push notifications for Pro Shop drop countdowns and severe weather warnings.', required: false },
];

export const TheSyncScreen = () => {
    const navigation = useNavigation<any>();
    const { completeOnboarding } = useUser();

    const [permissions, setPermissions] = useState({
        location: false,
        health: false,
        notifications: false,
    });

    const togglePermission = (id: keyof typeof permissions) => {
        setPermissions(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSyncComplete = () => {
        // In a real app, this would request actual OS permissions
        // Then update global state to drop user into the app
        completeOnboarding();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.stepText}>04 // THE CONNECTION</Text>
                <Text style={styles.headline}>ESTABLISH SYNC</Text>
                <Text style={styles.subheadline}>Grant hardware permissions to operationalize the Mantle subsystems.</Text>
            </View>

            <View style={styles.listContainer}>
                {PERMISSIONS.map((perm) => (
                    <View key={perm.id} style={styles.permCard}>
                        <View style={styles.permTextContent}>
                            <View style={styles.permHeaderRow}>
                                <Text style={styles.permTitle}>{perm.title}</Text>
                                {perm.required && (
                                    <View style={styles.requiredBadge}>
                                        <Text style={styles.requiredText}>CRITICAL SYSTEM</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.permDesc}>{perm.desc}</Text>
                        </View>
                        <Switch
                            value={permissions[perm.id as keyof typeof permissions]}
                            onValueChange={() => togglePermission(perm.id as keyof typeof permissions)}
                            trackColor={{ false: '#3A3A3A', true: colors.primary }}
                            thumbColor={permissions[perm.id as keyof typeof permissions] ? '#FFF' : '#B0B0B0'}
                        />
                    </View>
                ))}
            </View>

            <View style={styles.actionFooter}>
                <TouchableOpacity
                    style={styles.syncBtn}
                    onPress={handleSyncComplete}
                >
                    <Icon name="Radio" size={20} color="#121212" />
                    <Text style={styles.syncText}>INITIALIZE MANTLE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingTop: 80,
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    stepText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.primary,
        letterSpacing: 2,
        marginBottom: 12,
    },
    headline: {
        ...typography.header,
        color: '#FFF',
        fontSize: 28,
        marginBottom: 8,
    },
    subheadline: {
        ...typography.body,
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 22,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 24,
    },
    permCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    permTextContent: {
        flex: 1,
        marginRight: 16,
    },
    permHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    permTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
    },
    requiredBadge: {
        backgroundColor: 'rgba(255, 87, 34, 0.2)', // Orange tint
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 12,
    },
    requiredText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 8,
        color: colors.workshopAction,
        fontWeight: 'bold',
    },
    permDesc: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    actionFooter: {
        padding: 24,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
    },
    syncBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 4,
    },
    syncText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 12,
        letterSpacing: 2,
    }
});
