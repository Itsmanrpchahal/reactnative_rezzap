// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import {createStackNavigator} from '@react-navigation/stack';
import navigationStrings from '@root/navigation/navigationStrings';
import {useTheme} from '@react-navigation/native';
// @ts-ignore
import styled from 'styled-components/native';
import Login from '@root/screens/Public/login/Login';
import DashboardTabs from '@root/navigation/Tabbar';
import MyWheel from "@root/screens/private/home/myWheel";
import SignUp from "@root/screens/Public/signUp";
import SignUpStep2 from "../screens/Public/signUp/signUp-step-2";
import Supporters from "../screens/private/home/supporters";
import MyProfile from "../screens/private/home/myProfile";
import MessageDetail from "../screens/private/messages/messageDetail";
import SupporterProfile from "../screens/private/home/supporterProfile";
import Interest from "../screens/private/home/interests";
import { TouchableOpacity, View,Text } from "react-native";
import { add,addCategory } from "../utils/assets";
import { navigationRef } from "./RootNavigation";
import NavigationStrings from "./navigationStrings";
import AddNewInterest from "../screens/private/home/interests/addNewInterest";
import UpdateProfile from "../screens/private/home/myProfile/updateProfile";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddNewCategory from "../screens/private/home/newCategory"
import AwesomeAlert from "react-native-awesome-alerts";
import FAQ from '../screens/private/home/faq';
import About from '../screens/private/home/about';
import PrivacyPolicy from '../screens/private/home/privacypolicy';
import Help from '../screens/private/home/help';
import Notifications from '../screens/private/home/notifications';
import AddResume from '../screens/private/resume/addResume';
import AddActivity from '../screens/private/home/addActivity';
import ResetPassword from '../screens/Public/resetPassword';
import AddSupporter from '../screens/private/home/supporters/addSupporter';
import Paypal from '../components/paypal';

const Stack = createStackNavigator();

function StackNavigator(props: any) {
  const [showAlert,setShowAlert] = useState(false)
  const {colors}: any = useTheme();
  const {isAuthenticated} = useTypedSelector((state) => state.auth);

  // @ts-ignore
  return (
    <Stack.Navigator initialRouteName={navigationStrings.LOGIN}>
      <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Login}
        options={{
          headerShown: false,
          // animationTypeForReplace: isAuthenticated ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name={navigationStrings.TAB_BAR_HOME}
        component={DashboardTabs}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />

      <Stack.Screen
        name={navigationStrings.MY_WHEEL}
        component={MyWheel}
        options={{
          headerShown: true,
          title: navigationStrings.MY_WHEEL,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
          headerRight: (props: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  
                  navigationRef.current.navigate(NavigationStrings.ADD_ACTIVITY,{type:0})
                }}>
               <AddBtn
                  style={{marginRight: 15}}
                  source={addCategory}
                />
              </TouchableOpacity>
            );
          },
        }}
        
      />


<Stack.Screen
        name={navigationStrings.ADD_NEW_CATEGORY}
        component={AddNewCategory}
        options={{
          headerShown: true,
          title: navigationStrings.ADD_NEW_CATEGORY,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />



      <Stack.Screen
        name={navigationStrings.SIGNUP}
        component={SignUp}
        options={{
          headerShown: true,
          title: navigationStrings.SIGNUP,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

<Stack.Screen
        name={navigationStrings.PAYPAL}
        component={Paypal}
        options={{
          headerShown: true,
          title: navigationStrings.PAYPAL,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.SIGNUP_STEP_2}
        component={SignUpStep2}
        options={{
          headerShown: true,
          title: navigationStrings.SIGNUP_STEP_2,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

<Stack.Screen
        name={navigationStrings.RESET_PASSWORD}
        component={ResetPassword}
        options={{
          headerShown: true,
          title: navigationStrings.RESET_PASSWORD,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

<Stack.Screen
        name={navigationStrings.FAQ}
        component={FAQ}
        options={{
          headerShown: true,
          title: navigationStrings.FAQ,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

<Stack.Screen
        name={navigationStrings.NOTIFICATIONS}
        component={Notifications}
        options={{
          headerShown: true,
          title: navigationStrings.NOTIFICATIONS,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

<Stack.Screen
        name={navigationStrings.HELP}
        component={Help}
        options={{
          headerShown: true,
          title: navigationStrings.HELP,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.ABOUT}
        component={About}
        options={{
          headerShown: true,
          title: navigationStrings.ABOUT,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

<Stack.Screen
        name={navigationStrings.ADD_RESUME}
        component={AddResume}
        options={{
          headerShown: true,
          title: navigationStrings.ADD_RESUME,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

<Stack.Screen
        name={navigationStrings.ADD_ACTIVITY}
        component={AddActivity}
        options={{
          headerShown: true,
          title: navigationStrings.ADD_ACTIVITY,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />


<Stack.Screen
        name={navigationStrings.PRIVACY_POLICY}
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          title: navigationStrings.PRIVACY_POLICY,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

<Stack.Screen
        name={navigationStrings.ADD_SUPPORTER}
        component={AddSupporter}
        options={{
          headerShown: true,
          title: navigationStrings.ADD_SUPPORTER,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.SUPPORTERS}
        component={Supporters}
        options={{
          headerShown: true,
          title: navigationStrings.SUPPORTERS,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
          headerRight: (props: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigationRef.current.navigate(NavigationStrings.ADD_SUPPORTER)
                }}>
               <AddBtn
                  style={{marginRight: 15}}
                  source={add}
                />
              </TouchableOpacity>
            );
          },
         
        }}
      />

      <Stack.Screen
        name={navigationStrings.MYPROFILE}
        component={MyProfile}
        options={{
          headerShown: true,
          title: navigationStrings.MYPROFILE,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.SUPPORTER_PROFILE}
        component={SupporterProfile}
        options={{
          headerShown: true,
          title: navigationStrings.SUPPORTER_PROFILE,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.UPDATE_PROFILE}
        component={UpdateProfile}
        options={{
          headerShown: true,
          title: navigationStrings.UPDATE_PROFILE,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.ADDNEWINTEREST}
        component={AddNewInterest}
        options={{
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.MESSAGE_DETAIL}
        component={MessageDetail}
        options={{
          headerShown: true,
          title: navigationStrings.MESSAGE_DETAIL,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
        }}
      />

      <Stack.Screen
        name={navigationStrings.INTERESTS}
        component={Interest}
        options={{
          headerShown: true,
          title: navigationStrings.INTERESTS,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerBackTitleStyle: {
            color: colors.black,
          },
          headerRight: (props: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigationRef.current.navigate(NavigationStrings.ADDNEWINTEREST,{item:'Add'})
                }}>
                <AddBtn
                  style={{marginRight: 15}}
                  source={add}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      
    </Stack.Navigator>
  );
}

export default StackNavigator;

const AddBtn = styled.Image`
  margin-left: 16px;
`;