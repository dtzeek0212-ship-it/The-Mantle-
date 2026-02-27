import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';

const features = [
    { id: '1', title: 'The Command Center', desc: 'Pro sports data, live scores, and community picks.', icon: 'Trophy' },
    { id: '2', title: 'The Field & Stream', desc: 'Tactical hunting maps, solunar data, and tracking.', icon: 'Map' },
    { id: '3', title: 'The Workshop', desc: 'AI-driven home repair diagnostics and trades directory.', icon: 'Wrench' },
    { id: '4', title: 'The Iron Works', desc: 'Biometric-synced fitness and tactical nutrition.', icon: 'Dumbbell' },
];

export const LandingScreen = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');

    const handleAccessMantle = () => {
        // Navigate into the main BottomTabNavigator app flow
        navigation.replace('MainApp');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

            {/* Hero Section */}
            <View style={styles.heroSection}>
                <View style={styles.logoContainer}>
                    <Icon name="Shield" size={64} color={colors.primary} />
                </View>
                <Text style={styles.heroHeadline}>THE MANTLE</Text>
                <Text style={styles.heroSubheadline}>Everything for the Everyday Man.</Text>
                <Button
                    title="Access The Mantle"
                    onPress={handleAccessMantle}
                    style={styles.ctaButton}
                />
            </View>

            {/* Feature Showcase */}
            <View style={styles.featuresSection}>
                {features.map((feature) => (
                    <Card key={feature.id} style={styles.featureCard}>
                        <View style={styles.featureIconBox}>
                            <Icon name={feature.icon as any} size={28} color={colors.textPrimary} />
                        </View>
                        <View style={styles.featureTextCol}>
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                            <Text style={styles.featureDesc}>{feature.desc}</Text>
                        </View>
                    </Card>
                ))}
            </View>

            {/* Email Collection Footer */}
            <View style={styles.emailSection}>
                <Text style={styles.emailHeadline}>Join the Inner Circle</Text>
                <Text style={styles.emailSubheadline}>Get early access to exclusive Pro Shop drops and tactical guides.</Text>
                <View style={styles.emailInputRow}>
                    <TextInput
                        style={styles.emailInput}
                        placeholder="Enter your email"
                        placeholderTextColor={colors.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.subscribeButton}>
                        <Icon name="ArrowRight" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background, // #121212 Dark Charcoal
    },
    content: {
        padding: 24,
        paddingTop: 60,
        paddingBottom: 60,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoContainer: {
        marginBottom: 24,
    },
    heroHeadline: {
        ...typography.header,
        fontSize: 42,
        lineHeight: 48,
        textAlign: 'center',
        color: '#F5F5F5', // Bone White
        letterSpacing: 2,
        marginBottom: 12,
    },
    heroSubheadline: {
        ...typography.subheader,
        fontSize: 18,
        textAlign: 'center',
        color: colors.textSecondary,
        marginBottom: 32,
    },
    ctaButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: colors.primary, // #FF6600 Safety Orange
        borderRadius: 8,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    ctaText: {
        fontSize: 18,
        letterSpacing: 1,
    },
    featuresSection: {
        marginBottom: 48,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 16,
        backgroundColor: '#1E1E1E', // Slate / Surface
        borderWidth: 1,
        borderColor: colors.border,
    },
    featureIconBox: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    featureTextCol: {
        flex: 1,
    },
    featureTitle: {
        ...typography.subheader,
        fontSize: 18,
        color: '#F5F5F5', // Bone White
        marginBottom: 4,
    },
    featureDesc: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    emailSection: {
        padding: 24,
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    emailHeadline: {
        ...typography.subheader,
        fontSize: 20,
        color: '#F5F5F5',
        marginBottom: 8,
    },
    emailSubheadline: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 20,
        lineHeight: 22,
    },
    emailInputRow: {
        flexDirection: 'row',
    },
    emailInput: {
        flex: 1,
        height: 50,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingHorizontal: 16,
        ...typography.body,
    },
    subscribeButton: {
        width: 50,
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginLeft: 12,
    }
});
