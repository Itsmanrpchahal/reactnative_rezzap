import React from "react";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import { MainParentWrapper, MainWrapper, NotFound } from "@root/utils/globalStyle";
import { FlatList, Text, TouchableOpacity } from "react-native";
import {  dp } from "@root/utils/assets";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { imageUrl } from "@root/utils/constants";
import navigationStrings from "@root/navigation/navigationStrings";
import { navigationRef } from "@root/navigation/RootNavigation";
import NavigationStrings from "@root/navigation/navigationStrings";

const Supportors = (props:any) => {

  const {mySupporterData,supporterLoading} = useTypedSelector((state) => state.mySupporters);

  return (
    <MainWrapper>
    {
      supporterLoading ? (
          <NotFound>Loading...</NotFound>
        ) :
        mySupporterData.data.length > 0 ?
          (<FlatList
            nestedScrollEnabled={true}
            data={mySupporterData.data}
            numColumns={3}
            horizontal={false}
            renderItem={({ item }) => {
              return (
                <DrawerThreeSection>
                  <TouchableOpacity onPress={() => { 
                   
                     navigationRef.current.navigate(NavigationStrings.SUPPORTER_PROFILE,{item: item,type:'all'})
                    
                  }
                    }>
                    <HeaderWrapper>
                      <ImageWrapper>
                        <ImageContent source={{uri: item != null ?  imageUrl+item.profile_photo : dp}} />
                      </ImageWrapper>
                      <UserName numberOfLines={1}>{item != null ? item.name:''}</UserName>

                    </HeaderWrapper>
                  </TouchableOpacity>
                </DrawerThreeSection>

              );
            }}
          />) : (<UserName>No Data Found</UserName>)
    }




    </MainWrapper>
  );
};

// @ts-ignore
export default withTheme(Supportors);


const HeaderWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  margin-bottom: 1px;
`;

const ImageWrapper = styled.View`
  border: 1px solid #000;
  padding:2px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  overflow: hidden;
`;
const ImageContent = styled.Image`
  width: 40px;
  height: 40px;
  margin: 1.5px;
  border-radius: 100px;
`;


const UserName = styled.Text``;

const DrawerThreeSection = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:33.3333%;
  padding: 15px;
  box-sizing: border-box;
`;

