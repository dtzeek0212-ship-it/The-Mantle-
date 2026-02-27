import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/Icon';

import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { TheVaultScreen } from './screens/TheVaultScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrderTrackingScreen } from './screens/OrderTrackingScreen';
import { useAppContext } from '../../store/AppContext';

const Stack = createNativeStackNavigator();

const ProShopDashboard = () => {
    const navigation = useNavigation<any>();
    const { credBalance } = useAppContext();

    const CONTEXT_HUBS = [
        { id: '1', title: 'WORKSHOP TOOLKITS', desc: 'Pre-Packaged Project Loadouts', icon: 'Wrench', route: 'ProductDetail', param: 'workshop' },
        { id: '2', title: 'IRON WORKS REFUEL', desc: 'Protein & Caffeinated Supplements', icon: 'Activity', route: 'ProductDetail', param: 'ironworks' },
        { id: '3', title: 'FIELD & STREAM PROVISIONING', desc: 'Heavy-Duty Coolers & Survival Gear', icon: 'Compass', route: 'ProductDetail', param: 'field' },
    ];

    return (
        <View style={styles.container}>
            {/* The Digital Wallet Header */}
            <View style={styles.walletHeader}>
                <View style={styles.walletInfo}>
                    <Text style={styles.walletLabel}>DIGITAL LEDGER // CRED BALANCE</Text>
                    <View style={styles.balanceRow}>
                        <Icon name="Zap" size={24} color={colors.proShopAccent} />
                        <Text style={styles.balanceText}>{credBalance}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.vaultBtn} onPress={() => navigation.navigate('TheVault')}>
                    <Icon name="Lock" size={16} color="#121212" />
                    <Text style={styles.vaultBtnText}>ENTER THE VAULT</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.promoBanner}>
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1530690013346-6aaadd243003?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }} // Muddy truck bed
                        style={styles.promoImage}
                        imageStyle={{ opacity: 0.6 }}
                    >
                        <Text style={styles.promoTitle}>THE BROTHERHOOD DISCOUNT</Text>
                        <Text style={styles.promoSub}>Legend Rank Verified: 5% OFF applied at Checkout.</Text>
                    </ImageBackground>
                </View>

                {/* Contextual Gear Hubs */}
                <Text style={styles.sectionHeader}>CONTEXTUAL FULFILLMENT CENTER</Text>

                {CONTEXT_HUBS.map((hub) => (
                    <TouchableOpacity
                        key={hub.id}
                        style={styles.hubCard}
                        onPress={() => navigation.navigate(hub.route, { context: hub.param })}
                    >
                        <View style={styles.hubIconWrap}>
                            <Icon name={hub.icon as any} size={24} color={colors.textPrimary} />
                        </View>
                        <View style={styles.hubTextWrap}>
                            <Text style={styles.hubTitle}>{hub.title}</Text>
                            <Text style={styles.hubDesc}>{hub.desc}</Text>
                        </View>
                        <Icon name="ChevronRight" size={24} color={colors.proShopAccent} />
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </View>
    );
};

export const ProShopStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.proShopBackground },
            }}
        >
            <Stack.Screen name="ProShopDashboard" component={ProShopDashboard} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="TheVault" component={TheVaultScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.proShopBackground, // Carbon Fiber Black
    },
    walletHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: '#1A1A1A',
        borderBottomWidth: 2,
        borderBottomColor: colors.proShopAccent,
    },
    walletInfo: {
        flex: 1,
    },
    walletLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
        letterSpacing: 2,
    },
    balanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    balanceText: {
        ...typography.header,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
        fontSize: 28,
        marginLeft: 8,
        textShadowColor: colors.proShopAccent,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10, // Glowing effect
    },
    vaultBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.proShopAccent, // Safety Orange
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    vaultBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 8,
        fontSize: 12,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    promoBanner: {
        height: 120,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 32,
        borderWidth: 1,
        borderColor: colors.border,
    },
    promoImage: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        justifyContent: 'center',
    },
    promoTitle: {
        ...typography.header,
        fontSize: 20,
        color: colors.proShopAccent,
    },
    promoSub: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
        fontSize: 12,
        marginTop: 4,
    },
    sectionHeader: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        letterSpacing: 2,
        marginBottom: 16,
    },
    hubCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: colors.proShopAccent,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    hubIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.proShopBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    hubTextWrap: {
        flex: 1,
    },
    hubTitle: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 16,
    },
    hubDesc: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    }
});
