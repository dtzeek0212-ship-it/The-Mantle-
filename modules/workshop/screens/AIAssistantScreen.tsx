import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Icon } from '../../../components/Icon';
import { useAppContext } from '../../../store/AppContext';
import { NativeAdBanner } from '../../pro_shop/components/NativeAdBanner';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    imageUri?: string;
}

export const AIAssistantScreen = () => {
    const { setActiveContext } = useAppContext();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "I'm your Fix-It Assistant. What are we building or repairing today?", isUser: false }
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
        };

        setMessages((prev) => [...prev, newUserMsg]);
        setInputText('');

        // Mock Gemini API Response
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "I can help with that. Could you provide a clear photo of the area so I can analyze the issue?",
                isUser: false,
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 1500);
    };

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const newUserMsg: Message = {
                id: Date.now().toString(),
                text: "Here is a picture of the issue.",
                isUser: true,
                imageUri: result.assets[0].uri,
            };
            setMessages((prev) => [...prev, newUserMsg]);

            // Mock Gemini Vision API Response
            setTimeout(() => {
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "Looking at the photo, it appears to be a standard loose fitting. First, shut off the main water valve. Then, use a pipe wrench to tighten the nut clockwise.",
                    isUser: false,
                };
                setMessages((prev) => [...prev, botMsg]);

                // Mock Trigger: Update global context to serve native ad
                setActiveContext('plumbing');
            }, 2000);
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.botBubble]}>
            {item.imageUri && (
                <Image source={{ uri: item.imageUri }} style={styles.imageAttachment} />
            )}
            <Text style={item.isUser ? styles.userText : styles.botText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={100}
        >
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.listContent}
            />

            <NativeAdBanner />

            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={handlePickImage}>
                    <Icon name="Camera" size={24} color={colors.workshopAccent} />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Ask a question..."
                    placeholderTextColor={colors.textSecondary}
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                />

                <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
                    <Icon name="Send" size={24} color={colors.workshopAccent} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContent: {
        padding: 16,
        paddingBottom: 24,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    userBubble: {
        backgroundColor: colors.primary,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    botBubble: {
        backgroundColor: colors.surface,
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
        borderWidth: 1,
        borderColor: colors.border,
        borderLeftWidth: 2,
        borderLeftColor: colors.workshopAccent,
    },
    userText: {
        ...typography.body,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    botText: {
        ...typography.body,
        color: colors.textPrimary,
    },
    imageAttachment: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderColor: colors.border,
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        backgroundColor: colors.background,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        ...typography.body,
        color: colors.textPrimary,
    },
    iconButton: {
        padding: 10,
    },
});
