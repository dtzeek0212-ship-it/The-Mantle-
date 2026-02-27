import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

export const FanLoadout = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Icon name="Box" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>THE PRO SHOP: FAN LOADOUT</Text>
            </View>

            <View style={styles.loadoutCard}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1596720058865-c72eb1aa1ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                    style={styles.imageMock}
                />
                <View style={styles.contentCol}>
                    <Text style={styles.loadoutTag}>TAILGATE SUPREME</Text>
                    <Text style={styles.loadoutTitle}>YETI TUNDRA 45</Text>
                    <Text style={styles.loadoutDesc}>The ultimate home-gate cooler. Holds 28 cans with ice. Almost indestructible.</Text>

                    <TouchableOpacity style={styles.buyBtn}>
                        <Icon name="ShoppingCart" size={14} color="#121212" />
                        <Text style={styles.buyBtnText}>REDEEM CRED</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        ...typography.subheader,
        color: colors.primary,
        fontFamily: 'Orbitron',
        fontSize: 14,
        marginLeft: 8,
    },
    loadoutCard: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    imageMock: {
        width: 100,
        height: '100%',
        backgroundColor: '#222',
    },
    contentCol: {
        flex: 1,
        padding: 12,
    },
    loadoutTag: {
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 4,
    },
    loadoutTitle: {
        fontFamily: 'Orbitron',
        fontSize: 16,
        color: '#FFF',
        marginBottom: 4,
    },
    loadoutDesc: {
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
        marginBottom: 12,
    },
    buyBtn: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 4,
    },
    buyBtnText: {
        fontFamily: 'Orbitron',
        fontSize: 12,
        color: '#121212',
        fontWeight: 'bold',
        marginLeft: 6,
    }
});
