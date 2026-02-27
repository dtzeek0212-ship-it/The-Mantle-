import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from '../../../components/Card';
import { Icon } from '../../../components/Icon';
import { typography } from '../../../theme/typography';
import { colors } from '../../../theme/colors';
import { WeatherData, fetchOutdoorData } from '../services/OutdoorAPI';

export const ScouterWidget = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const result = await fetchOutdoorData();
            setData(result);
            setLoading(false);
        };
        load();
    }, []);

    if (loading || !data) {
        return (
            <Card style={styles.card}>
                <View style={styles.header}>
                    <View style={{ width: 120, height: 24, backgroundColor: '#333', borderRadius: 4, opacity: 0.5 }} />
                </View>
                <View style={styles.grid}>
                    <View style={[styles.dataBox, { height: 60, opacity: 0.3, backgroundColor: '#333', borderColor: 'transparent' }]} />
                    <View style={[styles.dataBox, { height: 60, opacity: 0.3, backgroundColor: '#333', borderColor: 'transparent' }]} />
                    <View style={[styles.dataBox, { height: 60, opacity: 0.3, backgroundColor: '#333', borderColor: 'transparent' }]} />
                    <View style={[styles.dataBox, { height: 60, opacity: 0.3, backgroundColor: '#333', borderColor: 'transparent' }]} />
                </View>
                <View style={{ height: 44, backgroundColor: '#333', borderRadius: 4, opacity: 0.5, marginTop: 8 }} />
            </Card>
        );
    }

    return (
        <Card style={styles.card}>
            <View style={styles.header}>
                <Icon name="Compass" size={20} color={colors.fieldStreamAccent} />
                <Text style={styles.title}>Scouter Intel</Text>
            </View>

            <View style={styles.grid}>
                <View style={styles.dataBox}>
                    <Text style={styles.label}>Temp</Text>
                    <Text style={styles.value}>{data.temperature}°</Text>
                </View>
                <View style={styles.dataBox}>
                    <Text style={styles.label}>Wind</Text>
                    <Text style={styles.value}>{data.windSpeed} mph {data.windDirection}</Text>
                </View>
                <View style={styles.dataBox}>
                    <Text style={styles.label}>Pressure</Text>
                    <Text style={styles.value}>{data.barometricPressure} inHg</Text>
                </View>
                <View style={styles.dataBox}>
                    <Text style={styles.label}>Moon</Text>
                    <Text style={styles.value}>{data.moonPhase}</Text>
                </View>
            </View>

            <View style={styles.activityBanner}>
                <Text style={styles.activityLabel}>Wildlife Activity:</Text>
                <Text style={[
                    styles.activityValue,
                    data.activityLevel === 'Peak' && styles.peakActivity
                ]}>{data.activityLevel}</Text>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftColor: colors.fieldStreamAccent,
    },
    loadingText: {
        ...typography.body,
        marginTop: 12,
    },
    card: {
        borderLeftColor: colors.fieldStreamAccent,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        ...typography.subheader,
        color: colors.fieldStreamAccent,
        marginLeft: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dataBox: {
        width: '48%',
        backgroundColor: colors.background,
        padding: 12,
        borderRadius: 4,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    label: {
        ...typography.body,
        fontSize: 10,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    value: {
        ...typography.body, // Roboto Mono for tactical readout
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    activityBanner: {
        marginTop: 8,
        backgroundColor: colors.background,
        padding: 12,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    activityLabel: {
        ...typography.subheader,
        fontSize: 14,
    },
    activityValue: {
        ...typography.body, // Roboto Mono
        fontWeight: 'bold',
        color: colors.textSecondary,
    },
    peakActivity: {
        color: colors.forestMoss,
    }
});
