import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { WeatherData } from '../services/OutdoorAPI';

interface LoadoutProps {
    weatherData: WeatherData | null;
}

export const LoadoutTabs: React.FC<LoadoutProps> = ({ weatherData }) => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'hunting' | 'fishing' | 'camping'>('hunting');

    const renderHuntingLoadout = () => (
        <View style={styles.loadoutContent}>
            <View style={styles.metricRow}>
                <Icon name="Sunrise" size={20} color={colors.textSecondary} />
                <Text style={styles.metricText}>Sunrise: 06:42 AM</Text>
                <Icon name="Sunset" size={20} color={colors.textSecondary} />
                <Text style={styles.metricText}>Sunset: 05:18 PM</Text>
            </View>
            <Card style={styles.intelCard}>
                <Text style={styles.intelTitle}>Scent Control intel</Text>
                <Text style={styles.intelData}>
                    Wind is currently blowing <Text style={{ color: colors.fieldStreamAccent }}>{weatherData?.windDirection}</Text> at {weatherData?.windSpeed} mph.
                    Recommended approach: Hunt stands facing South/South-East.
                </Text>
            </Card>

            {/* Contextual Gear Drop */}
            {weatherData && weatherData.temperature < 45 && (
                <TouchableOpacity
                    style={styles.gearDropAd}
                    onPress={() => navigation.navigate('Pro Shop' as never)}
                >
                    <Icon name="ThermometerSnowflake" size={24} color={colors.primary} />
                    <View style={styles.adContent}>
                        <Text style={styles.adTitle}>Cold Front Detected</Text>
                        <Text style={styles.adSubtitle}>Shop Late Season Base Layers</Text>
                    </View>
                    <Icon name="ChevronRight" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
            )}
        </View>
    );

    const renderFishingLoadout = () => (
        <View style={styles.loadoutContent}>
            <View style={styles.metricRow}>
                <Icon name="Waves" size={20} color={colors.textSecondary} />
                <Text style={styles.metricText}>Water Temp: 54°F</Text>
            </View>
            <Card style={styles.intelCard}>
                <Text style={styles.intelTitle}>Tidal Intel</Text>
                <Text style={styles.intelData}>High Tide: 08:30 AM | Low Tide: 02:45 PM</Text>
            </Card>

            {/* Contextual Gear Drop */}
            {weatherData && weatherData.activityLevel === 'Peak' && (
                <TouchableOpacity
                    style={styles.gearDropAd}
                    onPress={() => navigation.navigate('Pro Shop' as never)}
                >
                    <Icon name="Fish" size={24} color={colors.primary} />
                    <View style={styles.adContent}>
                        <Text style={styles.adTitle}>Peak Activity Window</Text>
                        <Text style={styles.adSubtitle}>Shop Best-Selling Lures & Scents</Text>
                    </View>
                    <Icon name="ChevronRight" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
            )}
        </View>
    );

    const renderCampingLoadout = () => (
        <View style={styles.loadoutContent}>
            <View style={styles.metricRow}>
                <Icon name="Flame" size={20} color={colors.error} />
                <Text style={styles.metricText}>Fire Restriction: LOW</Text>
            </View>
            <Card style={styles.intelCard}>
                <Text style={styles.intelTitle}>Camp Intel</Text>
                <Text style={styles.intelData}>
                    Nighttime Low: <Text style={{ color: colors.fieldStreamAccent, fontWeight: 'bold' }}>{weatherData?.temperature ? weatherData.temperature - 15 : 30}°F</Text>{'\n'}
                    Moon Phase: <Text style={{ color: '#FFF' }}>{weatherData?.moonPhase}</Text> (Good stargazing){'\n'}
                    Wind: Pitch tent facing <Text style={{ color: colors.forestMoss, fontWeight: 'bold' }}>{weatherData?.windDirection === 'NW' ? 'SE' : 'NW'}</Text> to avoid direct gusts.
                </Text>
            </Card>

            <Text style={styles.checklistTitle}>Basecamp Setup</Text>
            {['Clear debris from tent pad', 'Hang bear bag 15ft min', 'Collect kindling before dark', 'Orient solar panels South'].map((item, i) => (
                <View key={i} style={styles.checklistItem}>
                    <Icon name="Square" size={20} color={colors.textSecondary} />
                    <Text style={styles.checkText}>{item}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.tabHeader}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'hunting' && styles.activeTab]}
                    onPress={() => setActiveTab('hunting')}
                >
                    <Icon name="Target" size={20} color={activeTab === 'hunting' ? colors.fieldStreamAccent : colors.textSecondary} />
                    <Text style={[styles.tabText, activeTab === 'hunting' && styles.activeTabText]}>HUNT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'fishing' && styles.activeTab]}
                    onPress={() => setActiveTab('fishing')}
                >
                    <Icon name="Fish" size={20} color={activeTab === 'fishing' ? colors.fieldStreamAccent : colors.textSecondary} />
                    <Text style={[styles.tabText, activeTab === 'fishing' && styles.activeTabText]}>FISH</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'camping' && styles.activeTab]}
                    onPress={() => setActiveTab('camping')}
                >
                    <Icon name="Tent" size={20} color={activeTab === 'camping' ? colors.fieldStreamAccent : colors.textSecondary} />
                    <Text style={[styles.tabText, activeTab === 'camping' && styles.activeTabText]}>CAMP</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'hunting' && renderHuntingLoadout()}
            {activeTab === 'fishing' && renderFishingLoadout()}
            {activeTab === 'camping' && renderCampingLoadout()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    tabHeader: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: 4,
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
    },
    activeTab: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },
    tabText: {
        ...typography.body,
        fontWeight: 'bold',
        marginLeft: 8,
        color: colors.textSecondary,
    },
    activeTabText: {
        color: colors.fieldStreamAccent,
    },
    loadoutContent: {
        minHeight: 200,
    },
    metricRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 16,
        backgroundColor: colors.surface,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    metricText: {
        ...typography.body,
        fontWeight: 'bold',
    },
    intelCard: {
        borderLeftColor: colors.forestMoss,
        marginBottom: 16,
    },
    intelTitle: {
        ...typography.subheader,
        color: colors.forestMoss,
        marginBottom: 8,
    },
    intelData: {
        ...typography.body,
        lineHeight: 22,
    },
    compassMockup: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    compassLabel: {
        ...typography.body, // Roboto Mono
        marginTop: 12,
        fontWeight: 'bold',
    },
    checklistTitle: {
        ...typography.subheader,
        marginBottom: 12,
    },
    checklistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: 12,
        borderRadius: 4,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    checkText: {
        ...typography.body,
        marginLeft: 12,
    },
    gearDropAd: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 102, 0, 0.1)',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 8,
        padding: 16,
    },
    adContent: {
        flex: 1,
        marginLeft: 16,
    },
    adTitle: {
        ...typography.subheader,
        color: colors.primary,
        fontSize: 14,
    },
    adSubtitle: {
        ...typography.body,
        fontSize: 12,
    }
});
