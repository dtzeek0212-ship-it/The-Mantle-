import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

const TRADESMEN = [
    {
        id: '1',
        name: 'Apex Plumbing & Pipe',
        trade: 'Master Plumber',
        distance: '2.4 mi',
        rating: 4.9,
        mantleCertified: true,
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '2',
        name: 'Volt-Core Electrical',
        trade: 'Licensed Electrician',
        distance: '4.1 mi',
        rating: 4.8,
        mantleCertified: true,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '3',
        name: 'Standard HVAC Repair',
        trade: 'HVAC Tech',
        distance: '5.5 mi',
        rating: 4.5,
        mantleCertified: false,
        image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
];

export const ProConnectScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="ArrowLeft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PRO-CONNECT DIRECTORY</Text>
            </View>

            <View style={styles.geofenceBanner}>
                <Icon name="MapPin" size={16} color="#121212" />
                <Text style={styles.geofenceText}>GEOFENCE ACTIVE: 10 MILE RADIUS</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {TRADESMEN.map((pro) => (
                    <View key={pro.id} style={styles.proCard}>
                        {pro.mantleCertified && (
                            <View style={styles.certifiedBadge}>
                                <Icon name="Shield" size={12} color="#121212" />
                                <Text style={styles.certifiedText}>MANTLE CERTIFIED PRO</Text>
                            </View>
                        )}

                        <View style={styles.proHeader}>
                            <Image source={{ uri: pro.image }} style={styles.proImage} />
                            <View style={styles.proInfo}>
                                <Text style={styles.proName}>{pro.name}</Text>
                                <Text style={styles.proTrade}>{pro.trade}</Text>
                                <View style={styles.proMeta}>
                                    <Icon name="Star" size={14} color={colors.workshopAccent} />
                                    <Text style={styles.metaText}>{pro.rating}</Text>
                                    <Text style={styles.metaDot}>•</Text>
                                    <Text style={styles.metaText}>{pro.distance}</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.quoteBtn}>
                            <Icon name="Camera" size={18} color="#FFF" />
                            <Text style={styles.quoteBtnText}>SEND PROJECT PHOTOS FOR QUOTE</Text>
                        </TouchableOpacity>
                    </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: colors.surface,
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
    geofenceBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.workshopAccent,
        paddingVertical: 8,
    },
    geofenceText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 8,
        letterSpacing: 1,
    },
    scrollContent: {
        padding: 20,
    },
    proCard: {
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 20,
        overflow: 'hidden',
    },
    certifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.workshopAccent,
        paddingVertical: 6,
    },
    certifiedText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: '#121212',
        marginLeft: 6,
        letterSpacing: 1,
    },
    proHeader: {
        flexDirection: 'row',
        padding: 16,
    },
    proImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
    proInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    proName: {
        ...typography.subheader,
        color: '#FFF',
    },
    proTrade: {
        ...typography.body,
        color: colors.textSecondary,
        marginTop: 2,
    },
    proMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    metaText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: colors.textPrimary,
        marginLeft: 4,
    },
    metaDot: {
        color: colors.textSecondary,
        marginHorizontal: 8,
    },
    quoteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.workshopAction, // Safety Orange
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    quoteBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFF',
        marginLeft: 12,
    }
});
