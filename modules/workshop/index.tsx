import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icon } from '../../components/Icon';

import { FixItAssistantScreen } from './screens/FixItAssistantScreen';
import { ProjectLockerScreen } from './screens/ProjectLockerScreen';
import { ProConnectScreen } from './screens/ProConnectScreen';
import { LoadoutGeneratorScreen } from './screens/LoadoutGeneratorScreen';

const Stack = createNativeStackNavigator();

const WorkshopDashboard = () => {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');

    const emergencies = [
        { id: '1', title: 'Plumbing', icon: 'Droplet', color: '#03A9F4' }, // Water Blue
        { id: '2', title: 'Electrical', icon: 'Zap', color: colors.workshopAccent }, // Industrial Yellow
        { id: '3', title: 'HVAC', icon: 'Wind', color: '#BDBDBD' }, // Duct Silver
        { id: '4', title: 'Structural', icon: 'Home', color: '#8D6E63' }, // Wood Brown
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>THE WORKSHOP</Text>
                <Text style={styles.headerSub}>Hyper-Utility Diagnostic Array</Text>
            </View>

            {/* Dynamic Search Bar */}
            <View style={styles.searchSection}>
                <Text style={styles.sectionLabel}>WHAT BROKE?</Text>
                <View style={styles.searchContainer}>
                    <Icon name="Search" size={20} color={colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="e.g. 'Sink is puking water'"
                        placeholderTextColor={colors.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.searchBtn}>
                        <Icon name="ArrowRight" size={20} color="#121212" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Emergency Grid */}
            <View style={styles.emergencySection}>
                <Text style={styles.sectionLabel}>EMERGENCY PROTOCOLS</Text>
                <View style={styles.emergencyGrid}>
                    {emergencies.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.emergencyCard, { borderTopColor: item.color }]}
                            onPress={() => navigation.navigate('FixItAssistant', { context: item.title })}
                        >
                            <Icon name={item.icon as any} size={32} color={item.color} />
                            <Text style={styles.emergencyTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Secondary Modules */}
            <View style={styles.modulesSection}>
                <Text style={styles.sectionLabel}>SYSTEMS</Text>

                <TouchableOpacity style={styles.moduleCard} onPress={() => navigation.navigate('ProjectLocker')}>
                    <View style={styles.moduleIconWrap}>
                        <Icon name="Archive" size={24} color={colors.textPrimary} />
                    </View>
                    <View style={styles.moduleTextWrap}>
                        <Text style={styles.moduleTitle}>Project Locker</Text>
                        <Text style={styles.moduleDesc}>Home Specs & Tool Inventory</Text>
                    </View>
                    <Icon name="ChevronRight" size={20} color={colors.workshopAccent} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.moduleCard} onPress={() => navigation.navigate('ProConnect')}>
                    <View style={styles.moduleIconWrap}>
                        <Icon name="Users" size={24} color={colors.textPrimary} />
                    </View>
                    <View style={styles.moduleTextWrap}>
                        <Text style={styles.moduleTitle}>Pro-Connect</Text>
                        <Text style={styles.moduleDesc}>Geofenced Mantle-Certified Tradesmen</Text>
                    </View>
                    <Icon name="ChevronRight" size={20} color={colors.workshopAccent} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.moduleCardAction} onPress={() => navigation.navigate('FixItAssistant')}>
                    <Icon name="Camera" size={20} color="#121212" />
                    <Text style={styles.moduleActionText}>INITIATE VISUAL DIAGNOSIS</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

// ... Stack definitions ...
export const WorkshopScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen name="WorkshopDashboard" component={WorkshopDashboard} />
            <Stack.Screen name="FixItAssistant" component={FixItAssistantScreen} options={{ title: 'AI Assistant' }} />
            <Stack.Screen name="ProjectLocker" component={ProjectLockerScreen} options={{ title: 'Project Locker' }} />
            <Stack.Screen name="ProConnect" component={ProConnectScreen} options={{ title: 'Pro Connect' }} />
            <Stack.Screen name="LoadoutGenerator" component={LoadoutGeneratorScreen} options={{ title: 'Loadout' }} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: colors.surface,
        borderBottomWidth: 2,
        borderBottomColor: colors.workshopAccent,
    },
    headerTitle: {
        ...typography.header,
        color: '#FFF',
    },
    headerSub: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.workshopAccent,
        marginTop: 4,
    },
    sectionLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 12,
        letterSpacing: 2,
    },
    searchSection: {
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    searchInput: {
        flex: 1,
        height: 56,
        ...typography.body,
        color: '#FFF',
        fontFamily: 'Roboto Mono',
        marginLeft: 12,
    },
    searchBtn: {
        backgroundColor: colors.workshopAccent,
        padding: 8,
        borderRadius: 4,
    },
    emergencySection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    emergencyGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    emergencyCard: {
        width: '48%',
        backgroundColor: colors.surface,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        borderTopWidth: 4,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    emergencyTitle: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 12,
    },
    modulesSection: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    moduleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    moduleIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    moduleTextWrap: {
        flex: 1,
    },
    moduleTitle: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 18,
    },
    moduleDesc: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
    moduleCardAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.workshopAccent,
        padding: 16,
        borderRadius: 8,
        marginTop: 8,
    },
    moduleActionText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 8,
    }
});
