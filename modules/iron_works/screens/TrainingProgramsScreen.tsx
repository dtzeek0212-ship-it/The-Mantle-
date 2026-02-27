import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { useNavigation } from '@react-navigation/native';

const PROGRAMS = [
    {
        id: '1',
        title: 'Backcountry Beast',
        subtitle: 'Endurance & Pack-Out Prep',
        level: 'Advanced',
        duration: '12 Weeks',
    },
    {
        id: '2',
        title: 'Weekend Warrior',
        subtitle: 'DIY & Sports Conditioning',
        level: 'Intermediate',
        duration: '8 Weeks',
    },
    {
        id: '3',
        title: 'Dad Bod Demolisher',
        subtitle: 'General Fitness & Hypertrophy',
        level: 'All Levels',
        duration: '16 Weeks',
    }
];

export const TrainingProgramsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.headerTitle}>Tactical Protocols</Text>
                <Text style={styles.headerSubtitle}>Goal-Oriented Training</Text>

                {PROGRAMS.map((prog) => (
                    <TouchableOpacity
                        key={prog.id}
                        style={styles.programCard}
                        onPress={() => navigation.navigate('ActiveWorkout' as never)}
                    >
                        <View style={styles.cardOverlay}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.programTitle}>{prog.title}</Text>
                                <Icon name="ChevronRight" size={24} color={colors.ironWorksAccent} />
                            </View>
                            <Text style={styles.programSubtitle}>{prog.subtitle}</Text>

                            <View style={styles.metaRow}>
                                <View style={styles.metaBadge}>
                                    <Icon name="Activity" size={14} color={colors.textSecondary} />
                                    <Text style={styles.metaText}>{prog.level}</Text>
                                </View>
                                <View style={styles.metaBadge}>
                                    <Icon name="Calendar" size={14} color={colors.textSecondary} />
                                    <Text style={styles.metaText}>{prog.duration}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    headerTitle: {
        ...typography.header,
    },
    headerSubtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 24,
    },
    programCard: {
        height: 140,
        backgroundColor: colors.surface,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 16,
        justifyContent: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    programTitle: {
        ...typography.subheader,
        color: '#FFF',
    },
    programSubtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginTop: 4,
        marginBottom: 16,
    },
    metaRow: {
        flexDirection: 'row',
    },
    metaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 12,
    },
    metaText: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginLeft: 6,
    }
});
