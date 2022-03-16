// @ts-ignore
import React, { useEffect } from "react";
// @ts-ignore
import styled from "styled-components/native";

import { MainParentWrapper, NotFound } from "@root/utils/globalStyle";
import { withTheme } from "styled-components";
import { demoImage, imageLayout } from "@root/utils/assets";
import { FlatList,ScrollView, Text, TouchableOpacity } from "react-native";
import SecondaryButton from "@root/components/ButtonSecondary";
import { useIsFocused, useTheme } from "@react-navigation/native";
import ListCard from "@root/components/supporterItem";
import navigationStrings from "@root/navigation/navigationStrings";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { useActions } from "@root/hooks/useActions";
import Timeline from "@root/components/timeline";
import { imageUrl } from "../../../utils/constants";
import AppLoader from "../../../components/Loader";
import { MainWrapper } from "../../../utils/globalStyle";

const Home = (props: any) => {
  const { colors }: any = useTheme();
  const isFocused = useIsFocused();
  const { getMyProfile, getMySupporter, getMyTimeline } = useActions();
  const { mySupporterData, supporterLoading } = useTypedSelector((state) => state.mySupporters);
  const { myProfileData, loading } = useTypedSelector(
    (state) => state.myProfile,
  );

  const { timelineData, timelineLoading } = useTypedSelector(
    (state) => state.timeline,
  );

  useEffect(() => {
    if (isFocused) {
      getMyProfile();
      getMySupporter();
      getMyTimeline();
    }
  }, [isFocused]);

  return (
   
     <MainWrapper>
     {loading ? (
          <AppLoader/>
        ) :
        <ScrollView nestedScrollEnabled={false} style={{width:'100%',height:'100%'}}>
        <MainParentWrapper>

          <ChildWrapper>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate(navigationStrings.MYPROFILE);
            }}>
              <ImageWrapper>
                <ImageView source={imageLayout} />
                <ImageBottom
                  source={myProfileData ? {uri : imageUrl + myProfileData.data.profile_photo } : demoImage } />
              </ImageWrapper>
            </TouchableOpacity>


            <UserText>{myProfileData && Object.keys(myProfileData).length > 0  ? myProfileData.data.first_name + " " + myProfileData.data.last_name : ""}</UserText>
            <UserSubText>{myProfileData && Object.keys(myProfileData).length > 0  ? myProfileData.data.profile_status : ""}</UserSubText>
            
            <BtnWrapper>
              <SecondaryButton
                onPress={() => {
                  props.navigation.navigate(navigationStrings.INTERESTS);
                }}
                btnText={"Interest"}
                backgroundColor={colors.divider}
              />
              <SecondaryButton
                onPress={() => {
                  props.navigation.navigate(navigationStrings.MY_WHEEL,{type:'0'});
                }}
                btnText={"My Wheel"}
                backgroundColor={colors.blue}
              />
            </BtnWrapper>
          </ChildWrapper>
          <Divider backgroundColor={colors.divider} height={3} />

          <HorizontalWrapper>

            <TextWrapper>Supporters</TextWrapper>

            <TouchableOpacity onPress={() => {
              props.navigation.navigate(navigationStrings.SUPPORTERS, { item: mySupporterData.data });
            }}>
              <TextWrapper>View All</TextWrapper>
            </TouchableOpacity>
          </HorizontalWrapper>

          {
            supporterLoading ? (
                <NotFound>Loading...</NotFound>
              ) :
              Object.keys(mySupporterData).length > 0 ?
                (<FlatList
                  nestedScrollEnabled={true}
                  data={mySupporterData.data}
                  horizontal={true}
                  renderItem={({ item }) => {
                    return <ListCard item={item} />;
                  }}
                />) :
                (<Text>No Data Found</Text>)
          }

          <Divider backgroundColor={colors.divider} height={1} />
          {
            timelineLoading ? (
                <NotFound>Loading...</NotFound>
              ) :
              timelineData.data && Object.keys(timelineData.data).length > 0 ?
                (
                   timelineData.data.map((item: any) => (
                    <Timeline item={item} />
                    
                  ))
                ) :
                (<Text>No Data Found</Text>)
          }

        </MainParentWrapper>
        </ScrollView>
      }
     </MainWrapper>
      

   
  );
};

export default withTheme(Home);

type DrawerWrapperProps = {
  backgroundColor: string;
  height: string;
};



const TextWrapper = styled.Text`
  color: ${({ theme }: any) => theme.colors.borderGray};
  font-size: ${({ theme }: any) => theme.fontSize.cardSubTitle}px;
`;

const HorizontalWrapper = styled.View`
  margin: 10px;
  justify-content: space-between;
  flex-direction: row;
`;

const Divider = styled.View<DrawerWrapperProps>`
  height: ${({ height }: any) => height}px;
  margin-top: 10px;
  background-color: ${({ backgroundColor }: any) => backgroundColor};
`;

const BtnWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const UserSubText = styled.Text`
  color: ${({ theme }: any) => theme.colors.borderGray};
  font-size: ${({ theme }: any) => theme.fontSize.cardSubTitle}px;
  margin-top: 10px;
`;

const UserText = styled.Text`
  color: ${({ theme }: any) => theme.colors.black};
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle}px;
  margin-top: 10px;
`;

const ChildWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;


const ImageView = styled.Image`
  width: 200px;
  height: 200px;`;

const ImageBottom = styled.Image`
    position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 80px;
`;

const ImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 188px;
  height: 188px;
  margin-top: 15px;
`;