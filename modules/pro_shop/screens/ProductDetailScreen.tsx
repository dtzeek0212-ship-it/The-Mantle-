import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

export const ProductDetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const hubContext = route.params?.context || 'general';

    // Contextual Loadout Data based on entry point
    const getLoadoutContext = () => {
        switch (hubContext) {
            case 'workshop':
                return {
                    title: 'THE WEEKEND PLUMBER LOADOUT',
                    price: '$145.00',
                    desc: 'Everything required to overhaul a standard residential fixture. Professional grade.',
                    image: 'https://images.unsplash.com/photo-1542159670-4f5195156bc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    items: ['14" Cast Iron Pipe Wrench', 'Heavy Duty Teflon Tape (3-Pack)', 'Brass Ball Valve 3/4"', 'Mantle Workshop Gloves'],
                    specs: { Weight: '4.2 lbs', Durability: 'Mil-Spec Tier 1', Warranty: 'Lifetime' }
                };
            case 'ironworks':
                return {
                    title: 'THE IRON WORKS REFUEL KIT',
                    price: '$85.00',
                    desc: 'Post-action recovery. High yield protein and dark roast caffeine.',
                    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    items: ['Mantle Whey Isolate (Vanilla)', 'Black Rifle Coffee "Silencer Smooth"', 'Steel Shaker Bottle (1L)'],
                    specs: { Yield: '30 Servings', Caffeine: 'Medium Roast', 'Macro': '25g Protein/Scoop' }
                };
            case 'field':
            default:
                return {
                    title: 'THE RUGGED OVERLANDER PACKAGE',
                    price: '$399.00',
                    desc: 'Sustainment for 72 hours in high-exposure environments. Extreme cold rated.',
                    image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    items: ['YETI Tundra 45 Hard Cooler', 'Mantle Sub-Zero Sleeping Bag', 'Tactical Fire Starter Kit'],
                    specs: { 'Cold Rating': '0°F / -18°C', 'Ice Retention': 'Up to 5 Days', Weight: '24 lbs' }
                };
        }
    };

    const loadout = getLoadoutContext();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="ArrowLeft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MISSION LOADOUT</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>

                <Image source={{ uri: loadout.image }} style={styles.heroImage} />

                <View style={styles.contentSection}>
                    <View style={styles.titleRow}>
                        <Text style={styles.loadoutTitle}>{loadout.title}</Text>
                        <Text style={styles.loadoutPrice}>{loadout.price}</Text>
                    </View>
                    <Text style={styles.loadoutDesc}>{loadout.desc}</Text>

                    {/* Consumable Logic (Mocking the 1-Tap Reorder if IronWorks) */}
                    {hubContext === 'ironworks' && (
                        <View style={styles.subscribeCard}>
                            <Icon name="RefreshCw" size={20} color={colors.proShopAccent} />
                            <Text style={styles.subscribeText}>ENABLE 30-DAY AUTO RE-SUPPLY (SAVE 10%)</Text>
                            <TouchableOpacity style={styles.subscribeToggle}>
                                <View style={styles.toggleDot} />
                            </TouchableOpacity>
                        </View>
                    )}

                    <Text style={styles.sectionHeader}>MANIFEST ITEMS</Text>
                    <View style={styles.manifestBox}>
                        {loadout.items.map((item, idx) => (
                            <View key={idx} style={styles.manifestItem}>
                                <Icon name="Check" size={16} color={colors.textSecondary} />
                                <Text style={styles.manifestName}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.sectionHeader}>TACTICAL SPECS</Text>
                    <View style={styles.specTable}>
                        {Object.entries(loadout.specs).map(([key, val], idx) => (
                            <View key={key} style={[styles.specRow, idx % 2 === 0 ? styles.specRowEven : styles.specRowOdd]}>
                                <Text style={styles.specLabel}>{key.toUpperCase()}</Text>
                                <Text style={styles.specValue}>{String(val).toUpperCase()}</Text>
                            </View>
                        ))}
                    </View>

                </View>

            </ScrollView>

            <View style={styles.actionFooter}>
                <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Checkout')}>
                    <Icon name="ShoppingCart" size={20} color="#121212" />
                    <Text style={styles.cartBtnText}>ADD LOADOUT TO CART</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.proShopBackground, // Carbon Fiber Black
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(13, 13, 13, 0.8)', // Transparent Carbon
    },
    backBtn: {
        marginRight: 16,
    },
    headerTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: 2,
    },
    heroImage: {
        width: '100%',
        height: 350,
        backgroundColor: '#111',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    contentSection: {
        padding: 24,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    loadoutTitle: {
        ...typography.header,
        color: '#FFF',
        fontSize: 24,
        flex: 1,
        marginRight: 16,
    },
    loadoutPrice: {
        ...typography.header,
        fontFamily: 'Roboto Mono',
        color: colors.proShopAccent,
        fontSize: 24,
    },
    loadoutDesc: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 24,
        lineHeight: 24,
    },
    subscribeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 87, 34, 0.1)', // Tinted orange
        borderWidth: 1,
        borderColor: colors.proShopAccent,
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
    },
    subscribeText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.proShopAccent,
        flex: 1,
        marginLeft: 12,
        marginRight: 12,
    },
    subscribeToggle: {
        width: 40,
        height: 24,
        backgroundColor: colors.proShopAccent,
        borderRadius: 12,
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    toggleDot: {
        width: 20,
        height: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignSelf: 'flex-end',
    },
    sectionHeader: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        letterSpacing: 2,
        marginBottom: 12,
    },
    manifestBox: {
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 24,
    },
    manifestItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    manifestName: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
        marginLeft: 12,
    },
    specTable: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 32,
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    specRowOdd: {
        backgroundColor: '#111',
    },
    specRowEven: {
        backgroundColor: '#1A1A1A',
    },
    specLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.textSecondary,
    },
    specValue: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
    },
    actionFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1A1A1A',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        padding: 24,
        paddingBottom: 40,
    },
    cartBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.proShopAccent,
        paddingVertical: 16,
        borderRadius: 4,
    },
    cartBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 12,
        letterSpacing: 1,
    }
});
