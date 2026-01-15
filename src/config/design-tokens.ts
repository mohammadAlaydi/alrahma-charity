/**
 * Centralized design tokens for the Al-Rahma donation platform
 * Use these constants instead of hard-coded values throughout the application
 */

export const COLORS = {
    primary: '#007F5E',
    primaryHover: '#056A4F',
    primaryLight: 'rgba(0, 127, 94, 0.1)',
    secondary: '#B4BB5F',
    dark: '#0D0D0D',
    darkAlt: '#122F2A',
    white: '#FFFFFF',
    accent: '#DFD383',
    paragraph: 'rgba(13, 13, 13, 0.7)',
    border: 'rgba(0, 0, 0, 0.1)',
    heartFilled: '#DC2626',
    heartEmpty: '#9CA3AF',
} as const;

export const DONATION = {
    presetAmounts: [10, 50, 100, 200] as const,
    defaultAmount: 200,
    currency: '₺' as const,
} as const;

export const ANIMATION = {
    burstDuration: 500,
    transitionDuration: 300,
} as const;

export const LAYOUT = {
    cardMaxWidth: 395,
    cardMinHeight: 600,
    imageHeight: 300,
    projectDetailsImageHeight: 700,
    progressBarWidth: 759,
} as const;
