import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { useAppContext } from '../../../store/AppContext';

export const CheckoutScreen = () => {
    const navigation = useNavigation<any>();
    const { credBalance, setCredBalance } = useAppContext();

    // Mock Data
    const itemTotal = 134.99;
    const isLegend = true; // Simulating Legend rank for Brotherhood Discount
    const brotherhoodDiscount = isLegend ? itemTotal * 0.05 : 0;

    const [useCred, setUseCred] = useState(false);
    const credDiscount = useCred ? credBalance / 100 : 0; // 100 Cred = $1

    const shipping = 5.99;

    const finalTotal = itemTotal - brotherhoodDiscount - credDiscount + shipping;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="ArrowLeft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>SECURE CHECKOUT</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Cart Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>MANIFEST</Text>
                    <View style={styles.manifestCard}>
                        <View style={styles.manifestItem}>
                            <Text style={styles.itemName}>1x Tactical Backpack 40L</Text>
                            <Text style={styles.itemPrice}>$89.99</Text>
                        </View>
                        <View style={styles.manifestItem}>
                            <Text style={styles.itemName}>1x The Matte Black Tactical Spatula</Text>
                            <Text style={styles.itemPrice}>$45.00</Text>
                        </View>
                    </View>
                </View>

                {/* Logistics */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>LOGISTICS</Text>
                    <View style={styles.logisticsCard}>
                        <View style={styles.addressRow}>
                            <Icon name="MapPin" size={20} color={colors.textSecondary} />
                            <View style={styles.addressText}>
                                <Text style={styles.userName}>JOHN DOE</Text>
                                <Text style={styles.userAddress}>123 Alpha Base Rd, Sector 7</Text>
                            </View>
                            <Text style={styles.editLink}>EDIT</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Methods */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>PAYMENT ROUTING</Text>

                    {/* Credit Card Mock */}
                    <View style={styles.paymentCard}>
                        <Icon name="CreditCard" size={24} color={colors.textPrimary} />
                        <Text style={styles.cardInfo}>END IN 4242</Text>
                        <Icon name="CheckCircle" size={20} color="#4CAF50" />
                    </View>

                    {/* Digital Wallet Toggle */}
                    <View style={styles.credCard}>
                        <View style={styles.credInfo}>
                            <View style={styles.credBalanceRow}>
                                <Icon name="Zap" size={16} color={colors.proShopAccent} />
                                <Text style={styles.credBalanceText}>{credBalance} MANTLE CRED AVAILABLE</Text>
                            </View>
                            <Text style={styles.credValue}>Applies a -${credDiscount.toFixed(2)} discount</Text>
                        </View>
                        <Switch
                            value={useCred}
                            onValueChange={setUseCred}
                            trackColor={{ false: '#3A3A3A', true: colors.proShopAccent }}
                            thumbColor={useCred ? '#FFF' : '#B0B0B0'}
                        />
                    </View>
                </View>

                {/* Final Ledger */}
                <View style={styles.ledgerSection}>
                    <View style={styles.ledgerRow}>
                        <Text style={styles.ledgerLabel}>SUBTOTAL</Text>
                        <Text style={styles.ledgerValue}>${itemTotal.toFixed(2)}</Text>
                    </View>

                    {isLegend && (
                        <View style={styles.ledgerRow}>
                            <Text style={styles.ledgerLabelDiscount}>BROTHERHOOD DISCOUNT (5%)</Text>
                            <Text style={styles.ledgerValueDiscount}>-${brotherhoodDiscount.toFixed(2)}</Text>
                        </View>
                    )}

                    {useCred && (
                        <View style={styles.ledgerRow}>
                            <Text style={styles.ledgerLabelDiscount}>DIGITAL WALLET APPLIED</Text>
                            <Text style={styles.ledgerValueDiscount}>-${credDiscount.toFixed(2)}</Text>
                        </View>
                    )}

                    <View style={styles.ledgerRow}>
                        <Text style={styles.ledgerLabel}>FREIGHT</Text>
                        <Text style={styles.ledgerValue}>${shipping.toFixed(2)}</Text>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>TOTAL</Text>
                        <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.actionFooter}>
                <TouchableOpacity style={styles.confirmBtn} onPress={() => {
                    if (useCred) {
                        setCredBalance(0);
                    }
                    navigation.navigate('OrderTracking');
                }}>
                    <Icon name="Lock" size={16} color="#121212" />
                    <Text style={styles.confirmBtnText}>AUTHORIZE PAYMENT</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#1A1A1A',
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
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        letterSpacing: 2,
        marginBottom: 12,
    },
    manifestCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
    },
    manifestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    itemName: {
        ...typography.body,
        color: '#FFF',
        flex: 1,
        marginRight: 16,
    },
    itemPrice: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
    },
    logisticsCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressText: {
        flex: 1,
        marginLeft: 12,
    },
    userName: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
    },
    userAddress: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
    editLink: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.proShopAccent,
        fontWeight: 'bold',
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 12,
    },
    cardInfo: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
        flex: 1,
        marginLeft: 12,
    },
    credCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 87, 34, 0.05)', // Tinted Safety Orange
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.proShopAccent,
        padding: 16,
    },
    credInfo: {
        flex: 1,
    },
    credBalanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    credBalanceText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 8,
    },
    credValue: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.proShopAccent,
        marginTop: 4,
    },
    ledgerSection: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 16,
    },
    ledgerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    ledgerLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.textSecondary,
    },
    ledgerValue: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
    },
    ledgerLabelDiscount: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.proShopAccent,
    },
    ledgerValueDiscount: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.proShopAccent,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    totalLabel: {
        ...typography.header,
        color: '#FFF',
    },
    totalValue: {
        ...typography.header,
        fontFamily: 'Roboto Mono',
        color: '#FFF',
        fontSize: 24,
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
    confirmBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.proShopAccent,
        paddingVertical: 16,
        borderRadius: 4,
    },
    confirmBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 8,
        letterSpacing: 1,
    }
});
