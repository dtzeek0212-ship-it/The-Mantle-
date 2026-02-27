import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { Button } from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';

export const ActiveWorkoutScreen = () => {
    const navigation = useNavigation();
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [powerOutput, setPowerOutput] = useState('');
    const [rpe, setRpe] = useState('');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(sec => sec + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs > 0 ? hrs + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleComplete = () => {
        setIsActive(false);
        // In a real app, this calculates specificity and saves to DB
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <Text style={styles.timerData}>{formatTime(seconds)}</Text>

                <TouchableOpacity
                    style={[styles.playBtn, isActive && styles.pauseBtn]}
                    onPress={() => setIsActive(!isActive)}
                >
                    <Icon name={isActive ? "Pause" : "Play"} size={32} color={isActive ? colors.textPrimary : '#000'} />
                </TouchableOpacity>
            </View>

            <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>Dynamic Tracking</Text>

                <View style={styles.inputRow}>
                    <Icon name="Zap" size={20} color={colors.textSecondary} />
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Est. Power Output (Watts)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 450"
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="numeric"
                            value={powerOutput}
                            onChangeText={setPowerOutput}
                        />
                    </View>
                </View>

                <View style={styles.inputRow}>
                    <Icon name="Activity" size={20} color={colors.ironWorksAccent} />
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Rate of Perceived Exertion (1-10)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 8.5"
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="numeric"
                            value={rpe}
                            onChangeText={setRpe}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Button title="COMPLETE WORKOUT" onPress={handleComplete} style={{ backgroundColor: colors.ironWorksAccent }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: '#111',
    },
    timerData: {
        fontFamily: 'Roboto Mono',
        fontSize: 84,
        fontWeight: 'bold',
        color: colors.ironWorksAccent, // High-Intensity Red
        marginBottom: 32,
    },
    playBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.ironWorksAccent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pauseBtn: {
        backgroundColor: colors.surface,
        borderWidth: 2,
        borderColor: colors.border,
    },
    inputSection: {
        padding: 24,
        flex: 1,
    },
    sectionTitle: {
        ...typography.subheader,
        marginBottom: 24,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 24,
        alignItems: 'center',
    },
    inputGroup: {
        flex: 1,
        marginLeft: 16,
    },
    label: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    input: {
        ...typography.body, // Roboto Mono for numbers
        fontSize: 20,
        color: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 8,
    },
    footer: {
        padding: 24,
        paddingBottom: 40,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    }
});
