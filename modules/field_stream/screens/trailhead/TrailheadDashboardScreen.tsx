import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../../../theme/colors';
import { typography } from '../../../../theme/typography';
import { Icon } from '../../../../components/Icon';

import { TrailMapScreen } from './TrailMapScreen';
import { VehicleGarageScreen } from './VehicleGarageScreen';
import { StagingAreaScreen } from './StagingAreaScreen';
import { HaulerChecklistScreen } from './HaulerChecklistScreen';

export const TrailheadDashboardScreen = ({ navigation }: any) => {
    const [activeTab, setActiveTab] = useState<'MAP' | 'GARAGE' | 'STAGING' | 'HAULER'>('MAP');

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="ArrowLeft" size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.titleRow}>
                    <Icon name="Compass" size={20} color={colors.trailheadAccent} />
                    <Text style={styles.headerTitle}>THE TRAILHEAD</Text>
                </View>
            </View>

            {/* Top Navigation Ribbon */}
            <View style={styles.navRibbon}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navContent}>
                    <TouchableOpacity
                        style={[styles.navItem, activeTab === 'MAP' && styles.navItemActive]}
                        onPress={() => setActiveTab('MAP')}
                    >
                        <Text style={[styles.navText, activeTab === 'MAP' && styles.navTextActive]}>TRAIL MAP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navItem, activeTab === 'GARAGE' && styles.navItemActive]}
                        onPress={() => setActiveTab('GARAGE')}
                    >
                        <Text style={[styles.navText, activeTab === 'GARAGE' && styles.navTextActive]}>GARAGE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navItem, activeTab === 'STAGING' && styles.navItemActive]}
                        onPress={() => setActiveTab('STAGING')}
                    >
                        <Text style={[styles.navText, activeTab === 'STAGING' && styles.navTextActive]}>STAGING AREA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navItem, activeTab === 'HAULER' && styles.navItemActive]}
                        onPress={() => setActiveTab('HAULER')}
                    >
                        <Text style={[styles.navText, activeTab === 'HAULER' && styles.navTextActive]}>HAULER CHECKLIST</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Content Area */}
            <View style={styles.contentArea}>
                {activeTab === 'MAP' && <TrailMapScreen />}
                {activeTab === 'GARAGE' && <VehicleGarageScreen />}
                {activeTab === 'STAGING' && <StagingAreaScreen />}
                {activeTab === 'HAULER' && <HaulerChecklistScreen />}
            </View>
        </View>
    );
};

// ... need to import ScrollView at the top
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161513', // Muddy dark base
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#1E1D1A', // Slightly lighter muddy texture
        borderBottomWidth: 1,
        borderBottomColor: '#2C2A26',
    },
    backBtn: {
        marginRight: 16,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        ...typography.brand,
        fontSize: 24,
        color: '#FFF',
        marginLeft: 10,
        letterSpacing: 2,
    },
    navRibbon: {
        backgroundColor: '#11100F',
        borderBottomWidth: 1,
        borderBottomColor: '#2C2A26',
    },
    navContent: {
        paddingHorizontal: 16,
    },
    navItem: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    navItemActive: {
        borderBottomColor: colors.trailheadAccent,
    },
    navText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.textSecondary,
        letterSpacing: 1,
    },
    navTextActive: {
        color: colors.trailheadAccent,
    },
    contentArea: {
        flex: 1,
    }
});
