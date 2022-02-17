// @ts-ignore
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

import {Home, Spin, Messages, Resume} from './index';
import navigationStrings from './navigationStrings';
import {TabBarIcon} from './TabbarIcon';
import {navigaionIcon} from '../utils/assets';

const Tab = createBottomTabNavigator();

function DashboardTabs(props: any) {
  const {colors, type}: any = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => (
          <TabBarIcon color={color} routeName={route.name} />
        ),
        tabBarStyle: {backgroundColor: colors.white},
        tabBarActiveTintColor: colors.accentColor,
        tabBarInactiveTintColor: colors.inactive,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <NavigationBurgerIcon
              source={type === 'dark' ? navigaionIcon : navigaionIcon}
            />
          </TouchableOpacity>
        ),
      })}>
      <Tab.Screen name={navigationStrings.TAB_BAR_HOME} component={Home} />

      <Tab.Screen name={navigationStrings.TAB_BAR_SPIN} component={Spin} />

      <Tab.Screen
        name={navigationStrings.TAB_BAR_MESSAGES}
        component={Messages}
      />
      <Tab.Screen name={navigationStrings.TAB_BAR_RESUME} component={Resume} />
    </Tab.Navigator>
  );
}

export default DashboardTabs;

const NavigationBurgerIcon = styled.Image`
  margin-left: 16px;
`;

const BtnWrapper = styled.View`
  margin: 8px;
`;
