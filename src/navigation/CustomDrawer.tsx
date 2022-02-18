// @ts-ignore
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import {Linking, SafeAreaView, ScrollView} from 'react-native';
import {withTheme} from 'styled-components';
import NavigationItem from '../components/navigationItem';
import navigationStrings from './navigationStrings';
import { clearAll } from "@root/storage";
import { persistor } from "@root/store";
import { useActions } from "@root/hooks/useActions";
import axios from "axios";
import { TouchableOpacity } from 'react-native-gesture-handler';

function CustomDrawer(props: any) {
  const {setAuthentication} =useActions();
  const {colors}: any = useTheme();

  const logout = async () => {
    await clearAll();
    await persistor.flush();
    await persistor.purge();
    setAuthentication(false);
    delete axios.defaults.headers.common["Authorization"];
    props.navigation.reset({
      index: 0,
      routes: [{name: navigationStrings.LOGIN}],
    });
  };
  // @ts-ignore
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView>
        <DrawerWrapper backgroundColor={colors.white}>
          <MainWrapper>
            <ItemWrapper>
              <NavigationItem
                onPress={() => {props.navigation.navigate(navigationStrings.NOTIFICATIONS)}}
                backgroundColor={colors.secondary}
                text={'NOTIFICATIONS'}
                icon={require('../assets/nofication/notification.png')}
              />
              <Divider backgroundColor={colors.divider} />

              <NavigationItem
                onPress={() => {props.navigation.navigate(navigationStrings.HELP)}}
                backgroundColor={colors.secondary}
                text={'HELP'}
                icon={require('../assets/info/information.png')}
              />
              <Divider backgroundColor={colors.divider} />

              <NavigationItem
                onPress={() => {props.navigation.navigate(navigationStrings.ABOUT)}}
                backgroundColor={colors.secondary}
                text={'ABOUT'}
                icon={require('../assets/about/about.png')}
              />
              <Divider backgroundColor={colors.divider} />

              <NavigationItem
                onPress={() => {props.navigation.navigate(navigationStrings.FAQ)}}
                backgroundColor={colors.secondary}
                text={'FAQS'}
                icon={require('../assets/chat/chat.png')}
              />
              <Divider backgroundColor={colors.divider} />

              <NavigationItem
                onPress={() => {props.navigation.navigate(navigationStrings.PRIVACY_POLICY)}}
                backgroundColor={colors.secondary}
                text={'PRIVACY POLICY'}
                icon={require('../assets/policy/insurance.png')}
              />
              <Divider backgroundColor={colors.divider} />

              <NavigationItem
                onPress={() => {
                  logout(), props.navigation.closeDrawer();
                }}
                backgroundColor={colors.secondary}
                text={'SIGN OUT'}
                icon={require('../assets/logout/logout.png')}
              />
              <Divider backgroundColor={colors.divider} />
            </ItemWrapper>

            <SocailWrapper>
              <FollowText>FOLLOW US</FollowText>
              <ImageWrapper>
                <TouchableOpacity onPress={()=> { Linking.openURL('https://www.facebook.com/Rezzap-1517672048539007');}}>
                <ImageView
                  source={require('../assets/facebook/facebook.png')}
                />
                </TouchableOpacity>

                <TouchableOpacity  onPress={()=> { Linking.openURL('https://twitter.com/officialrezzap');}}>
                <ImageView source={require('../assets/twitter/twitter.png')} />
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> { Linking.openURL('https://www.instagram.com/officialrezzap/');}}>
                <ImageView source={require('../assets/insta/insta.png')} />
                </TouchableOpacity>

               <TouchableOpacity onPress={()=> { Linking.openURL('https://www.pinterest.com/officialrezzap/');}}>
               <ImageView
                  source={require('../assets/pinetrest/pintrest.png')}
                />
               </TouchableOpacity>
               
               
                
              </ImageWrapper>
            </SocailWrapper>
          </MainWrapper>
        </DrawerWrapper>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withTheme(CustomDrawer);

type DrawerWrapperProps = {
  backgroundColor: string;
};

const ImageView = styled.Image`
  margin: 10px;
`;

const ImageWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const FollowText = styled.Text`
  margin-left: 10px;
  color: ${({theme}: any) => theme.colors.black};
  font-size: ${({theme}: any) => theme.fontSize.cardTitle}px;
`;

const SocailWrapper = styled.View`
  margin-top: 80px;
  margin-left: 16px;
`;

const ItemWrapper = styled.View``;

const Divider = styled.View<DrawerWrapperProps>`
  height: 1px;
  margin-top: 10px;
  background-color: ${({backgroundColor}: any) => backgroundColor};
`;

const MainWrapper = styled.View`
  margin-top: 80px;
  flex: 1;
`;

const DrawerWrapper = styled.View<DrawerWrapperProps>`
  background-color: ${({backgroundColor}: any) => backgroundColor};
  margin-top: 30px;
  justify-content: space-between;
`;
