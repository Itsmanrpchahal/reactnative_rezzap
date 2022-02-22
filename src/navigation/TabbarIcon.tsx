// @ts-ignore
import PropTypes from 'prop-types';
// @ts-ignore
import React from 'react';
import {Image} from 'react-native';
// @ts-ignore
import {homeIcon, spinIcon, messageIcon, resumeIcon,dash} from '../assets';
import navigationStrings from '../navigation/navigationStrings';

const tabIcon = {
  [navigationStrings.TAB_BAR_HOME]: homeIcon,
  [navigationStrings.TAB_BAR_SPIN]: spinIcon,
  [navigationStrings.TAB_BAR_MESSAGES]: messageIcon,
  [navigationStrings.TAB_BAR_RESUME]: resumeIcon,
  [navigationStrings.TAB_BAR_DASH]: dash,
};

type TabBarIconProps = {
  color: string;
  routeName: string;
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({color, routeName}) => {
  return (
    <Image
      accessibilityIgnoresInvertColors
      source={tabIcon[routeName]}
      style={{tintColor: color}}
    />
  );
};

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
