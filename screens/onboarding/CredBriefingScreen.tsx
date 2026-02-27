import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/Icon';

export const CredBriefingScreen = () => {
    const navigation = useNavigation<any>();
    const [credBalance, setCredBalance] = useState(0);
    const targetCred = 100;

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            current += 2;
            if (current >= targetCred) {
                setCredBalance(targetCred);
                clearInterval(interval);
            } else {
                setCredBalance(current);
            }
        }, 30); // Fast ticking animation

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.stepText}>03 // THE ECONOMY</Text>
                <Text style={styles.headline}>EARN YOUR KEEP</Text>
            </View>

            <View style={styles.content}>

                <View style={styles.tallyContainer}>
                    <Icon name="Zap" size={48} color={colors.proShopAccent} />
                    <Text style={styles.tallyValue}>{credBalance.toString().padStart(3, '0')}</Text>
                    <Text style={styles.tallyLabel}>MANTLE CRED MINED</Text>
                </View>

                <View style={styles.briefingBox}>
                    <Icon name="Info" size={24} color={colors.primary} />
                    <Text style={styles.briefingText}>
                        Log your builds, share your wins in The Clubhouse, and crush your goals to earn Cred. Use it to unlock premium gear in The Pro Shop.
                    </Text>
                </View>

            </View>

            <View style={styles.actionFooter}>
                <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={() => navigation.navigate('TheSync')}
                >
                    <Text style={styles.nextText}>UNDERSTOOD</Text>
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
        paddingTop: 80,
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    stepText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.primary,
        letterSpacing: 2,
        marginBottom: 12,
    },
    headline: {
        ...typography.header,
        color: '#FFF',
        fontSize: 28,
        marginBottom: 8,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    tallyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 64,
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.border,
        marginBottom: 40,
        shadowColor: colors.proShopAccent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20, // Glowing effect
    },
    tallyValue: {
        ...typography.header,
        fontFamily: 'Roboto Mono',
        fontSize: 72,
        color: '#FFF',
        marginTop: 16,
    },
    tallyLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.proShopAccent,
        letterSpacing: 2,
        marginTop: 8,
    },
    briefingBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        padding: 20,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
    },
    briefingText: {
        ...typography.body,
        color: '#FFF',
        fontSize: 16,
        lineHeight: 24,
        flex: 1,
        marginLeft: 16,
    },
    actionFooter: {
        padding: 24,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
    },
    nextBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 4,
    },
    nextText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
        marginRight: 12,
        letterSpacing: 1,
    }
});
