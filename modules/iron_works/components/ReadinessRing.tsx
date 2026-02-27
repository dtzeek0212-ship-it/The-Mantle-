import React from 'react';
import Svg, { Circle, Text as SvgText, SvgProps } from 'react-native-svg';
import { colors } from '../../../theme/colors';

interface ReadinessRingProps extends SvgProps {
    score: number; // 0 to 100
    size?: number;
}

export const ReadinessRing: React.FC<ReadinessRingProps> = ({ score, size = 160, ...props }) => {
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // Calculate the strokeDashoffset based on the score (percentage)
    // 0 score means full offset (invisible ring), 100 means 0 offset (full ring)
    const strokeDashoffset = circumference - (score / 100) * circumference;

    // Determine color based on readiness
    let ringColor = colors.commandCenterAccent; // Green for highly ready
    if (score < 40) ringColor = colors.ironWorksAccent; // Red for recovery needed
    else if (score < 70) ringColor = colors.workshopAccent; // Yellow for moderate

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} {...props}>
            {/* Background Track Ring */}
            <Circle
                stroke={colors.border}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
            />
            {/* Foreground Score Ring */}
            <Circle
                stroke={ringColor}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from top
            />
            {/* Center Score Text */}
            <SvgText
                x={size / 2}
                y={size / 2 + 12} // Adjusted for vertical centering
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={36}
                fontWeight="bold"
                fontFamily="Roboto Mono" // Enforcing data terminal feel
            >
                {score}
            </SvgText>
        </Svg>
    );
};
