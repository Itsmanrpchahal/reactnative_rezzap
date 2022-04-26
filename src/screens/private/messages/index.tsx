// @ts-ignore
import React, { useEffect, useState } from "react";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { demoImage, dp, search, close } from "@root/utils/assets";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { NotFound } from "@root/utils/globalStyle";
import NavigationStrings from "@root/navigation/navigationStrings";
import { imageUrl } from "@root/utils/constants";
import AppLoader from "@root/components/Loader";
import formatDistance from "date-fns/formatDistance";

const Messages = (props: any) => {
  const isFocused = useIsFocused();
  const { colors }: any = useTheme();
  const { getMessageList, searchSupporter } = useActions();
  const [searcht, setSearch] = useState("");
  const { messageListData, loading } = useTypedSelector((state) => state.messageListData);

  useEffect(() => {
    if (isFocused) {
      getMessageList();
    }
  }, [isFocused]);


  // @ts-ignore
  return (
    <MainView>

      <SearchWrapper style={[styles.shadowBottonContainerStyle]}>
        <TextInput style={{ color: colors.black }} placeholder={"Search List"} onChangeText={(mess) => setSearch(mess)} >


        </TextInput>
        {
          searcht === '' ? <TouchableOpacity onPress={() => {
            getMessageList();
          }}>
            <ImageView source={close} />
          </TouchableOpacity> : <TouchableOpacity onPress={() => {
            searchSupporter(searcht)
          }}>
            <ImageView source={search} />
          </TouchableOpacity>
        }

      </SearchWrapper>
      {
        loading ? (
          <AppLoader />
        ) :
          <ParentWrapper>

            {
              loading ? (
                <NotFound>Loading...</NotFound>
              ) :
                <FlatList
                  style={{ height: '100%' }}
                  nestedScrollEnabled={true}
                  data={messageListData.data}
                  numColumns={1}
                  horizontal={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity onPress={() => { // @ts-ignore
                        props.navigation.navigate(NavigationStrings.MESSAGE_DETAIL, { id: item.id });
                      }}>
                        <ChatMainView>
                          <ChatWrapper>
                            <ProfileImageCont>
                              <ProfileImage source={item != null ? { uri: imageUrl + item.profile_photo } : demoImage} />
                            </ProfileImageCont>
                            <ChatNameView>
                              <ChatTimeNameWrapper>
                                <ChatText numberofLines={1}>
                                  {item.name}
                                </ChatText>
                               
                                {/* <TimeAgoTV>{formatDistance(new Date(new Date(item.created).getFullYear(), new Date(item.created).getMonth(), new Date(item.created).getDate()),
                                  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                                 )}</TimeAgoTV> */}

                              </ChatTimeNameWrapper>
                              <ChatMessage color={colors.black} fontWeight={500}>
                                {item.message}
                              </ChatMessage>

                            </ChatNameView>
                          </ChatWrapper>
                          
                        </ChatMainView>
                      </TouchableOpacity>
                    );
                  }}
                />
            }
          </ParentWrapper>
      }
    </MainView>


  );
};

export default withTheme(Messages);

type TextProps = {
  color: string;
  fontWeight: string;
};

const TimeAgoTV = styled.Text`
color:#C7C7C7;
`;

const ChatMessage = styled.Text<TextProps>`
  color: ${({ color }: any) => color};
  font-weight: ${({ fontWeight }: any) => fontWeight};
`;

const ChatTimeNameWrapper = styled.View`
  flex-direction:row;
  width: 70%;
  justify-content: space-between;
`;

const ChatText = styled.Text`
  color: black;
  font-size: ${({ theme }: any) => theme.fontSize.cardDate}px;
  font-weight: 500;
  width:100%`;

const ChatNameView = styled.View`
  justify-content: space-between;
  margin-left: 16px;
`;

const ChatMainView = styled.View`
padding-right:25px;
border-color:#C7C7C7;
border-top-width:0.5px;
border-bottom-width:0.5px;
`;
const ProfileImageCont = styled.View`
  background-color:#9AD3F4;
  padding:4px;
  border-radius:50px;
  width:42px;
  height:42px;
`;
const ProfileImage = styled.Image`
  width: 34px;
  height: 34px;
  border:2px solid #ffffff;
  border-radius: 25px;
`;
const ChatWrapper = styled.View`
  flex-direction: row;
  margin-right: 16px;
  padding: 10px;
`;

const ImageView = styled.Image``;

const styles = StyleSheet.create({
  shadowBottonContainerStyle: {    //<--- Style without elevation
    borderWidth: 0,
    borderRadius: 20,
    borderColor: '#fff',
    borderBottomWidth: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

})

const SearchWrapper = styled.View`
  width: auto;
  margin: 16px;
  border-radius: 20px;
  border-width: 1px;
  padding-left: 20px;
  padding-right:10px;
  height:40px;
  border:none;
  justify-content: space-between;
  align-items:center;
  flex-direction: row;
  background-color:#ffffff
`;

const ParentWrapper = styled.View`
  width: auto;
  height: auto`
  ;

const MainView = styled.View`
background-color:#FFFFFF
height:100%;`;

function moment(arg0: string) {
  throw new Error("Function not implemented.");
}

