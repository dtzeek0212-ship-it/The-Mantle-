import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { colors } from '../theme/colors';

interface IconProps {
    name: keyof typeof LucideIcons;
    size?: number;
    color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = colors.textPrimary }) => {
    const LucideIcon = LucideIcons[name] as React.ElementType;

    if (!LucideIcon) {
        return null;
    }

    // Industrial Modern styling requires "Bold" stroke weight (e.g. strokeWidth 2)
    return <LucideIcon size={size} color={color} strokeWidth={2} />;
};
