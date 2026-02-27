import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';

export const FuelStationScreen = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            analyzeMeal();
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            analyzeMeal();
        }
    };

    const analyzeMeal = () => {
        setIsAnalyzing(true);
        setAnalysisResult(null);

        // Simulate AI Vision processing latency
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisResult({
                foodItem: "Grilled Chicken & Sweet Potato",
                calories: 540,
                protein: 45,
                carbs: 60,
                fats: 12,
                suggestion: "Solid post-workout meal. Consider adding a scoop of Whey Isolate for maximum recovery."
            });
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.headerTitle}>Fuel Station</Text>
                <Text style={styles.headerSubtitle}>Photo-to-Macro Intelligence</Text>

                <Card style={styles.uploadCard}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.placeholderContainer}>
                            <Icon name="Utensils" size={48} color={colors.textSecondary} />
                            <Text style={styles.placeholderText}>Snap your meal for instant macros</Text>
                        </View>
                    )}

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.border, borderWidth: 1 }]} onPress={takePhoto}>
                            <Icon name="Camera" size={18} color={colors.textPrimary} />
                            <Text style={styles.actionBtnText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.ironWorksAccent }]} onPress={pickImage}>
                            <Icon name="Upload" size={18} color="#FFF" />
                            <Text style={[styles.actionBtnText, { color: '#FFF' }]}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </Card>

                {isAnalyzing && (
                    <View style={styles.analyzingContainer}>
                        <Icon name="Cpu" size={32} color={colors.ironWorksAccent} />
                        <Text style={styles.analyzingText}>Analyzing Macros...</Text>
                    </View>
                )}

                {analysisResult && (
                    <Card style={styles.resultCard}>
                        <View style={styles.resultHeader}>
                            <Icon name="Target" size={20} color={colors.commandCenterAccent} />
                            <Text style={styles.resultTitle}>{analysisResult.foodItem}</Text>
                        </View>

                        <View style={styles.macroGrid}>
                            <View style={styles.macroBox}>
                                <Text style={styles.macroValue}>{analysisResult.calories}</Text>
                                <Text style={styles.macroLabel}>CALORIES</Text>
                            </View>
                            <View style={styles.macroBox}>
                                <Text style={styles.macroValue}>{analysisResult.protein}g</Text>
                                <Text style={styles.macroLabel}>PROTEIN</Text>
                            </View>
                            <View style={styles.macroBox}>
                                <Text style={styles.macroValue}>{analysisResult.carbs}g</Text>
                                <Text style={styles.macroLabel}>CARBS</Text>
                            </View>
                            <View style={styles.macroBox}>
                                <Text style={styles.macroValue}>{analysisResult.fats}g</Text>
                                <Text style={styles.macroLabel}>FATS</Text>
                            </View>
                        </View>

                        <View style={styles.suggestionBox}>
                            <Icon name="Info" size={16} color={colors.ironWorksAccent} />
                            <Text style={styles.suggestionText}>{analysisResult.suggestion}</Text>
                        </View>
                    </Card>
                )}

                {/* Pro-Shop Integration */}
                <Text style={styles.sectionTitle}>Contextual Supplements</Text>
                <TouchableOpacity style={styles.adCard}>
                    <Icon name="ShoppingCart" size={24} color={colors.primary} />
                    <View style={styles.adTextGroup}>
                        <Text style={styles.adTitle}>Mantle Whey Isolate</Text>
                        <Text style={styles.adDesc}>Optimal for post-workout recovery. Tap to shop.</Text>
                    </View>
                    <Icon name="ChevronRight" size={20} color={colors.textSecondary} />
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    headerTitle: {
        ...typography.header,
    },
    headerSubtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 24,
    },
    uploadCard: {
        padding: 16,
    },
    placeholderContainer: {
        height: 200,
        backgroundColor: colors.background,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    placeholderText: {
        ...typography.body,
        color: colors.textSecondary,
        marginTop: 12,
    },
    previewImage: {
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 4,
    },
    actionBtnText: {
        ...typography.body,
        fontWeight: 'bold',
        marginLeft: 8,
        color: colors.textPrimary,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    analyzingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    analyzingText: {
        ...typography.body, // Roboto Mono
        marginTop: 12,
        color: colors.ironWorksAccent,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    resultCard: {
        marginTop: 24,
        borderColor: colors.ironWorksAccent,
        borderWidth: 1,
    },
    resultHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 12,
    },
    resultTitle: {
        ...typography.subheader,
        marginLeft: 8,
        color: '#FFF',
    },
    macroGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    macroBox: {
        width: '48%',
        backgroundColor: colors.background,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
        borderLeftWidth: 2,
        borderLeftColor: colors.border,
    },
    macroValue: {
        ...typography.body, // Roboto Mono
        fontFamily: 'Roboto Mono',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    macroLabel: {
        ...typography.body,
        fontSize: 10,
        color: colors.textSecondary,
        marginTop: 4,
        letterSpacing: 1,
    },
    suggestionBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 0, 0, 0.05)',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
        alignItems: 'flex-start',
    },
    suggestionText: {
        ...typography.body,
        fontSize: 12,
        marginLeft: 8,
        flex: 1,
        lineHeight: 18,
    },
    sectionTitle: {
        ...typography.subheader,
        marginTop: 32,
        marginBottom: 16,
    },
    adCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary, // Safety Orange tie-in
    },
    adTextGroup: {
        flex: 1,
        marginLeft: 16,
    },
    adTitle: {
        ...typography.body,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    adDesc: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    }
});
