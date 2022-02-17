import React, { useEffect, useState } from "react";
import {  NotFound,MainWrapper } from "@root/utils/globalStyle";
import { withTheme } from "styled-components";
import { FlatList, Text, TextInput, TouchableOpacity } from "react-native";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { demoImage, send } from "@root/utils/assets";
// @ts-ignore
import styled from "styled-components/native";
import { format } from "date-fns";
import { imageUrl } from "@root/utils/constants";
import AppLoader from "../../../components/Loader";

// @ts-ignore
const MessageDetail = ({ props, route }) => {
  const { colors }: any = useTheme();
  const isFocused = useIsFocused();
  const { getMessageDetail ,sendMessage} = useActions();
  const { messageListData, loading } = useTypedSelector((state) => state.messageListData);
  const [message,setMessageTV] = useState('');


  useEffect(() => {
    if (isFocused) {
      getMessageDetail(route.params.id);
    }
  }, [isFocused]);

  return (
    <MainWrapper>
      {
        loading ? (
           <AppLoader/>
          ) :
          <FlatList
            nestedScrollEnabled={true}
            data={messageListData.data}
            numColumns={1}
            inverted={true}
            horizontal={false}

            renderItem={({ item }) => {
              return (
                  <ChatMainView>

                    <ChatWrapper flexDirection= { item.message_type === 'sender' ?'row-reverse' :'row'}>
                      <ProfileImage source={messageListData.user_data && Object.keys(messageListData.user_data).length > 0 ? { uri: item.message_type != 'sender'? imageUrl + messageListData.user_data.profile_photo :imageUrl+ messageListData.supporter_data.profile_photo} : demoImage} />
                      <ChatNameView>
                        <ChatTimeNameWrapper>

                          <ChatText flexDirection={ item.message_type === 'sender' ?'right' :'left'}>
                            {messageListData.user_data && Object.keys(messageListData.user_data).length > 0 ? item.message_type != 'sender'?  messageListData.user_data.first_name : messageListData.supporter_data.first_name :''}
                          </ChatText>

                        </ChatTimeNameWrapper>
                        <ChatMessage flexDirection={ item.message_type === 'sender' ?'right' :'left'}>
                          {item.message}
                        </ChatMessage>
                      </ChatNameView>
                    </ChatWrapper>
                  </ChatMainView>
              );
            }}
          />
      }

      <SendMessageWrapper>

        <SearchWrapper>
          <TextInput placeholder={"Type message"} onChangeText={(mess) => setMessageTV(mess)} value={message}>
          </TextInput>

          <TouchableOpacity onPress={async () => {
              sendMessage({
                'supporter_id': route.params.id,
                'message': message
              })
            setMessageTV('')
          }}>
            <ImageView source={send} />
          </TouchableOpacity>
        </SearchWrapper>
      </SendMessageWrapper>

    </MainWrapper>
  );
};

// @ts-ignore
export default withTheme(MessageDetail);

type TextProps = {
  flexDirection:string
};

const ImageView = styled.Image`
padding: 10px;
`;

const SearchWrapper = styled.View`
  width: 90%;
 margin: 0 16px;
  border-radius: 20px;
  border-width: 1px;
  padding: 10px;
  border-color: ${({ theme }: any) => theme.colors.borderGray};
  justify-content: space-between;
  flex-direction: row;
`;

const SendMessageWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  margin-top: auto;
  `;

const ChatMessage = styled.Text<TextProps>`
  color: ${({ theme }: any) => theme.colors.black};
  text-align:  ${({ flexDirection }: any) => flexDirection};
`;

const ChatTimeNameWrapper = styled.View`
  flex-direction: row;
`;

const ChatText = styled.Text<TextProps>`
  color: black;
  font-size: ${({ theme }: any) => theme.fontSize.cardDate}px;
  font-weight: 500;
text-align:  right;`
;

const ChatNameView = styled.View`
  margin-left: 16px;
`;

const ChatMainView = styled.View`
  width: 100%;
`;

const ProfileImage = styled.Image`
  width: 45px;
  height: 45px;
  margin-left: 16px;
  border-radius: 25px;
`;
const ChatWrapper = styled.View<TextProps>`
  flex-direction:  ${({ flexDirection }: any) => flexDirection};
  padding: 10px;
`;

const ParentWrapper = styled.View`
height: 100%;
  flex-direction: column;
  display: flex;
`;


function alert(arg0: boolean): ((info: { distanceFromEnd: number; }) => void) | null | undefined {
    throw new Error("Function not implemented.");
}

