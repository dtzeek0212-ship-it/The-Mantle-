import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { typography } from '../../../theme/typography';
import { colors } from '../../../theme/colors';
import { Icon } from '../../../components/Icon';

export const TacticalMap = () => {
    const [publicLand, setPublicLand] = useState(false);
    const [windOverlay, setWindOverlay] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.dummyMap}>
                {/* Mocking a dark satellite map view */}
                <Text style={styles.mapText}>[ Dark Satellite Map Rendered Here ]</Text>

                {publicLand && (
                    <View style={styles.publicLandOverlay}>
                        <Text style={styles.overlayText}>Public Land</Text>
                    </View>
                )}

                {windOverlay && (
                    <View style={styles.windArrow}>
                        <Icon name="Wind" size={32} color="rgba(255,255,255,0.7)" />
                        <Text style={styles.windData}>NW 12 MPH</Text>
                    </View>
                )}
            </View>

            <View style={styles.controlsRow}>
                <TouchableOpacity
                    style={[styles.toggleBtn, publicLand && styles.toggleActive]}
                    onPress={() => setPublicLand(!publicLand)}
                >
                    <Icon name="Map" size={16} color={publicLand ? '#FFF' : colors.textSecondary} />
                    <Text style={[styles.toggleText, publicLand && { color: '#FFF' }]}>Public Land</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleBtn, windOverlay && styles.toggleActive]}
                    onPress={() => setWindOverlay(!windOverlay)}
                >
                    <Icon name="Wind" size={16} color={windOverlay ? '#FFF' : colors.textSecondary} />
                    <Text style={[styles.toggleText, windOverlay && { color: '#FFF' }]}>Wind Layer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    dummyMap: {
        height: 250,
        backgroundColor: '#1E2320', // Dark mossy background simulating satellite
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.fieldStreamAccent,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    mapText: {
        ...typography.body,
        color: 'rgba(255,255,255,0.3)',
    },
    publicLandOverlay: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 150,
        height: 100,
        backgroundColor: 'rgba(255, 102, 0, 0.2)', // Orange tint
        borderWidth: 2,
        borderColor: 'rgba(255, 102, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '15deg' }],
    },
    overlayText: {
        ...typography.body,
        fontWeight: 'bold',
        color: 'rgba(255, 102, 0, 0.8)',
    },
    windArrow: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        alignItems: 'center',
    },
    windData: {
        ...typography.body, // Roboto Mono
        fontSize: 10,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 4,
    },
    controlsRow: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between',
    },
    toggleBtn: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        padding: 12,
        marginHorizontal: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    toggleActive: {
        backgroundColor: colors.forestMoss,
        borderColor: colors.forestMoss,
    },
    toggleText: {
        ...typography.body,
        fontSize: 12,
        marginLeft: 8,
        color: colors.textSecondary,
    },
});
