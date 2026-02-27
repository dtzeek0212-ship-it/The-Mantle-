import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/Icon';

const PILLARS = [
    { id: 'workshop', label: 'THE WORKSHOP', icon: 'Wrench', accent: colors.workshopAccent, mission: 'Master your home with AI diagnostics and hyper-utility loadouts.' },
    { id: 'ironworks', label: 'IRON WORKS', icon: 'Activity', accent: colors.ironWorksAccent, mission: 'Tactical programming. Break barriers, not equipment.' },
    { id: 'field', label: 'FIELD & STREAM', icon: 'Compass', accent: colors.fieldStreamAccent, mission: 'Command the outdoors with hyper-local weather and survival tech.' },
    { id: 'proshop', label: 'THE PRO SHOP', icon: 'Package', accent: colors.proShopAccent, mission: 'The premium gear vault. Logistics and secure drops.' },
    { id: 'clubhouse', label: 'THE CLUBHOUSE', icon: 'Users', accent: colors.clubhouseAccent, mission: 'Digital Garage. Prove your rank in the Brotherhood.' },
];

export const CorePillarsScreen = () => {
    const navigation = useNavigation<any>();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.stepText}>02 // THE UTILITY</Text>
                <Text style={styles.headline}>MODULAR ARCHITECTURE</Text>
                <Text style={styles.subheadline}>Select a subsystem to review its primary objective.</Text>
            </View>

            <View style={styles.gridContainer}>
                {PILLARS.map((pillar, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <TouchableOpacity
                            key={pillar.id}
                            style={[
                                styles.pillarCard,
                                isActive && { borderColor: pillar.accent, backgroundColor: `${pillar.accent}15` } // 15% opacity tint
                            ]}
                            onPress={() => setActiveIndex(isActive ? null : index)}
                        >
                            <Icon
                                name={pillar.icon as any}
                                size={28}
                                color={isActive ? pillar.accent : colors.textSecondary}
                            />
                            <Text style={[styles.pillarLabel, isActive && { color: '#FFF' }]}>
                                {pillar.label}
                            </Text>

                            {isActive && (
                                <View style={styles.missionBox}>
                                    <Text style={[styles.missionText, { color: pillar.accent }]}>
                                        {pillar.mission}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.actionFooter}>
                <TouchableOpacity
                    style={[styles.nextBtn, activeIndex === null && styles.nextBtnDisabled]}
                    onPress={() => activeIndex !== null && navigation.navigate('CredBriefing')}
                    disabled={activeIndex === null}
                >
                    <Text style={styles.nextText}>ACKNOWLEDGE SYSTEMS</Text>
                    <Icon name="ArrowRight" size={20} color="#121212" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingTop: 80,
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    stepText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.primary,
        letterSpacing: 2,
        marginBottom: 12,
    },
    headline: {
        ...typography.header,
        color: '#FFF',
        fontSize: 28,
        marginBottom: 8,
    },
    subheadline: {
        ...typography.body,
        color: colors.textSecondary,
        fontSize: 14,
    },
    gridContainer: {
        paddingHorizontal: 24,
        flex: 1,
    },
    pillarCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    pillarLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: colors.textSecondary,
        marginLeft: 16,
        fontSize: 16,
        flex: 1,
    },
    missionBox: {
        width: '100%',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    missionText: {
        ...typography.body,
        fontSize: 14,
        lineHeight: 22,
    },
    actionFooter: {
        padding: 24,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
    },
    nextBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 4,
    },
    nextBtnDisabled: {
        backgroundColor: '#333',
    },
    nextText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
        marginRight: 12,
        letterSpacing: 1,
    }
});
