import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

const GENERATED_LOADOUT = [
    { id: '1', item: '3/4" Brass Ball Valve', type: 'Required Part', price: '$24.99', inLocker: false },
    { id: '2', item: 'Teflon Tape', type: 'Material', price: '$1.99', inLocker: true },
    { id: '3', item: 'Pipe Wrench (14")', type: 'Tool', price: '$34.00', inLocker: true },
    { id: '4', item: 'Wire Brush', type: 'Tool', price: '$8.50', inLocker: false },
];

export const LoadoutGeneratorScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const projectContext = route.params?.context || 'Plumbing Repair';

    const missingItems = GENERATED_LOADOUT.filter(i => !i.inLocker);
    const totalCost = missingItems.reduce((acc, curr) => acc + parseFloat(curr.price.replace('$', '')), 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="ArrowLeft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PROJECT LOADOUT</Text>
            </View>

            <View style={styles.contextBanner}>
                <Text style={styles.contextLabel}>TARGET: {projectContext.toUpperCase()}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionDesc}>System cross-referenced with your Project Locker. Procurement required for missing assets.</Text>

                {GENERATED_LOADOUT.map((item) => (
                    <View key={item.id} style={[styles.itemCard, !item.inLocker && styles.itemCardMissing]}>
                        <View style={styles.itemHeader}>
                            <Icon
                                name={item.inLocker ? 'CheckCircle' : 'AlertCircle'}
                                size={20}
                                color={item.inLocker ? '#4CAF50' : colors.workshopAction}
                            />
                            <Text style={[styles.itemTitle, !item.inLocker && { color: colors.workshopAction }]}>
                                {item.item}
                            </Text>
                        </View>

                        <View style={styles.itemMeta}>
                            <Text style={styles.metaType}>{item.type}</Text>
                            {!item.inLocker && <Text style={styles.metaPrice}>{item.price}</Text>}
                        </View>

                        {item.inLocker ? (
                            <Text style={styles.statusText}>VERIFIED IN LOCKER</Text>
                        ) : (
                            <TouchableOpacity style={styles.buyBtn} onPress={() => navigation.navigate('ProShop')}>
                                <Icon name="ShoppingCart" size={14} color="#121212" />
                                <Text style={styles.buyBtnText}>SHIP VIA PRO-SHOP</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}

            </ScrollView>

            <View style={styles.checkoutFooter}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>TOTAL PROCUREMENT:</Text>
                    <Text style={styles.totalValue}>${totalCost.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('ProShop')}>
                    <Text style={styles.checkoutText}>PROCEED TO PRO-SHOP</Text>
                    <Icon name="ArrowRight" size={20} color="#121212" />
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
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
    contextBanner: {
        backgroundColor: colors.surface,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: colors.workshopAccent,
    },
    contextLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.workshopAccent,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, // Space for checkout footer
    },
    sectionDesc: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 20,
        lineHeight: 18,
    },
    itemCard: {
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 12,
    },
    itemCardMissing: {
        borderColor: colors.workshopAction,
        backgroundColor: 'rgba(255, 87, 34, 0.05)',
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 16,
        marginLeft: 12,
        flex: 1,
    },
    itemMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 32,
        marginBottom: 16,
    },
    metaType: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
    },
    metaPrice: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
    },
    statusText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginLeft: 32,
    },
    buyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.workshopAccent,
        paddingVertical: 10,
        borderRadius: 4,
        marginLeft: 32,
    },
    buyBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 8,
        letterSpacing: 1,
    },
    checkoutFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.surface,
        borderTopWidth: 2,
        borderTopColor: colors.workshopAccent,
        padding: 24,
        paddingBottom: 40,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    totalLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.textSecondary,
        letterSpacing: 1,
    },
    totalValue: {
        ...typography.header,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
        fontSize: 24,
    },
    checkoutBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.workshopAction, // Safety Orange
        padding: 16,
        borderRadius: 8,
    },
    checkoutText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 16,
        letterSpacing: 1,
    }
});
