import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';

interface LogEntry {
    id: string;
    target: string;
    weapon: string;
    gps: string;
    time: string;
}

export const HarvestLogScreen = () => {
    const [target, setTarget] = useState('');
    const [weapon, setWeapon] = useState('');
    const [logs, setLogs] = useState<LogEntry[]>([
        { id: '1', target: '8-Point Buck', weapon: 'Compound Bow', gps: 'LAT 45.12, LON -93.34', time: '11/04 - 06:14 AM' }
    ]);

    const handleSave = () => {
        if (!target.trim() || !weapon.trim()) return;

        const newLog: LogEntry = {
            id: Date.now().toString(),
            target,
            weapon,
            gps: `LAT ${(Math.random() * 90).toFixed(2)}, LON -${(Math.random() * 180).toFixed(2)}`,
            time: new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setLogs([newLog, ...logs]);
        setTarget('');
        setWeapon('');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.header}>Field Notes</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Target Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. 10-Point Buck, Mallard Drake"
                    placeholderTextColor={colors.textSecondary}
                    value={target}
                    onChangeText={setTarget}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Weapon / Tackle Used</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Rifle, Compound Bow, Fly Rod"
                    placeholderTextColor={colors.textSecondary}
                    value={weapon}
                    onChangeText={setWeapon}
                />
            </View>

            <Button
                title="Log Harvest"
                onPress={handleSave}
                style={styles.saveBtn}
                textStyle={styles.saveBtnText}
            />

            <View style={styles.galleryHeader}>
                <Icon name="Award" size={24} color={colors.fieldStreamAccent} />
                <Text style={styles.galleryTitle}>The Trophy Room</Text>
            </View>

            {logs.map((log) => (
                <Card key={log.id} style={styles.logCard}>
                    <Text style={styles.logTarget}>{log.target}</Text>
                    <Text style={styles.logWeapon}>Via: {log.weapon}</Text>
                    <View style={styles.metaRow}>
                        <Icon name="MapPin" size={12} color={colors.textSecondary} />
                        <Text style={styles.metaText}>{log.gps}</Text>
                    </View>
                    <View style={styles.metaRow}>
                        <Icon name="Clock" size={12} color={colors.textSecondary} />
                        <Text style={styles.metaText}>{log.time}</Text>
                    </View>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    header: {
        ...typography.header,
        color: colors.fieldStreamAccent,
        marginBottom: 24,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        ...typography.subheader,
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        padding: 12,
        ...typography.body,
        color: colors.textPrimary,
    },
    saveBtn: {
        marginTop: 8,
        marginBottom: 32,
        backgroundColor: colors.forestMoss,
        borderColor: colors.forestMoss,
    },
    saveBtnText: {
        color: '#FFF',
    },
    galleryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 8,
    },
    galleryTitle: {
        ...typography.subheader,
        marginLeft: 8,
    },
    logCard: {
        borderLeftColor: colors.forestMoss,
    },
    logTarget: {
        ...typography.subheader,
        fontSize: 18,
    },
    logWeapon: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    metaText: {
        ...typography.body, // Roboto Mono
        fontSize: 11,
        marginLeft: 6,
        color: colors.fieldStreamAccent,
    },
});
