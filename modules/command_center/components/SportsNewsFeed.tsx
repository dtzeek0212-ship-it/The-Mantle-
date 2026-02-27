import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';

export const SportsNewsFeed = () => {
    const newsItems = [
        { id: 'n1', source: 'THE ATHLETIC', title: 'Why the 49ers Zone Run Scheme is Breaking Defenses', type: 'TACTICAL' },
        { id: 'n2', source: 'ESPN', title: 'Sources: Lakers exploring 3-team trade for stretch big', type: 'TRADE RUMORS' },
        { id: 'n3', source: 'BLEACHER REPORT', title: 'UFC 300 Main Event Preview: Paths to Victory', type: 'PREVIEW' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Icon name="Radio" size={20} color="#00FF41" />
                <Text style={styles.sectionTitle}>MANTLE SPORTS NEWS: THE WIRE</Text>
            </View>

            <View style={styles.newsContainer}>
                {newsItems.map(news => (
                    <TouchableOpacity key={news.id} style={styles.newsCard}>
                        <View style={styles.sourceRow}>
                            <Text style={styles.sourceText}>{news.source}</Text>
                            <Text style={styles.typeTag}>{news.type}</Text>
                        </View>
                        <Text style={styles.newsTitle}>{news.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        ...typography.subheader,
        color: '#00FF41',
        fontFamily: 'Orbitron',
        fontSize: 14,
        marginLeft: 8,
    },
    newsContainer: {
        backgroundColor: '#111',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
        overflow: 'hidden',
    },
    newsCard: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        backgroundColor: '#1A1A1A',
    },
    sourceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    sourceText: {
        fontFamily: 'Orbitron',
        fontSize: 10,
        color: colors.primary,
        fontWeight: 'bold',
    },
    typeTag: {
        fontFamily: 'Roboto Mono',
        fontSize: 10,
        color: colors.textSecondary,
        backgroundColor: '#333',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    newsTitle: {
        fontFamily: 'Roboto Mono',
        fontSize: 12,
        color: '#FFF',
        lineHeight: 18,
    }
});
