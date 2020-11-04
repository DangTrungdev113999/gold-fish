import {Platform} from 'react-native';

export default {
  color: {
    primary: '#212C3D',
    primaryLight: 'rgba(54, 179, 126, 0.2)',

    secondary: '#11ECE5',
    bg: '#0F1724',

    standard: '#0080FE',
    success: '#36B37E',
    danger: '#FF5630',
    dangerLight: 'rgba(255, 86, 48, 0.15)',
    warning: '#FFAB00',
    information: '#6554C0',
    disabled: '#DFE1E6',

    neutral9: '#172B4D',
    neutral8: '#42526E',
    neutral7: '#6B778C',
    neutral6: '#97A0AF',
    neutral5: '#C1C7D0',
    neutral4: '#DFE1E6',
    neutral3: '#EBECF0',
    neutral2: '#F4F5F7',
    neutral1: '#F7F7F7',
    neutral0: '#FFFFFF',

    black: '#000000',
    dark: '#172B4D',

    white: '#FFFFFF',
    light: '#FFFFFF',

    textPrimary: '#172B4D',
    textSecondary: '#42526E',
    textThird: '#15408A',
    textNeutral: '#6B778C',
    textHighlight: '#36B37E',
    textDanger: '#FF5630',
    textDisabled: '#97A0AF',
  },
  font: {
    primary: Platform.OS === 'android' ? 'Lato-Regular' : 'Lato',
    primaryThin: Platform.OS === 'android' ? 'Lato-Thin' : 'Lato',
    primaryLight: Platform.OS === 'android' ? 'Lato-Light' : 'Lato',
    primaryMedium: Platform.OS === 'android' ? 'Lato-Medium' : 'Lato',
    primarySemiBold: Platform.OS === 'android' ? 'Lato-SemiBold' : 'Lato',
    primaryBold: Platform.OS === 'android' ? 'Lato-Bold' : 'Lato',
    primaryExtraBold: Platform.OS === 'android' ? 'Lato_Black' : 'Lato',
  },
};
