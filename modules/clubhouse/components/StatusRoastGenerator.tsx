import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

const GENERATED_ROASTS = [
    {
        id: '1',
        module: 'Iron Works',
        icon: 'Dumbbell',
        color: colors.ironWorksAccent,
        text: 'User "E4_Mafia_Don" just skipped Leg Day for the 3rd time. Someone check his estrogen levels.'
    },
    {
        id: '2',
        module: 'The Workshop',
        icon: 'Wrench',
        color: colors.workshopAccent,
        text: '"GarageBrew" has been looking at \'How to fix a leaky faucet\' for 6 hours. Just call a plumber, man.'
    },
    {
        id: '3',
        module: 'Field & Stream',
        icon: 'Tent',
        color: colors.fieldStreamAccent,
        text: '0 Deer. 0 Fish. 3 Bags of Beef Jerky consumed. "ApexHunter_92" is officially an expensive hiker.'
    }
];

export const StatusRoastGenerator = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="Activity" size={18} color={colors.clubhouseAccent} />
                <Text style={styles.title}>Data Extraction: Live Roasts</Text>
            </View>
            <Text style={styles.subtitle}>Pulling humilating data from Mantle modules...</Text>

            {GENERATED_ROASTS.map((roast) => (
                <TouchableOpacity
                    key={roast.id}
                    style={[
                        styles.roastCard,
                        selectedId === roast.id && { borderColor: roast.color, borderWidth: 2 }
                    ]}
                    onPress={() => setSelectedId(roast.id)}
                >
                    <View style={styles.moduleTag}>
                        <Icon name={roast.icon as any} size={14} color={roast.color} />
                        <Text style={[styles.moduleName, { color: roast.color }]}>{roast.module}</Text>
                    </View>
                    <Text style={styles.roastText}>{roast.text}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                style={[styles.postBtn, !selectedId && styles.postBtnDisabled]}
                disabled={!selectedId}
            >
                <Text style={styles.postBtnText}>PUBLISH ROAST TO FRONT-LINE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.clubhouseAccent,
        marginBottom: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        ...typography.subheader,
        fontFamily: 'Courier New',
        marginLeft: 8,
        color: colors.clubhouseAccent,
    },
    subtitle: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 16,
    },
    roastCard: {
        backgroundColor: '#1A1A1A',
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: colors.clubhouseAccent,
    },
    moduleTag: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    moduleName: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 6,
        textTransform: 'uppercase',
    },
    roastText: {
        ...typography.body,
        fontFamily: 'Courier New',
        color: '#FFF',
    },
    postBtn: {
        backgroundColor: colors.clubhouseAccent,
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 8,
    },
    postBtnDisabled: {
        backgroundColor: colors.border,
        opacity: 0.5,
    },
    postBtnText: {
        ...typography.body,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        color: '#121212',
        letterSpacing: 1,
    }
});
