import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/Icon';

export interface CameraData {
    id: string;
    name: string;
    ipLink: string;
}

interface AddCameraModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (cam: CameraData) => void;
}

export const AddCameraModal: React.FC<AddCameraModalProps> = ({ visible, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [ipLink, setIpLink] = useState('');

    const handleSubmit = () => {
        if (!name.trim()) return;

        onAdd({
            id: Date.now().toString(),
            name,
            ipLink: ipLink || 'rtsp://192.168.1.100/live', // fallback mock
        });

        setName('');
        setIpLink('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Icon name="Camera" size={24} color={colors.fieldStreamAccent} />
                        <Text style={styles.title}>Add Trail Cam</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Icon name="X" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.description}>
                        Connect a stationary IP or Cellular Camera via direct RTSP stream link.
                    </Text>

                    <Text style={styles.label}>Camera Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. North Ridge Feeder"
                        placeholderTextColor={colors.textSecondary}
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Stream Link / IP Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. rtsp://192.168.X.X/live"
                        placeholderTextColor={colors.textSecondary}
                        value={ipLink}
                        onChangeText={setIpLink}
                        autoCapitalize="none"
                    />

                    <Button
                        title="Sync Camera"
                        onPress={handleSubmit}
                        style={styles.submitBtn}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        ...typography.subheader,
        color: colors.textPrimary,
        marginLeft: 8,
        flex: 1,
    },
    closeBtn: {
        padding: 4,
    },
    description: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: 24,
    },
    label: {
        ...typography.body,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colors.textPrimary,
    },
    input: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        padding: 12,
        ...typography.body,
        color: colors.textPrimary,
        marginBottom: 16,
    },
    submitBtn: {
        marginTop: 8,
    }
});
