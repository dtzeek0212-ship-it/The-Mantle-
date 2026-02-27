import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { DeerAntlerIcon } from '../../../components/DeerAntlerIcon';

interface TrailCamProps {
    name: string;
    ipLink: string;
}

export const TrailCamFeed: React.FC<TrailCamProps> = ({ name, ipLink }) => {
    return (
        <View style={styles.container}>
            {/* The Video Player Mockup */}
            <View style={styles.videoPlayer}>
                {/* Simulated Video Overlay Background */}
                <View style={styles.videoBackground}>
                    <Icon name="PlayCircle" size={48} color="rgba(255,255,255,0.3)" />
                    <Text style={styles.bufferingText}>Connecting to {ipLink}...</Text>
                </View>

                {/* Top Overlay: Name & Signal */}
                <View style={styles.topOverlayRow}>
                    <Text style={styles.camName}>{name}</Text>
                    <View style={styles.statusGroup}>
                        <Icon name="Wifi" size={14} color={colors.commandCenterAccent} />
                        <View style={{ marginLeft: 6 }}>
                            <Icon name="BatteryFull" size={14} color={colors.commandCenterAccent} />
                        </View>
                    </View>
                </View>

                {/* Bottom Overlay: REC, Timestamp, Watermark */}
                <View style={styles.bottomOverlayRow}>
                    <View style={styles.recGroup}>
                        <View style={styles.recDot} />
                        <Text style={styles.recText}>REC</Text>
                    </View>
                    <Text style={styles.timestamp}>
                        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </Text>
                    <View style={styles.watermark}>
                        <DeerAntlerIcon size={14} color="rgba(255,255,255,0.5)" />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    videoPlayer: {
        height: 220,
        backgroundColor: '#000',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.border,
        overflow: 'hidden',
        position: 'relative',
    },
    videoBackground: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111', // Darker than #000 for depth
    },
    bufferingText: {
        ...typography.body,
        color: 'rgba(255,255,255,0.3)',
        marginTop: 8,
        fontSize: 12,
    },
    topOverlayRow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.4)', // Gradient simulation
    },
    camName: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
    },
    statusGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomOverlayRow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    recGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.ironWorksAccent, // Red
        marginRight: 4,
    },
    recText: {
        ...typography.body, // Roboto Mono
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.ironWorksAccent,
    },
    timestamp: {
        ...typography.body, // Roboto Mono ensures digital clock look
        fontSize: 11,
        color: '#FFF',
    },
    watermark: {
        opacity: 0.7,
    }
});
