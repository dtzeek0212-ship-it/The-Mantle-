import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Card } from '../../../components/Card';
import { Icon } from '../../../components/Icon';
import { useAppContext } from '../../../store/AppContext';

// Mock inventory data
const inventory = [
    { id: '1', name: 'Heavy-Duty Pipe Wrench', price: 24.99, image: 'Wrench' as const },
    { id: '2', name: 'Pro-Tier Tool Belt', price: 89.50, image: 'Pocket' as const },
    { id: '3', name: 'Performance Whey Protein', price: 45.00, image: 'Dumbbell' as const },
];

export const ProShopScreen = () => {
    const navigation = useNavigation<any>();
    const { credBalance } = useAppContext();

    const handleBuy = (item: any) => {
        navigation.navigate('Checkout', { item });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pro Shop</Text>
                <View style={styles.credBadge}>
                    <Icon name="Coins" size={16} color={colors.primary} />
                    <Text style={styles.credText}>{credBalance} Cred</Text>
                </View>
            </View>

            <FlatList
                data={inventory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.productCard}>
                        <View style={styles.iconBox}>
                            <Icon name={item.image} size={40} color={colors.textSecondary} />
                        </View>
                        <View style={styles.infoCol}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity style={styles.buyButton} onPress={() => handleBuy(item)}>
                            <Text style={styles.buyText}>Buy</Text>
                        </TouchableOpacity>
                    </Card>
                )}
                contentContainerStyle={styles.listContent}
            />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    headerTitle: {
        ...typography.header,
    },
    credBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 102, 0, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    credText: {
        ...typography.subheader,
        color: colors.primary,
        marginLeft: 6,
        fontSize: 14,
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    productCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        backgroundColor: colors.background,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoCol: {
        flex: 1,
    },
    title: {
        ...typography.subheader,
        fontSize: 16,
    },
    price: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginTop: 4,
    },
    buyButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buyText: {
        ...typography.button,
    }
});
