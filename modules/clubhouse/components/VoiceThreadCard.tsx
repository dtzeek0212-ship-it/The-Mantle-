import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

interface VoiceThreadProps {
    user: string;
    avatar: string;
    duration: string;
    topic: string;
    isMute?: boolean;
}

export const VoiceThreadCard: React.FC<VoiceThreadProps> = ({ user, avatar, duration, topic }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Simulate recording state
    const handlePushToTalk = () => {
        setIsRecording(true);
        setTimeout(() => setIsRecording(false), 2000); // Mock 2s record
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <View style={styles.avatarPlaceholder} />
                    <Text style={styles.username}>{user}</Text>
                    <Text style={styles.topicText}> • {topic}</Text>
                </View>
                <Text style={styles.duration}>{duration}</Text>
            </View>

            <View style={styles.playerSection}>
                <TouchableOpacity
                    style={styles.playBtn}
                    onPress={() => setIsPlaying(!isPlaying)}
                >
                    <Icon name={isPlaying ? "Pause" : "Play"} size={20} color={colors.textPrimary} />
                </TouchableOpacity>

                {/* Mock Audio Waveform */}
                <View style={styles.waveformContainer}>
                    {[...Array(20)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.waveBar,
                                { height: Math.random() * 24 + 4 },
                                isPlaying && i < 8 && { backgroundColor: colors.clubhouseAccent }
                            ]}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.actionFooter}>
                <TouchableOpacity
                    onPressIn={() => setIsRecording(true)}
                    onPressOut={() => setIsRecording(false)}
                    style={[styles.pttBtn, isRecording && styles.pttActive]}
                >
                    <Icon name="Mic" size={16} color={isRecording ? '#FFF' : colors.textPrimary} />
                    <Text style={[styles.pttText, isRecording && { color: '#FFF' }]}>
                        {isRecording ? 'RECORDING...' : 'HOLD TO RIFF'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.hypeBtn}>
                    {/* Clink / Beer Hype Icon Replacement */}
                    <Icon name="Coffee" size={16} color={colors.clubhouseAccent} />
                    <Text style={styles.hypeText}>12 Clinks</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.border,
        marginRight: 8,
    },
    username: {
        ...typography.body,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    topicText: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
    },
    duration: {
        ...typography.body, // Roboto Mono
        fontSize: 12,
        color: colors.clubhouseAccent,
    },
    playerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    playBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    waveformContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 16,
        height: 30,
    },
    waveBar: {
        width: 3,
        backgroundColor: colors.border,
        borderRadius: 2,
    },
    actionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 16,
    },
    pttBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },
    pttActive: {
        backgroundColor: 'red', // Alert Red for recording state
        borderColor: 'red',
    },
    pttText: {
        ...typography.body,
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    hypeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    hypeText: {
        ...typography.body,
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.clubhouseAccent,
        marginLeft: 8,
    }
});
