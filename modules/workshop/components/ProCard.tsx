import React from 'react';
import { View, Text, StyleSheet, Linking, Alert } from 'react-native';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

interface ProCardProps {
    name: string;
    trade: string;
    rating: number;
    isVerified: boolean;
    phone: string;
}

export const ProCard: React.FC<ProCardProps> = ({ name, trade, rating, isVerified, phone }) => {
    const handleCall = () => {
        // Basic phone linking
        Linking.openURL(`tel:${phone}`).catch(() => {
            Alert.alert("Unable to call", "Please check your device settings.");
        });
    };

    return (
        <Card style={styles.cardContainer}>
            <View style={styles.headerRow}>
                <View style={styles.nameRow}>
                    <Text style={styles.name}>{name}</Text>
                    {isVerified && (
                        <View style={styles.verifiedBadge}>
                            <Icon name="CheckCircle" size={16} color="#4CAF50" />
                            <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                    )}
                </View>
                <View style={styles.ratingRow}>
                    <Icon name="Star" size={16} color="#FFC107" />
                    <Text style={styles.ratingText}>{rating}</Text>
                </View>
            </View>

            <Text style={styles.trade}>{trade}</Text>

            <Button
                title="Call Now"
                onPress={handleCall}
                style={styles.callButton}
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 12,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: 1,
    },
    name: {
        ...typography.subheader,
        marginRight: 8,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    verifiedText: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    ratingText: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    trade: {
        ...typography.body,
        marginBottom: 16,
    },
    callButton: {
        // Utilizing global safety orange standard from Button component variant='primary'
    },
});
