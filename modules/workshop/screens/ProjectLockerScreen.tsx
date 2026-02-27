import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

const HOME_SPECS = [
    { label: 'Air Filter Size', value: '20 x 25 x 1', icon: 'Wind' },
    { label: 'Water Heater Age', value: '6 Years (Inst. 2020)', icon: 'Droplet' },
    { label: 'Main Breaker Loc.', value: 'Garage, East Wall', icon: 'Zap' },
    { label: 'Living Rm Paint', value: 'SW 7015 Repose Gray', icon: 'Box' },
];

const TOOL_INVENTORY = [
    { name: 'Pipe Wrench (14")', owned: true },
    { name: 'Teflon Tape', owned: true },
    { name: 'Voltage Tester', owned: true },
    { name: 'PEX Crimp Tool', owned: false }, // Will trigger a Rent/Buy suggestion
    { name: 'Stud Finder', owned: true },
    { name: 'Torque Wrench', owned: false },
];

export const ProjectLockerScreen = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState<'specs' | 'tools'>('specs');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="ArrowLeft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PROJECT LOCKER</Text>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'specs' && styles.activeTab]}
                    onPress={() => setActiveTab('specs')}
                >
                    <Icon name="Home" size={16} color={activeTab === 'specs' ? '#121212' : colors.textSecondary} />
                    <Text style={[styles.tabText, activeTab === 'specs' && styles.activeTabText]}>HOME SPECS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'tools' && styles.activeTab]}
                    onPress={() => setActiveTab('tools')}
                >
                    <Icon name="PenTool" size={16} color={activeTab === 'tools' ? '#121212' : colors.textSecondary} />
                    <Text style={[styles.tabText, activeTab === 'tools' && styles.activeTabText]}>TOOL INVENTORY</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {activeTab === 'specs' && (
                    <View>
                        <View style={styles.infoHeader}>
                            <Text style={styles.infoDesc}>Critical dimensions and data for quick reference at the hardware store.</Text>
                            <TouchableOpacity style={styles.addBtn}>
                                <Icon name="Plus" size={20} color={colors.workshopAccent} />
                            </TouchableOpacity>
                        </View>

                        {HOME_SPECS.map((spec, index) => (
                            <View key={index} style={styles.specCard}>
                                <View style={styles.specIconWrap}>
                                    <Icon name={spec.icon as any} size={20} color={colors.textSecondary} />
                                </View>
                                <View style={styles.specTextWrap}>
                                    <Text style={styles.specLabel}>{spec.label}</Text>
                                    <Text style={styles.specValue}>{spec.value}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {activeTab === 'tools' && (
                    <View>
                        <Text style={styles.infoDesc}>Your logged loadout. Missing tools flag automatically during Fix-It guides.</Text>

                        {TOOL_INVENTORY.map((tool, index) => (
                            <View key={index} style={styles.toolRow}>
                                <Icon
                                    name={tool.owned ? 'CheckCircle' : 'Circle'}
                                    size={24}
                                    color={tool.owned ? '#4CAF50' : colors.textSecondary}
                                />
                                <Text style={[styles.toolName, !tool.owned && styles.toolMissing]}>
                                    {tool.name}
                                </Text>
                                {!tool.owned && (
                                    <TouchableOpacity style={styles.procureBtn}>
                                        <Text style={styles.procureText}>RENT/BUY</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                )}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backBtn: {
        marginRight: 16,
    },
    headerTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: 2,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    activeTab: {
        backgroundColor: colors.workshopAccent,
    },
    tabText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: colors.textSecondary,
        marginLeft: 8,
    },
    activeTabText: {
        color: '#121212',
    },
    scrollContent: {
        padding: 20,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoDesc: {
        ...typography.body,
        color: colors.textSecondary,
        flex: 1,
        marginRight: 16,
        marginBottom: 20,
    },
    addBtn: {
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.workshopAccent,
    },
    specCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: colors.workshopAccent,
    },
    specIconWrap: {
        width: 40,
        alignItems: 'center',
    },
    specTextWrap: {
        flex: 1,
        marginLeft: 8,
    },
    specLabel: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        textTransform: 'uppercase',
    },
    specValue: {
        ...typography.header,
        fontFamily: 'Roboto Mono',
        fontSize: 18,
        color: '#FFF',
        marginTop: 4,
    },
    toolRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    toolName: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 16,
        color: '#FFF',
        flex: 1,
        marginLeft: 16,
    },
    toolMissing: {
        color: colors.textSecondary,
        textDecorationLine: 'line-through',
    },
    procureBtn: {
        backgroundColor: colors.workshopAction, // Safety Orange
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    procureText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
    }
});
