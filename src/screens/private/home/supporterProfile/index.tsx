import React, { useEffect, useState } from "react";
import { withTheme } from "styled-components";
import { Divider, MainWrapper, NotFound } from "@root/utils/globalStyle";
// @ts-ignore
import styled from "styled-components/native";
import { demoImage, dp, follow } from "@root/utils/assets";
import { FlatList, Image, ScrollView, Text, TouchableOpacity } from "react-native";
import ListCard from "@root/components/supporterItem";
import { useIsFocused, useTheme } from "@react-navigation/native";
import Detail from "@root/components/detail";
import Wheel from "@root/components/wheel";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { imageUrl } from "@root/utils/constants";
import navigationStrings from "@root/navigation/navigationStrings";
import Timeline from "@root/components/timeline";
import { navigationRef } from "@root/navigation/RootNavigation";
import AppLoader from "../../../../components/Loader";

// @ts-ignore
const SupporterProfile = ({ props, route }) => {
  const { colors }: any = useTheme();
  const { getSupporterProfile, getMyGraph, getSupporterSupporterList, getSupporterTimeline } = useActions();
  const { myProfileData, loading } = useTypedSelector(
    (state) => state.myProfile,
  );
  const { mySupporterData, supporterLoading } = useTypedSelector((state) => state.mySupporters);
  const { myGraphData } = useTypedSelector((state) => state.myGraph);
  const { timelineData, timelineLoading } = useTypedSelector(
    (state) => state.timeline,
  );
  const [tab, setTab] = useState(1);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getSupporterProfile({ 'supporter_id': route.params.item.item.id, });
      getMyGraph({ 'supporter_id': route.params.item.item.id, })
      getSupporterSupporterList({ 'supporter_id': route.params.item.item.id, })
      getSupporterTimeline({ 'supporter_id': route.params.item.item.id, })
    }
  }, [isFocused]);

  return (
    <MainWrapper>
      {
        loading ? (
          <AppLoader />
        ) :
          <ScrollView nestedScrollEnabled={true}>

            <MainWrapper>
              <ImageBox>
                <ImageView source={{ uri: myProfileData != null ? imageUrl + myProfileData.data.profile_photo : demoImage }} />
              </ImageBox>
              <HorizontalWrapper>
                <TitleVerticle>
                  <TextWrapper>{myProfileData != null ? myProfileData.data.first_name + " " + myProfileData.data.last_name : ''}</TextWrapper>
                  <TextDecs>Actor</TextDecs>

                </TitleVerticle>

                <FollowHorizontal>
                  <Image source={follow} />
                  <TextDecs>{myProfileData != null ? myProfileData.data.is_follow ? 'Unfollow' : 'Follow' : 'Follow'}</TextDecs>
                </FollowHorizontal>
              </HorizontalWrapper>

              <HorizontalWrapper>
                <TouchableOpacity>
                  <TextDecs>Supporters</TextDecs>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  navigationRef.current.navigate(navigationStrings.SUPPORTERS, { item: mySupporterData.data });
                }}>
                  <TextDecs>View All </TextDecs>
                </TouchableOpacity>
              </HorizontalWrapper>

              {
                supporterLoading ? (
                  <NotFound>Loading...</NotFound>
                ) :
                  Object.keys(mySupporterData).length > 0 ?
                    (<FlatList
                      nestedScrollEnabled={false}
                      data={mySupporterData.data}
                      horizontal={true}
                      renderItem={({ item }) => {
                        return <ListCard item={item} />;
                      }}
                    />) :
                    (<Text>No Data Found</Text>)
              }


              <Divider backgroundColor={colors.divider} height={4} />

              <TabWrapper>
                <Tabbutton>
                  <TouchableOpacity onPress={() => {
                    setTab(1);
                  }}>
                    <TabText>Details</TabText>
                  </TouchableOpacity>

                  <Divider backgroundColor={tab === 1 ? colors.greenColor : colors.darkGray} height={3} />
                </Tabbutton>
                <Tabbutton>
                  <TouchableOpacity onPress={() => {
                    setTab(2);
                  }}>
                    <TabText>Timeline</TabText>
                  </TouchableOpacity>
                  <Divider backgroundColor={tab === 2 ? colors.greenColor : colors.darkGray} height={3} />
                </Tabbutton>
                <Tabbutton>
                  <TouchableOpacity onPress={() => {
                    setTab(3);
                  }}>
                    <TabText>Wheel</TabText>
                  </TouchableOpacity>

                  <Divider backgroundColor={tab === 3 ? colors.greenColor : colors.darkGray} height={3} />
                </Tabbutton>
              </TabWrapper>

              <BottomWrapper>
                {tab === 1 ? <Detail item={myProfileData.data} /> : tab === 3 ? <Wheel item={myGraphData.data} /> :
                  timelineLoading ? (
                    <NotFound>Loading...</NotFound>
                  ) :
                    Object.keys(timelineData).length > 0 ?
                      (
                        timelineData.data.map((item: any) => (
                          <Timeline item={item} />

                        ))
                      ) :
                      (<Text>No Data Found</Text>)
                }
              </BottomWrapper>
            </MainWrapper>

          </ScrollView>
      }
    </MainWrapper>


  );
}

// @ts-ignore
export default withTheme(SupporterProfile);

const BottomWrapper = styled.View`
  height: auto;
`;

const TabText = styled.Text`
  text-align: center;
`;

const Tabbutton = styled.View`
  width: 33.3333%;
`;

const TabWrapper = styled.View`
  padding-top: 2px;
  margin: 5px 0;
  padding-bottom: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const TextDecs = styled.Text`
  color: ${({ theme }: any) => theme.colors.darkGray};
  font-size: ${({ theme }: any) => theme.fontSize.cardDate};
  margin-left: 5px;
`;

const TextWrapper = styled.Text`
  color: ${({ theme }: any) => theme.colors.black};
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
  margin-left: 5px;
  min-width: 85px;
`;

const FollowHorizontal = styled.View`
  flex-direction: row;
`;

const TitleVerticle = styled.View`

`;

const HorizontalWrapper = styled.View`
  display: flex;
  padding-right: 15px;
  padding-top: 2px;
  margin: 5px 16px;
  padding-bottom: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;


const ImageBox = styled.View`
  position: relative;
  width: 100%;
`;
const ImageView = styled.Image`
  width: 100%;
  height: 250px;
`;
