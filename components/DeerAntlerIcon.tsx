import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export interface DeerAntlerIconProps extends SvgProps {
    size?: number;
    color?: string;
}

export const DeerAntlerIcon: React.FC<DeerAntlerIconProps> = ({ size = 24, color = 'currentColor', ...props }) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Left Antler Main Beam */}
            <Path d="M12 21v-3c-1.5-2-4-3.5-5.5-6C5 9.5 4.5 6 5.5 3" />
            {/* Left Tines */}
            <Path d="M10.5 15.5c-1.5-2-3-4-2.5-7" />
            <Path d="M8 11.5c-1-2-1.5-4-1-6" />

            {/* Right Antler Main Beam */}
            <Path d="M12 21v-3c1.5-2 4-3.5 5.5-6C19 9.5 19.5 6 18.5 3" />
            {/* Right Tines */}
            <Path d="M13.5 15.5c1.5-2 3-4 2.5-7" />
            <Path d="M16 11.5c1-2 1.5-4 1-6" />
        </Svg>
    );
};
