import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { Card } from '../../../components/Card';

const PR_DATA = [
    { title: 'Bench Press', value: '275', unit: 'lbs', date: '01/15' },
    { title: 'Back Squat', value: '365', unit: 'lbs', date: '02/10' },
    { title: 'Deadlift', value: '425', unit: 'lbs', date: '02/22' },
    { title: '1-Mile Ruck (45lb)', value: '11:45', unit: 'min', date: '02/05' },
];

export const PRTracker = () => {
    return (
        <Card style={styles.container}>
            <View style={styles.header}>
                <Icon name="Target" size={20} color={colors.ironWorksAccent} />
                <Text style={styles.title}>Personal Records</Text>
            </View>

            {PR_DATA.map((pr, index) => (
                <View key={index} style={[styles.row, index === PR_DATA.length - 1 && styles.lastRow]}>
                    <Text style={styles.prTitle}>{pr.title}</Text>
                    <View style={styles.valueGroup}>
                        <Text style={styles.prValue}>{pr.value}</Text>
                        <Text style={styles.prUnit}>{pr.unit}</Text>
                    </View>
                    <Text style={styles.prDate}>{pr.date}</Text>
                </View>
            ))}
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 16,
        borderColor: colors.ironWorksAccent,
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        ...typography.subheader,
        marginLeft: 8,
        color: '#FFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    lastRow: {
        marginBottom: 0,
    },
    prTitle: {
        ...typography.body,
        flex: 2,
        color: colors.textSecondary,
    },
    valueGroup: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        marginRight: 16,
    },
    prValue: {
        ...typography.body, // Roboto Mono
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    prUnit: {
        ...typography.body,
        fontSize: 10,
        color: colors.textSecondary,
        marginLeft: 4,
    },
    prDate: {
        ...typography.body,
        fontSize: 12,
        color: colors.ironWorksAccent,
        flex: 1,
        textAlign: 'right',
    },
});
