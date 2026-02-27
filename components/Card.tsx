import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors } from '../theme/colors';

interface CardProps extends ViewProps {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
    return (
        <View style={[styles.card, style]} {...props}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#333333', // Slate Background
        borderRadius: 4, // Tighter corners
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#222222', // Dark border around
        borderLeftWidth: 4, // Thick left border
        borderLeftColor: colors.primary, // Safety Orange
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
});
