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
import SupportersInterests from "@root/components/interests";

// @ts-ignore
const SupporterProfile = ({ props, route }) => {
  const { colors }: any = useTheme();
  const { getSupporterProfile, getSupporterGraph, getSupporterSupporterList, getSupporterTimeline, setFollowUnfollow, supporters_InterestList } = useActions();
  const { myProfileData, loading } = useTypedSelector(
    (state) => state.myProfile,
  );
  const { myInterestData, interestLoading } = useTypedSelector(
    (state) => state.interest,
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

      getSupporterProfile({ 'supporter_id': route.params.type != '' ? route.params.item.id : route.params.item.item.id, });
      getSupporterGraph({ 'supporter_id': route.params.type != '' ? route.params.item.id : route.params.item.item.id, })
      getSupporterSupporterList({ 'supporter_id': route.params.type != '' ? route.params.item.id : route.params.item.item.id, })
      getSupporterTimeline({ 'supporter_id': route.params.type != '' ? route.params.item.id : route.params.item.item.id, })
      supporters_InterestList({ 'supporter_id': route.params.type != '' ? route.params.item.id : route.params.item.item.id, })
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

                <TouchableOpacity onPress={async () => {
                  await setFollowUnfollow({
                    supporter_id: myProfileData.data.id,
                    status_type: myProfileData.data.is_follow === 0 ? '1' : '0'
                  })
                  getSupporterProfile({ 'supporter_id': route.params.item.item.id, });
                }}>
                  <FollowHorizontal>
                    <Image source={follow} />
                    <TextDecs>{myProfileData != null ? myProfileData.data.is_follow ? 'Unfollow' : 'Follow' : 'Follow'}</TextDecs>
                  </FollowHorizontal>
                </TouchableOpacity>

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
                    (
                      <FlatList
                        nestedScrollEnabled={false}
                        data={mySupporterData.data}
                        horizontal={true}
                        renderItem={({ item }) => {
                          return <ListCard item={item} />;
                        }}
                      />
                    ) :
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

                <Tabbutton>
                  <TouchableOpacity onPress={() => {
                    setTab(4);
                  }}>
                    <TabText>Interests</TabText>
                  </TouchableOpacity>

                  <Divider backgroundColor={tab === 4 ? colors.greenColor : colors.darkGray} height={3} />
                </Tabbutton>
              </TabWrapper>

              <BottomWrapper>
                {tab === 1 ? <Detail item={myProfileData.data} /> : tab === 3 ? <Wheel item={myGraphData.data} /> : tab === 4 ? interestLoading ? (
                  <NotFound>Loading...</NotFound>
                ) :
                  Object.keys(myInterestData).length > 0 ?
                    (
                      myInterestData.data.map((item: any) => (
                        <SupportersInterests item={item} />

                      ))
                    ) :
                    (<Text>No Data Found</Text>) :
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
  width: 25%;
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
  color: ${({ theme }: any) => theme.colors.black};
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
