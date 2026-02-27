import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

export const TrackerAIScreen = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
            setAnalysis(null);
        }
    };

    const runAnalysis = () => {
        if (!imageUri) return;
        setIsAnalyzing(true);

        // Mock AI Recognition Delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysis(
                "MATCH FOUND: \n\n" +
                "Subject: White-Tailed Deer (Odocoileus virginianus)\n" +
                "Sign Type: Fresh Scrape & Track\n" +
                "Estimated Age: < 12 Hours\n\n" +
                "Tactical Advice: Direction of travel indicates movement toward bedding area (East). Adjust evening stand accordingly."
            );
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tracker AI</Text>
            <Text style={styles.subtitle}>Upload track, scat, or foliage for instant intelligence.</Text>

            <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                ) : (
                    <View style={styles.placeholderBox}>
                        <Icon name="Camera" size={48} color={colors.textSecondary} />
                        <Text style={styles.placeholderText}>Tap to Scan Environment</Text>
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.actions}>
                <Button
                    title={isAnalyzing ? "Processing Matrix..." : "Analyze Terrain"}
                    onPress={runAnalysis}
                    disabled={!imageUri || isAnalyzing}
                    style={{ backgroundColor: colors.fieldStreamAccent, borderColor: colors.fieldStreamAccent }}
                />
            </View>

            {analysis && (
                <Card style={styles.resultCard}>
                    <Icon name="Target" size={24} color={colors.forestMoss} />
                    <Text style={styles.resultText}>{analysis}</Text>
                </Card>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    header: {
        ...typography.header,
        color: colors.fieldStreamAccent,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 24,
    },
    imagePickerBtn: {
        width: '100%',
        height: 300,
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: 'dashed',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    placeholderBox: {
        alignItems: 'center',
    },
    placeholderText: {
        ...typography.body,
        marginTop: 12,
        fontWeight: 'bold',
    },
    actions: {
        marginTop: 24,
    },
    resultCard: {
        marginTop: 24,
        borderLeftColor: colors.forestMoss,
        backgroundColor: '#1E2320', // Mossy dark
    },
    resultText: {
        ...typography.body, // Roboto Mono
        marginTop: 12,
        lineHeight: 22,
        color: '#FFF',
    }
});
