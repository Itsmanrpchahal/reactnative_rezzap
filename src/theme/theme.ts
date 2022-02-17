import {DefaultTheme as LightTheme} from '@react-navigation/native';

export const navigationTheme = {
  light: {
    ...LightTheme,
    type: 'light',
    colors: {
      ...LightTheme.colors,
      primary: '#F6F4FF',
      secondary: '#E3E1EE',
      accentColor: '#000000',
      error: '#D93F3C',
      text: '#000000',
      textGray: '#808080',
      inactive: '#CBC9D6',
      greenColor: '#79C358',
      textBlack: '#000000',
      divider: '#DFE1E5',
      blue: '#1876F4',
      lightBlue:'#EDF6FD',
      borderGray: '#808080',
      darkGray: '#DFE1E5',
      white: '#ffffff',
      black: '#000000',
    },
    spacing: {
      horizontal: 15,
    },
    fontSize: {
      cardDate: 15,
      cardTitle: 20,
      cardSubTitle: 15,
      cardHeading:30,
    },
  },
};