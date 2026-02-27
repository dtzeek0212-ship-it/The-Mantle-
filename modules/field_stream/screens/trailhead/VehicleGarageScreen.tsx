import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../../../theme/colors';
import { typography } from '../../../../theme/typography';
import { Icon } from '../../../../components/Icon';

const VEHICLE_DATA = {
    make: 'Polaris',
    model: 'RZR Pro R Sport',
    year: '2024',
    type: 'UTV',
    engineHours: 42.5,
    lastService: '15 Hrs Ago',
    nextServiceAt: 50.0,
    image: 'https://images.unsplash.com/photo-1596283598774-0f2a967c7e33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
};

// Contextual Marketing Data based on Vehicle Type
const PRO_SHOP_SUGGESTIONS = [
    {
        id: 'ps1',
        name: 'Baja Designs LP4 LED Pod',
        price: '379.00 Cred',
        reason: 'Recommended for UTV Night Rides',
        image: 'https://images.unsplash.com/photo-1588607186980-0a2a16d510c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'ps2',
        name: 'WARN VRX 45-S Winch',
        price: '462.00 Cred',
        reason: 'Essential Recovery Gear for UTV',
        image: 'https://images.unsplash.com/photo-1621689363025-0d2acb6ab1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
];

export const VehicleGarageScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Active Vehicle Card */}
                <View style={styles.vehicleCard}>
                    <Image source={{ uri: VEHICLE_DATA.image }} style={styles.vehicleImage} />
                    <View style={styles.vehicleHeader}>
                        <View>
                            <Text style={styles.vehicleYearMake}>{VEHICLE_DATA.year} {VEHICLE_DATA.make}</Text>
                            <Text style={styles.vehicleModel}>{VEHICLE_DATA.model}</Text>
                        </View>
                        <View style={styles.typeBadge}>
                            <Text style={styles.typeText}>{VEHICLE_DATA.type}</Text>
                        </View>
                    </View>

                    <View style={styles.statsGrid}>
                        <View style={styles.statBox}>
                            <Icon name="Activity" size={16} color={colors.textSecondary} />
                            <Text style={styles.statLabel}>ENGINE HRS</Text>
                            <Text style={styles.statValue}>{VEHICLE_DATA.engineHours.toFixed(1)}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Icon name="Wrench" size={16} color={colors.textSecondary} />
                            <Text style={styles.statLabel}>LAST SVC</Text>
                            <Text style={styles.statValue}>{VEHICLE_DATA.lastService}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Icon name="Clock" size={16} color={colors.trailheadAccent} />
                            <Text style={[styles.statLabel, { color: colors.trailheadAccent }]}>NEXT SVC</Text>
                            <Text style={[styles.statValue, { color: colors.trailheadAccent }]}>{VEHICLE_DATA.nextServiceAt.toFixed(1)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.logServiceBtn}>
                        <Icon name="Plus" size={16} color="#121212" />
                        <Text style={styles.logServiceText}>LOG SERVICE</Text>
                    </TouchableOpacity>
                </View>

                {/* Maintenance Alerts */}
                {VEHICLE_DATA.engineHours >= (VEHICLE_DATA.nextServiceAt - 10) && (
                    <View style={styles.alertBox}>
                        <Icon name="AlertTriangle" size={20} color={colors.workshopAction} />
                        <View style={styles.alertTextContent}>
                            <Text style={styles.alertTitle}>UPCOMING MAINTENANCE</Text>
                            <Text style={styles.alertDesc}>Approaching 50 Hr Service Interval. Inspect CVT Belt and replace engine oil.</Text>
                        </View>
                    </View>
                )}

                {/* Contextual Gear Marketing (Pro Shop Bridge) */}
                <View style={styles.gearSection}>
                    <Text style={styles.sectionTitle}>RECOMMENDED UTV UPGRADES</Text>
                    <Text style={styles.sectionSubtitle}>Verified loadouts from The Pro Shop.</Text>

                    {PRO_SHOP_SUGGESTIONS.map(gear => (
                        <View key={gear.id} style={styles.gearCard}>
                            <Image source={{ uri: gear.image }} style={styles.gearImage} />
                            <View style={styles.gearContent}>
                                <Text style={styles.gearReason}>{gear.reason}</Text>
                                <Text style={styles.gearName}>{gear.name}</Text>
                                <Text style={styles.gearPrice}>{gear.price}</Text>

                                <TouchableOpacity style={styles.buyBtn}>
                                    <Icon name="ShoppingCart" size={14} color="#121212" />
                                    <Text style={styles.buyBtnText}>VIEW IN SHOP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#161513' },
    scrollContent: { padding: 16, paddingBottom: 100 },
    vehicleCard: {
        backgroundColor: '#1E1D1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2C2A26',
        overflow: 'hidden',
        marginBottom: 20,
    },
    vehicleImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#111',
    },
    vehicleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2C2A26',
    },
    vehicleYearMake: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.trailheadAccent,
        marginBottom: 4,
    },
    vehicleModel: {
        ...typography.brand,
        fontSize: 24,
        color: '#FFF',
    },
    typeBadge: {
        backgroundColor: '#111',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333',
    },
    typeText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.textSecondary,
    },
    statsGrid: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2C2A26',
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
        marginTop: 8,
        marginBottom: 4,
    },
    statValue: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    logServiceBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.trailheadAccent,
        paddingVertical: 14,
    },
    logServiceText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 8,
    },
    alertBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 87, 34, 0.1)', // Action Red/Orange
        borderWidth: 1,
        borderColor: colors.workshopAction,
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    alertTextContent: {
        flex: 1,
        marginLeft: 12,
    },
    alertTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.workshopAction,
        marginBottom: 4,
    },
    alertDesc: {
        ...typography.body,
        fontSize: 12,
        color: '#FFF',
        lineHeight: 18,
    },
    gearSection: {
        marginTop: 10,
    },
    sectionTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: 1,
    },
    sectionSubtitle: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
        marginBottom: 16,
    },
    gearCard: {
        flexDirection: 'row',
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 12,
        overflow: 'hidden',
    },
    gearImage: {
        width: 100,
        backgroundColor: '#111',
    },
    gearContent: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    gearReason: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.trailheadAccent,
        marginBottom: 4,
    },
    gearName: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 14,
        marginBottom: 4,
    },
    gearPrice: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 12,
    },
    buyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.proShopAccent,
        paddingVertical: 8,
        borderRadius: 4,
    },
    buyBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 8,
    }
});
