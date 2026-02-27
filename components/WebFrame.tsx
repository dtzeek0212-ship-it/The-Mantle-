import React, { ReactNode } from 'react';
import { View, StyleSheet, useWindowDimensions, Platform, KeyboardAvoidingView } from 'react-native';

interface WebFrameProps {
    children: ReactNode;
}

export const WebFrame: React.FC<WebFrameProps> = ({ children }) => {
    const { width } = useWindowDimensions();

    // On Mobile devices or narrow browser windows, we just return the app full screen.
    // Using 768px as a standard tablet/desktop breakpoint.
    if (Platform.OS !== 'web' || width <= 768) {
        return <View style={{ flex: 1 }}>{children}</View>;
    }

    // On Desktop Web, we wrap the app inside a high-fidelity "Phone Frame"
    return (
        <View style={styles.desktopBackground}>
            {/* The Smartphone Mockup Frame */}
            <View style={styles.phoneFrame}>
                {/* Device Notch Mockup (Optional) */}
                <View style={styles.notch} />

                {/* The actual app container content */}
                <View style={styles.appContainer}>
                    {children}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    desktopBackground: {
        flex: 1,
        backgroundColor: '#121212', // Dark Charcoal Base
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    phoneFrame: {
        width: 400,
        height: 850,
        backgroundColor: '#000000',
        borderRadius: 50, // Extreme border radius mimicking a physical device
        borderWidth: 12,
        borderColor: '#333333', // Device casing color
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 24, // Android shadow fallback
        overflow: 'hidden',
        position: 'relative',
    },
    notch: {
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        width: 150,
        height: 30,
        backgroundColor: '#333333',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        zIndex: 999, // Ensure it sits above the app content visually
    },
    appContainer: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#121212', // Ensure app background cuts off cleanly at the frame border
        paddingTop: 0, // In Web context, the safe area is often 0 to the phone frame we created
    },
});
