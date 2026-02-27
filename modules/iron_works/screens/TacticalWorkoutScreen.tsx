import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';

interface RouteParams {
    recoveryScore: number;
    isAuthorized: boolean;
}

export const TacticalWorkoutScreen = () => {
    const route = useRoute();
    const { recoveryScore, isAuthorized } = (route.params as RouteParams) || { recoveryScore: 100, isAuthorized: false };

    // Conditional Logic based on Biometrics
    const isLowRecovery = isAuthorized && recoveryScore < 30;

    const workoutTitle = isLowRecovery ? "Active Recovery & Mobility" : "Heavy Lifting: Push Day";
    const workoutType = isLowRecovery ? "Mobility/Stretch" : "Strength/Hypertrophy";
    const intensity = isLowRecovery ? "Low" : "High";

    const exercises = isLowRecovery
        ? ["90/90 Hip Stretch (2 mins)", "Thoracic Spine Rotations (10 reps)", "Couch Stretch (1 min/leg)", "Light Yoga Flow (15 mins)"]
        : ["Barbell Bench Press (5x5)", "Incline Dumbbell Press (4x8)", "Overhead Tricep Extension (3x12)", "Lateral Raises (4x15)"];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {isLowRecovery && (
                <View style={styles.warningBanner}>
                    <Icon name="AlertTriangle" size={20} color="#000" />
                    <Text style={styles.warningText}>
                        Low Recovery ({recoveryScore}%). Heavy lifting not recommended today.
                    </Text>
                </View>
            )}

            {/* Video Player Placeholder */}
            <View style={styles.videoPlaceholder}>
                <Icon name="PlayCircle" size={64} color={colors.textSecondary} />
                <Text style={styles.videoText}>Video Player Loading...</Text>
            </View>

            <View style={styles.headerSection}>
                <Text style={styles.title}>{workoutTitle}</Text>
                <View style={styles.tagsRow}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{workoutType}</Text>
                    </View>
                    <View style={[styles.tag, isLowRecovery ? styles.tagLow : styles.tagHigh]}>
                        <Text style={[styles.tagText, isLowRecovery ? styles.tagTextLow : styles.tagTextHigh]}>
                            Intensity: {intensity}
                        </Text>
                    </View>
                </View>
            </View>

            <Card style={styles.routineCard}>
                <Text style={styles.routineTitle}>Today's Routine</Text>
                {exercises.map((exercise, index) => (
                    <View key={index} style={styles.exerciseRow}>
                        <Icon name="CheckCircle" size={16} color={colors.textSecondary} />
                        <Text style={styles.exerciseText}>{exercise}</Text>
                    </View>
                ))}
            </Card>

            <Button title="Start Workout" style={styles.startButton} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    warningBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF9800',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    warningText: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 8,
        flex: 1,
    },
    videoPlaceholder: {
        height: 220,
        backgroundColor: colors.surface,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 24,
    },
    videoText: {
        ...typography.body,
        marginTop: 12,
    },
    headerSection: {
        marginBottom: 24,
    },
    title: {
        ...typography.header,
        marginBottom: 12,
    },
    tagsRow: {
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 8,
    },
    tagText: {
        ...typography.body,
        fontSize: 12,
        fontWeight: 'bold',
    },
    tagLow: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderColor: '#4CAF50',
    },
    tagTextLow: {
        color: '#4CAF50',
    },
    tagHigh: {
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        borderColor: '#F44336',
    },
    tagTextHigh: {
        color: '#F44336',
    },
    routineCard: {
        marginBottom: 24,
    },
    routineTitle: {
        ...typography.subheader,
        marginBottom: 12,
    },
    exerciseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    exerciseText: {
        ...typography.body,
        marginLeft: 12,
        color: colors.textPrimary,
    },
    startButton: {
        // Falls back to global Safety Orange primary
    },
});
