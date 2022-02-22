import React from "react";
import { Linking, Text, TouchableOpacity } from "react-native";
import { withTheme } from "styled-components";
import styled from "styled-components/native";
import { edit, dummy } from "@root/utils/assets";
import { interestsImages } from "@root/utils/constants";
const SupportersInterests = (item: any) => {

    return (
        <HorizontalWrapper>
            <TouchableOpacity style={{ width: '70%' }} onPress={() => {
                Linking.openURL(item.item.url);
            }}>
               
                <BorderWrapper>
                    <VerticalDivider />
                    <ImageWrapper source={ item.item.image==="" ? dummy : {uri: interestsImages+item.item.image}} />
                    <TitleText>{item.item.title}</TitleText>
                </BorderWrapper>
            </TouchableOpacity>

        </HorizontalWrapper>
    );
}


export default SupportersInterests


const TitleText = styled.Text`
`
const ImageWrapper = styled.Image`
  width: 50px;
  height: 50px;
  margin: 5px;
`;

const VerticalDivider = styled.View`
  height: 55px;
  width: 3px;
  background-color: ${({ theme }: any) => theme.colors.greenColor};
`;

const BorderWrapper = styled.View`
  border-width: 1px;
  align-items: center;
  flex-direction: row;
  border-color: ${({ theme }: any) => theme.colors.darkGray};

`;

const HorizontalWrapper = styled.View`
  display: flex;
  width:100%;
  margin: 5px 16px;
  flex-direction: row;
  align-items: center;

`;