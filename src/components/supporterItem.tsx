// @ts-ignore
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {  TouchableOpacity } from "react-native";
import { imageUrl } from "../utils/constants";
import { dp } from "../utils/assets";
import NavigationStrings from "@root/navigation/navigationStrings";
import { navigationRef } from "../navigation/RootNavigation";




const ListCard = (item :any) => {
  return (
    <DrawerThreeSection>
      <TouchableOpacity onPress={() => { // @ts-ignore
        navigationRef.current.navigate(NavigationStrings.SUPPORTER_PROFILE,{item: item})}}>
        <HeaderWrapper>
          <ImageWrapper>
            <ImageContent source={{uri: item != null ?  imageUrl+item.item.profile_photo : dp}} />
          </ImageWrapper>

        </HeaderWrapper>
      </TouchableOpacity>
    </DrawerThreeSection>
  );
};

export default ListCard;

const DrawerThreeSection = styled.View`
  margin-left: 8px;
`;

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
