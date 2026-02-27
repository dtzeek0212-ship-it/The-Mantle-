import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

export const OrderTrackingScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ProShopDashboard')} style={styles.backBtn}>
                    <Icon name="X" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MISSION STATUS</Text>
            </View>

            {/* Mock Map View */}
            <View style={styles.mapContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }} // Satellite map 
                    style={styles.mapImg}
                />
                <View style={styles.mapOverlay} />
                <View style={styles.radarPulse}>
                    <View style={styles.radarCore} />
                </View>
                <View style={styles.targetMarker}>
                    <Icon name="MapPin" size={24} color={colors.proShopAccent} />
                </View>

                {/* Route Line Mock */}
                <View style={styles.routeLine} />
            </View>

            <View style={styles.statusPanel}>
                <View style={styles.etaHeader}>
                    <Text style={styles.etaLabel}>ESTIMATED EXTRACTION (DELIVERY)</Text>
                    <Text style={styles.etaValue}>14:30 HOURS // TODAY</Text>
                </View>

                <View style={styles.progressTrack}>
                    <View style={[styles.progressNode, styles.nodeActive]}>
                        <Icon name="Box" size={16} color="#121212" />
                    </View>
                    <View style={[styles.progressLine, styles.lineActive]} />
                    <View style={[styles.progressNode, styles.nodeActive]}>
                        <Icon name="Truck" size={16} color="#121212" />
                    </View>
                    <View style={styles.progressLine} />
                    <View style={styles.progressNode}>
                        <Icon name="Home" size={16} color={colors.textSecondary} />
                    </View>
                </View>

                <View style={styles.progressLabels}>
                    <Text style={styles.pLabelActive}>DISPATCHED</Text>
                    <Text style={styles.pLabelActive}>IN TRANSIT</Text>
                    <Text style={styles.pLabel}>SECURED</Text>
                </View>

                <TouchableOpacity style={styles.supportBtn}>
                    <Icon name="Radio" size={18} color="#FFF" />
                    <Text style={styles.supportText}>CONTACT LOGISTICS (SUPPORT)</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.proShopBackground,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#1A1A1A',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        zIndex: 10,
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
    mapContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#111',
    },
    mapImg: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(13, 13, 13, 0.4)', // Dark tracking overlay
    },
    radarPulse: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 87, 34, 0.2)', // Orange pulse
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.proShopAccent,
    },
    radarCore: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.proShopAccent,
    },
    targetMarker: {
        position: 'absolute',
        top: '60%',
        left: '60%',
    },
    routeLine: {
        position: 'absolute',
        top: '43%',
        left: '43%',
        width: '18%',
        height: '18%',
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderColor: colors.proShopAccent,
        borderStyle: 'dashed',
    },
    statusPanel: {
        backgroundColor: '#1A1A1A',
        borderTopWidth: 2,
        borderTopColor: colors.proShopAccent,
        padding: 24,
        paddingBottom: 40,
    },
    etaHeader: {
        marginBottom: 32,
    },
    etaLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
        letterSpacing: 2,
        marginBottom: 4,
    },
    etaValue: {
        ...typography.header,
        fontFamily: 'Roboto Mono',
        fontSize: 20,
        color: '#FFF',
    },
    progressTrack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    progressNode: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2A2A2A',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.textSecondary,
        zIndex: 2,
    },
    nodeActive: {
        backgroundColor: colors.proShopAccent,
        borderColor: colors.proShopAccent,
    },
    progressLine: {
        flex: 1,
        height: 2,
        backgroundColor: colors.textSecondary,
        marginHorizontal: -8, // tuck under nodes
        zIndex: 1,
    },
    lineActive: {
        backgroundColor: colors.proShopAccent,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 32,
    },
    pLabel: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
    },
    pLabelActive: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: '#FFF',
        fontWeight: 'bold',
    },
    supportBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 16,
        borderRadius: 4,
    },
    supportText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 12,
        letterSpacing: 1,
    }
});
