// @ts-ignore
import React, { useEffect, useState } from "react";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import { FlatList, TextInput, TouchableOpacity } from "react-native";
import { demoImage, dp, search } from "@root/utils/assets";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { NotFound } from "@root/utils/globalStyle";
import NavigationStrings from "@root/navigation/navigationStrings";
import { imageUrl } from "@root/utils/constants";
import { format } from "date-fns";
import { MainWrapper } from "../../../utils/globalStyle";
import AppLoader from "../../../components/Loader";

const Messages = (props: any) => {
  const isFocused = useIsFocused();
  const { colors }: any = useTheme();
  const { getMessageList,searchSupporter } = useActions();
  const [searcht, setSearch] = useState("");
  const { messageListData, loading } = useTypedSelector((state) => state.messageListData);

  useEffect(() => {
    if (isFocused) {
      getMessageList();

    }
  }, [isFocused]);
  // @ts-ignore
  return (
    <MainWrapper>
      {
        loading ? (
          <AppLoader/>
        ) : 
        <ParentWrapper>
        <SearchWrapper>
          <TextInput placeholder={"Search"} onChangeText={(mess) => setSearch(mess)} >
  
  
          </TextInput>
  
          <TouchableOpacity onPress={() => {
            // searchSupporter(searcht)
          }}>
            <ImageView source={search} />
          </TouchableOpacity>
  
  
        </SearchWrapper>
        <Divider />
        {
          loading ? (
              <NotFound>Loading...</NotFound>
            ) :
            <FlatList
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
                        <ProfileImage source={item != null ? { uri: imageUrl + item.profile_photo } : demoImage} />
                        <ChatNameView>
                          <ChatTimeNameWrapper>
                            <ChatText numberofLines={1}>
                              {item.name}
                            </ChatText>
                            <ChatMessage color={colors.borderGray} fontWeight={100}>
                              {/* { item && Object.keys(item).length> 0 ? format(new Date(item.created), "HH:mm") : ''} */}
                              {/* {format(new Date(item.created), "HH:mm")} */}
                            </ChatMessage>
                          </ChatTimeNameWrapper>
                         
                            <ChatMessage color={colors.black} fontWeight={500}>
                             {item.message}
                          </ChatMessage>
                          <ChatMessage color={colors.darkGray} fontWeight={100}>
                            {item.message}
                          </ChatMessage>
                          {/*}*/}
                        </ChatNameView>
                      </ChatWrapper>
                      <Divider />
                    </ChatMainView>
                  </TouchableOpacity>
                );
              }}
            />
        }
  
  
      </ParentWrapper>
}
    </MainWrapper>

   
  );
};

export default withTheme(Messages);

type TextProps = {
  color: string;
  fontWeight: string;
};

const Divider = styled.View`
  height: 1px;

  background-color: ${({ theme }: any) => theme.colors.borderGray};
`;

const ChatMessage = styled.Text<TextProps>`
  color: ${({ color }: any) => color};
  font-weight: ${({ fontWeight }: any) => fontWeight};
`;

const ChatTimeNameWrapper = styled.View`
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
`;

const ChatText = styled.Text`
  color: black;
  font-size: ${({ theme }: any) => theme.fontSize.cardDate}px;
  font-weight: 500;`;

const ChatNameView = styled.View`
  justify-content: space-between;
  margin-left: 16px;
`;

const ChatMainView = styled.View``;

const ProfileImage = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 25px;
`;
const ChatWrapper = styled.View`
  flex-direction: row;
  margin-right: 16px;
  padding: 10px;
`;

const ImageView = styled.Image``;

const SearchWrapper = styled.View`
  width: auto;
  margin: 16px;
  border-radius: 20px;
  border-width: 1px;
  padding: 10px;
  border-color: ${({ theme }: any) => theme.colors.borderGray};
  justify-content: space-between;
  flex-direction: row;
`;

const ParentWrapper = styled.View`
  width: auto;
  height: auto`
;


function alert(searcht: string): React.ReactNode {
    throw new Error("Function not implemented.");
}

