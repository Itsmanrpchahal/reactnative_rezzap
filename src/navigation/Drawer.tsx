// @ts-ignore
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from '../navigation/StackNavigator';
import { WINDOW_DEVICE_HEIGHT } from '../utils/constants';
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

function MainDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerContentContainerStyle: {
                    height: WINDOW_DEVICE_HEIGHT,
                },
                drawerActiveTintColor: 'white',
                drawerActiveBackgroundColor: 'transparent',
            }}>
            <Drawer.Screen name="Home" component={StackNavigator} />
        </Drawer.Navigator>
    );
}

export default MainDrawer;
