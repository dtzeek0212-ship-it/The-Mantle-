import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../../../theme/colors';
import { typography } from '../../../../theme/typography';
import { Icon } from '../../../../components/Icon';

const OVERLAND_CHECKLIST = [
    { id: 'c1', category: 'LOAD & SECURE', task: 'Inspect ratchet straps and tie-down points for fraying.', completed: false },
    { id: 'c2', category: 'LOAD & SECURE', task: 'Verify hitch pin and trailer electrical connection.', completed: true },
    { id: 'c3', category: 'LOAD & SECURE', task: 'Check trailer tire pressure and lug nut torque.', completed: false },
    { id: 'c4', category: 'MACHINE PREP', task: 'Add Fuel Stabilizer to reserve gas cans.', completed: false },
    { id: 'c5', category: 'MACHINE PREP', task: 'Engage parking brake and shift to Park/Gear during transit.', completed: false },
    { id: 'c6', category: 'CAMP GEAR', task: 'Load traction boards and recovery winch controller.', completed: true },
];

export const HaulerChecklistScreen = () => {
    const [checklist, setChecklist] = useState(OVERLAND_CHECKLIST);

    const toggleItem = (id: string) => {
        setChecklist(prev => prev.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const categories = Array.from(new Set(checklist.map(item => item.category)));
    const progress = (checklist.filter(i => i.completed).length / checklist.length) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>DEPARTURE READINESS</Text>
                <Text style={styles.progressValue}>{progress.toFixed(0)}%</Text>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {categories.map(category => (
                    <View key={category} style={styles.categorySection}>
                        <View style={styles.categoryHeader}>
                            <Icon name="CheckSquare" size={16} color={colors.trailheadAccent} />
                            <Text style={styles.categoryTitle}>{category}</Text>
                        </View>

                        {checklist.filter(item => item.category === category).map(item => (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.taskRow, item.completed && styles.taskRowCompleted]}
                                onPress={() => toggleItem(item.id)}
                            >
                                <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
                                    {item.completed && <Icon name="Check" size={14} color="#121212" />}
                                </View>
                                <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>{item.task}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footerAction}>
                <TouchableOpacity style={styles.clearBtn} onPress={() => setChecklist(checklist.map(i => ({ ...i, completed: false })))}>
                    <Text style={styles.clearBtnText}>RESET LIST</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#161513' },
    progressContainer: {
        padding: 20,
        backgroundColor: '#1E1D1A',
        borderBottomWidth: 1,
        borderBottomColor: '#2C2A26',
    },
    progressLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        letterSpacing: 1,
    },
    progressValue: {
        ...typography.brand,
        fontSize: 32,
        color: colors.trailheadAccent,
        marginTop: 4,
        marginBottom: 12,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#11100F',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.trailheadAccent,
    },
    scrollContent: { padding: 16, paddingBottom: 100 },
    categorySection: {
        marginBottom: 24,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2C2A26',
        paddingBottom: 8,
    },
    categoryTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 8,
        letterSpacing: 1,
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: '#1E1D1A',
        marginBottom: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    taskRowCompleted: {
        backgroundColor: 'rgba(255, 215, 0, 0.05)',
        borderColor: 'rgba(255, 215, 0, 0.2)',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    checkboxCompleted: {
        backgroundColor: colors.trailheadAccent,
        borderColor: colors.trailheadAccent,
    },
    taskText: {
        ...typography.body,
        color: '#E0E0E0',
        flex: 1,
        lineHeight: 22,
    },
    taskTextCompleted: {
        color: colors.textSecondary,
        textDecorationLine: 'line-through',
    },
    footerAction: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#1E1D1A',
        borderTopWidth: 1,
        borderTopColor: '#2C2A26',
    },
    clearBtn: {
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.textSecondary,
        borderRadius: 4,
    },
    clearBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: colors.textSecondary,
        letterSpacing: 1,
    }
});
