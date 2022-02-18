// @ts-ignore
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

import {Home, Spin, Messages, Resume} from './index';
import navigationStrings from './navigationStrings';
import NavigationStrings from "./navigationStrings";
import {TabBarIcon} from './TabbarIcon';
import {navigaionIcon,add} from '../utils/assets';
import { addresume } from "../utils/assets";
import { navigationRef } from './RootNavigation';

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
      <Tab.Screen name={navigationStrings.TAB_BAR_HOME} component={Home} options={{ headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(NavigationStrings.ADD_ACTIVITY)
                  
                }}>
               <AddBtn
                  style={{marginRight: 15}}
                  source={add}
                />
              </TouchableOpacity>
            );
          },}} />

      <Tab.Screen name={navigationStrings.TAB_BAR_SPIN} component={Spin} />

      <Tab.Screen
        name={navigationStrings.TAB_BAR_MESSAGES}
        component={Messages}
      />
      <Tab.Screen name={navigationStrings.TAB_BAR_RESUME} component={Resume} options={{ headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(NavigationStrings.ADD_RESUME)
                  
                }}>
               <AddBtn
                  style={{marginRight: 15}}
                  source={addresume}
                />
              </TouchableOpacity>
            );
          },}} />
    </Tab.Navigator>
  );
}

export default DashboardTabs;

const AddBtn = styled.Image`
  margin-left: 16px;
`;

const NavigationBurgerIcon = styled.Image`
  margin-left: 16px;
`;

const BtnWrapper = styled.View`
  margin: 8px;
`;
