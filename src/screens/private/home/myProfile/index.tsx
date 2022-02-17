import React, { useState } from "react";
import { MainWrapper, NotFound } from "@root/utils/globalStyle";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ProfileView from "./porfileView";
import NavigationStrings from "@root/navigation/navigationStrings";


const MyProfile = (props: any) => {


  return (
    <MainWrapper>
        <ScrollView nestedScrollEnabled={false}>
           <ProfileView />

          <TouchableOpacity onPress={() => {props.navigation.navigate(NavigationStrings.UPDATE_PROFILE)}}>
            <ButtonWrapper>
              <TextBt> {'Edit Profile'  } </TextBt>
            </ButtonWrapper>
          </TouchableOpacity>
        </ScrollView>
    </MainWrapper>

  );
};

export default withTheme(MyProfile);


const TextBt = styled.Text`
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
  color: ${({ theme }: any) => theme.colors.white};
  padding: 10px;
  text-align: center;
`;

const ButtonWrapper = styled.View`
 
  align-items: center;
  width: 90%;
  margin:  40px 16px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${({ theme }: any) => theme.colors.black};
`;


