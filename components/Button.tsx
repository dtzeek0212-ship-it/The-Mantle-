import React, { useState } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet, TouchableOpacityProps, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary';
    style?: any;
    textStyle?: any;
}

export const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', style, textStyle, onPress, ...props }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const handlePress = (e: any) => {
        if (onPress) onPress(e);
    };

    const primaryGradients = isPressed
        ? ['#CC5200', '#FF6600'] as const // Pressed state (inverted)
        : ['#FF8533', '#CC5200'] as const; // Default 3D state

    const secondaryGradients = isPressed
        ? ['#222222', '#333333'] as const
        : ['#444444', '#222222'] as const;

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            {...props}
        >
            <LinearGradient
                colors={variant === 'primary' ? primaryGradients : secondaryGradients}
                style={[
                    styles.button,
                    isPressed && styles.buttonPressed,
                    style,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <Text style={[styles.text, textStyle, variant === 'secondary' && { color: colors.textSecondary }]}>{title}</Text>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 4, // Tighter
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Elevated
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    buttonPressed: {
        shadowOffset: { width: 0, height: 1 }, // Pushed in
        shadowOpacity: 0.1,
        elevation: 1,
        transform: [{ translateY: 2 }], // Physically moves down
    },
    text: {
        ...typography.button,
        letterSpacing: 1, // Mechanical text spacing
    },
});
