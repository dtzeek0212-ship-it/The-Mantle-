import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
    header: {
        fontFamily: 'SairaStencilOne_400Regular',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subheader: {
        fontFamily: 'SairaStencilOne_400Regular',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    body: {
        fontFamily: 'System', // Will sync with custom fonts if added globally
        fontSize: 16,
        fontWeight: 'normal',
        color: colors.textPrimary,
    },
    brand: {
        fontFamily: 'SairaStencilOne_400Regular',
        fontSize: 32,
        color: colors.primary,
    },
    button: {
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#121212',
    },
    radarEventTitle: {
        fontFamily: 'Orbitron_900Black',
        fontSize: 20,
        color: '#FFFFFF',
    },
};
