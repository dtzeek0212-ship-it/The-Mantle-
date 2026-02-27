import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../../store/AppContext';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { useNavigation } from '@react-navigation/native';

export const NativeAdBanner = () => {
    const { activeContext } = useAppContext();
    const navigation = useNavigation<any>();

    // Only render if there's a specific contextual ad logic matched
    if (activeContext !== 'plumbing') {
        return null;
    }

    const navigateToShop = () => {
        // Navigate globally to the Pro Shop tab (requires BottomTab navigator ID)
        navigation.navigate('Pro Shop');
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentRow}>
                <View style={styles.iconBox}>
                    <Icon name="Wrench" size={24} color="#FFF" />
                </View>
                <View style={styles.textCol}>
                    <Text style={styles.sponsoredText}>Sponsored Tool</Text>
                    <Text style={styles.title}>Heavy-Duty Pipe Wrench</Text>
                    <Text style={styles.price}>$24.99</Text>
                </View>
                <TouchableOpacity style={styles.buyButton} onPress={navigateToShop}>
                    <Text style={styles.buyText}>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderTopColor: colors.primary, // Orange highlight to note it's an ad
        borderTopWidth: 2,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
        marginRight: 12,
    },
    textCol: {
        flex: 1,
    },
    sponsoredText: {
        ...typography.body,
        fontSize: 10,
        color: colors.textSecondary,
        textTransform: 'uppercase',
    },
    title: {
        ...typography.subheader,
        fontSize: 14,
        color: colors.textPrimary,
    },
    price: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginTop: 2,
    },
    buyButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buyText: {
        ...typography.button,
        fontSize: 14,
    }
});
