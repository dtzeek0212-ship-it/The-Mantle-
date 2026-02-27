import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/Icon';

export const TheCreedScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1517594056-b0767118ae03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }} // Dark workshop/tools
                style={styles.bgImage}
                imageStyle={{ opacity: 0.3 }}
            >
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerSpacer} />

                    <View style={styles.textContainer}>
                        <Icon name="Shield" size={48} color={colors.primary} />
                        <Text style={styles.headline}>WELCOME TO THE BROTHERHOOD</Text>

                        <View style={styles.divider} />

                        <Text style={styles.copy}>
                            The Mantle is your central command for the workshop, the woods, and the weight room.
                        </Text>
                        <Text style={styles.subCopy}>
                            Synchronizing global schema...
                        </Text>
                    </View>

                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.mechanicalSwitch} onPress={() => navigation.navigate('CorePillars')}>
                            <View style={styles.switchInner}>
                                <Text style={styles.switchText}>INITIALIZE</Text>
                                <Icon name="Power" size={20} color={colors.primary} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background, // #121212
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        flexGrow: 1,
        padding: 32,
        justifyContent: 'space-between',
    },
    headerSpacer: {
        flex: 1,
    },
    textContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
        ...typography.brand,
        fontSize: 32,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 24,
        letterSpacing: 2,
    },
    divider: {
        width: 60,
        height: 4,
        backgroundColor: colors.primary,
        marginVertical: 24,
    },
    copy: {
        ...typography.body,
        fontSize: 18,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 28,
    },
    subCopy: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.primary,
        marginTop: 32,
        opacity: 0.8,
    },
    actionContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
    },
    mechanicalSwitch: {
        width: '100%',
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        padding: 4,
        borderWidth: 2,
        borderColor: '#111',
        borderBottomWidth: 6, // 3D depth effect
    },
    switchInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 4,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    switchText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFF',
        letterSpacing: 4,
        marginRight: 12,
    }
});
