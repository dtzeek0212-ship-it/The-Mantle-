import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

interface Point {
    id: string;
    x: number;
    y: number;
}

export const ARBlueprintScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [points, setPoints] = useState<Point[]>([]);

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.text}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handlePressCamera = (event: any) => {
        const { locationX, locationY } = event.nativeEvent;
        setPoints([...points, { id: Date.now().toString(), x: locationX, y: locationY }]);
    };

    const clearPoints = () => {
        setPoints([]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={1} style={styles.cameraContainer} onPress={handlePressCamera}>
                <CameraView style={styles.camera} facing="back">
                    {points.map((p, index) => (
                        <View key={p.id} style={[styles.point, { left: p.x - 10, top: p.y - 10 }]}>
                            {index > 0 && (
                                // Simple hack to show connection (A real AR App would use ViroReact math)
                                <Text style={styles.pointLabel}>{index}</Text>
                            )}
                            <View style={styles.pointDot} />
                        </View>
                    ))}
                </CameraView>
            </TouchableOpacity>

            <View style={styles.toolbar}>
                <View style={styles.toolbarLeft}>
                    <Icon name="Crosshair" size={24} color={colors.primary} />
                    <Text style={styles.toolbarText}>Tap Screen to Drop Tape Measure</Text>
                </View>
                <TouchableOpacity onPress={clearPoints}>
                    <Icon name="Trash2" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    cameraContainer: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderColor: colors.border,
    },
    toolbarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbarText: {
        ...typography.subheader,
        marginLeft: 12,
    },
    text: {
        ...typography.body,
        marginBottom: 16,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        ...typography.button,
    },
    point: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pointDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    pointLabel: {
        color: '#FFF',
        fontWeight: 'bold',
        position: 'absolute',
        top: -20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 4,
        borderRadius: 4,
    }
});
