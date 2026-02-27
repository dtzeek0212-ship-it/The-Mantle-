import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../../../theme/colors';
import { typography } from '../../../../theme/typography';
import { Icon } from '../../../../components/Icon';

const TRAIL_REPORTS = [
    {
        id: 'r1',
        user: 'DirtDevil99',
        time: '12m ago',
        location: 'Red River Gorge - South Loop',
        status: 'HAZARD',
        content: 'Massive downed oak tree blocking the south loop completely about 2 miles in. Need a chainsaw crew. Impassable for side-by-sides.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 'r2',
        user: 'JeepDad',
        time: '1h ago',
        location: 'Black Bear Pass',
        status: 'CLEAR',
        content: 'Steps are totally dry. High clearance still required, but no ice on the shelf road today. Great weather.',
        image: null,
    }
];

export const StagingAreaScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Organize a Ride Banner */}
                <TouchableOpacity style={styles.organizeBanner}>
                    <View style={styles.bannerIconBox}>
                        <Icon name="Users" size={24} color="#121212" />
                    </View>
                    <View style={styles.bannerTextContent}>
                        <Text style={styles.bannerTitle}>ORGANIZE A GROUP RIDE</Text>
                        <Text style={styles.bannerSubtitle}>Create a temporary comms Huddle for trail meets.</Text>
                    </View>
                    <Icon name="ChevronRight" size={20} color="#121212" />
                </TouchableOpacity>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>LIVE FROM THE TRAIL</Text>
                    <TouchableOpacity style={styles.postBtn}>
                        <Icon name="Edit2" size={14} color={colors.trailheadAccent} />
                        <Text style={styles.postBtnText}>POST REPORT</Text>
                    </TouchableOpacity>
                </View>

                {TRAIL_REPORTS.map(report => (
                    <View key={report.id} style={styles.reportCard}>
                        <View style={styles.reportHeader}>
                            <View style={styles.authorRow}>
                                <View style={styles.avatarPlaceholder} />
                                <View>
                                    <Text style={styles.authorName}>{report.user}</Text>
                                    <Text style={styles.authorTime}>{report.time}</Text>
                                </View>
                            </View>
                            <View style={[styles.statusBadge, report.status === 'HAZARD' ? styles.statusHazard : styles.statusClear]}>
                                <Text style={[styles.statusText, report.status === 'HAZARD' ? styles.statusTextHazard : styles.statusTextClear]}>{report.status}</Text>
                            </View>
                        </View>

                        <View style={styles.locationStrap}>
                            <Icon name="MapPin" size={12} color={colors.textSecondary} />
                            <Text style={styles.locationText}>{report.location}</Text>
                        </View>

                        <Text style={styles.reportContent}>{report.content}</Text>

                        {report.image && (
                            <Image source={{ uri: report.image }} style={styles.reportImage} />
                        )}

                        <View style={styles.reportFooter}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Icon name="MessageSquare" size={16} color={colors.textSecondary} />
                                <Text style={styles.actionText}>Reply</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Icon name="Share2" size={16} color={colors.textSecondary} />
                                <Text style={styles.actionText}>Broadcast</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#161513' },
    scrollContent: { padding: 16, paddingBottom: 100 },
    organizeBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.trailheadAccent,
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    bannerIconBox: {
        backgroundColor: 'rgba(18, 18, 18, 0.1)',
        padding: 12,
        borderRadius: 8,
        marginRight: 16,
    },
    bannerTextContent: {
        flex: 1,
    },
    bannerTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#121212',
    },
    bannerSubtitle: {
        ...typography.body,
        fontSize: 12,
        color: '#333',
        marginTop: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textSecondary,
        letterSpacing: 1,
    },
    postBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.trailheadAccent,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    postBtnText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.trailheadAccent,
        marginLeft: 6,
    },
    reportCard: {
        backgroundColor: '#1E1D1A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2C2A26',
        marginBottom: 16,
        overflow: 'hidden',
    },
    reportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#333',
        marginRight: 12,
        borderWidth: 1,
        borderColor: colors.trailheadAccent,
    },
    authorName: {
        ...typography.body,
        fontWeight: 'bold',
        color: '#FFF',
    },
    authorTime: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
    },
    statusHazard: {
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        borderColor: colors.error,
    },
    statusClear: {
        backgroundColor: 'rgba(56, 142, 60, 0.1)',
        borderColor: '#388E3C', // Using inline success color
    },
    statusText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        fontWeight: 'bold',
    },
    statusTextHazard: { color: colors.error },
    statusTextClear: { color: '#388E3C' },
    locationStrap: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#11100F',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#2C2A26',
    },
    locationText: {
        ...typography.body,
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.trailheadAccent,
        marginLeft: 8,
    },
    reportContent: {
        ...typography.body,
        color: '#E0E0E0',
        padding: 16,
        lineHeight: 22,
    },
    reportImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#111',
    },
    reportFooter: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#2C2A26',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    actionText: {
        ...typography.body,
        fontSize: 14,
        color: colors.textSecondary,
        marginLeft: 8,
    }
});
