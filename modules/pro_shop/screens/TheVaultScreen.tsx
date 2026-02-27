import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

export const TheVaultScreen = () => {
    const navigation = useNavigation<any>();

    // Mock Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState(3600 * 4 + 1500); // 4h 25m

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="ArrowLeft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>THE VAULT</Text>
            </View>

            <View style={styles.timerBanner}>
                <Text style={styles.timerLabel}>NEXT SECURE DROP IN:</Text>
                <Text style={styles.timerValue}>{formatTime(timeLeft)}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.dropCard}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }} // Dark moody lifestyle
                        style={styles.dropImage}
                    />
                    <View style={styles.dropMeta}>
                        <View style={styles.dropHeader}>
                            <Text style={styles.dropTitle}>The Matte Black Tactical Spatula</Text>
                            <Text style={styles.dropPrice}>$45.00</Text>
                        </View>
                        <Text style={styles.dropDesc}>Cerakote-finished 1095 steel. Heat resistant to 800°F. For the serious pitmaster.</Text>

                        <View style={styles.reviewBadge}>
                            <Icon name="CheckCircle" size={12} color="#4CAF50" />
                            <Text style={styles.reviewText}>FIELD TESTED // VERIFIED REVIEWS ONLY</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>LOCK IN PRE-ORDER</Text>
                    </TouchableOpacity>
                </View>

                {/* Second Item */}
                <View style={styles.dropCard}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }} // Canteen/Flask 
                        style={styles.dropImage}
                    />
                    <View style={styles.dropMeta}>
                        <View style={styles.dropHeader}>
                            <Text style={styles.dropTitle}>Mantle Sub-Zero Flask (1L)</Text>
                            <Text style={styles.dropPrice}>$60.00</Text>
                        </View>
                        <Text style={styles.dropDesc}>Double-wall vacuum insulation. Knurled grip cap.</Text>

                        <View style={styles.reviewBadge}>
                            <Icon name="CheckCircle" size={12} color="#4CAF50" />
                            <Text style={styles.reviewText}>FIELD TESTED // 4.9 AVERAGE</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.actionBtnSecondary}>
                        <Text style={styles.actionBtnTextSecondary}>IN STOCK // BUY NOW</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
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
    timerBanner: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        paddingVertical: 24,
        borderBottomWidth: 2,
        borderBottomColor: colors.proShopAccent,
    },
    timerLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.proShopAccent,
        letterSpacing: 2,
        marginBottom: 8,
    },
    timerValue: {
        ...typography.header,
        fontFamily: 'Roboto Mono',
        fontSize: 48,
        color: '#FFF',
        textShadowColor: colors.proShopAccent,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15, // High visibility glow
    },
    scrollContent: {
        padding: 20,
    },
    dropCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 24,
        overflow: 'hidden',
    },
    dropImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#000',
    },
    dropMeta: {
        padding: 16,
    },
    dropHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    dropTitle: {
        ...typography.subheader,
        color: '#FFF',
        flex: 1,
        marginRight: 16,
    },
    dropPrice: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: colors.proShopAccent,
        fontSize: 18,
    },
    dropDesc: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 16,
    },
    reviewBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    reviewText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: '#4CAF50',
        marginLeft: 6,
        letterSpacing: 1,
    },
    actionBtn: {
        backgroundColor: colors.textSecondary, // Disabled look for pre-order
        paddingVertical: 16,
        alignItems: 'center',
    },
    actionBtnSecondary: {
        backgroundColor: colors.proShopAccent,
        paddingVertical: 16,
        alignItems: 'center',
    },
    actionBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
    },
    actionBtnTextSecondary: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
    }
});
