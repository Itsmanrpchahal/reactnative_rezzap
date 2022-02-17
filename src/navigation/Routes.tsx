// @ts-ignore
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// @ts-ignore
import {navigationRef} from './RootNavigation';
// @ts-ignore
import MainDrawer from '../navigation/Drawer';

type RouteProps = {
  scheme: any;
};

const Routes: React.FC<RouteProps> = ({scheme}) => {
  return (
    <NavigationContainer ref={navigationRef} theme={scheme}>
      <MainDrawer />
    </NavigationContainer>
  );
};
export default Routes;
