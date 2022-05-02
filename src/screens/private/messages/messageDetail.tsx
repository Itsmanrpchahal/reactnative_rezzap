import React, { useEffect, useState } from "react";
import { withTheme } from "styled-components";
import { FlatList,  Keyboard, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { demoImage, send } from "@root/utils/assets";
// @ts-ignore
import styled from "styled-components/native";
import { imageUrl } from "@root/utils/constants";
import AppLoader from "../../../components/Loader";

// @ts-ignore
const MessageDetail = ({ props, route }) => {
  const { colors }: any = useTheme();
  const isFocused = useIsFocused();
  const { getMessageDetail, sendMessage } = useActions();
  const { messageListData, loading } = useTypedSelector((state) => state.messageListData);
  const [message, setMessageTV] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const showSubscription = Keyboard.addListener('keyboardDidShow', e => setKeyboardHeight(e.endCoordinates.height));
  const hideSubscription = Keyboard.addListener('keyboardWillHide', () => setKeyboardHeight(0));

  useEffect(() => {
    if (isFocused) {
      getMessageDetail(route.params.id);
    }
  }, [isFocused]);

  useEffect(()=>{
    showSubscription.remove();
    hideSubscription.remove();
  },[keyboardHeight])

  return (
    
      <ParentWrapper>
        {
          loading ? (
            <AppLoader />
          ) :

            <FlatList
              nestedScrollEnabled={true}
              data={messageListData.data}
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              inverted={true}
              horizontal={false}

              renderItem={({ item }) => {
                return (
                  <ChatMainView>

                    <ChatWrapper flexDirection={item.message_type === 'sender' ? 'row-reverse' : 'row'}>
                      <ProfileImage source={messageListData.user_data && Object.keys(messageListData.user_data).length > 0 ? { uri: item.message_type != 'sender' ? imageUrl + messageListData.user_data.profile_photo : imageUrl + messageListData.supporter_data.profile_photo } : demoImage} />
                      <ChatNameView>
                        <ChatTimeNameWrapper>

                          <ChatText flexDirection={item.message_type === 'sender' ? 'right' : 'left'}>
                            {messageListData.user_data && Object.keys(messageListData.user_data).length > 0 ? item.message_type != 'sender' ? messageListData.user_data.first_name : messageListData.supporter_data.first_name : ''}
                          </ChatText>
                          {/* {
                    item.message_type !== 'sender' && <TimeAgoTV>{formatDistance(new Date(new Date(messageListData.user_data.created).getFullYear(), new Date(messageListData.user_data.created).getMonth(), new Date(messageListData.user_data.created).getDate()),
                      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                     )}</TimeAgoTV>
                  } */}

                        </ChatTimeNameWrapper>
                        <ChatMessage flexDirection={item.message_type === 'sender' ? 'right' : 'left'}>
                          {item.message}
                        </ChatMessage>
                      </ChatNameView>
                    </ChatWrapper>
                  </ChatMainView>
                );
              }}
            />
        }
        
        <SendMessageWrapper marginBottom={keyboardHeight}>
          <ProfileImage source={demoImage} />
          <SearchWrapper style={[styles.shadowBottonContainerStyle]}>
            <TextInput style={{ color: colors.black, padding: 10 }} placeholder={"Type message"} onChangeText={(mess) => setMessageTV(mess)} value={message}>
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


      </ParentWrapper >
   
  );
};
// @ts-ignore
export default withTheme(MessageDetail);

type TextProps = {
  flexDirection: string
};

type KeyboardProps ={
  marginBottom:number
}

const ImageView = styled.Image`
padding: 10px;
`;

const SearchWrapper = styled.View`
  width: 75%;
 margin: 0 16px;
  border-radius: 20px;
  border-width: 1px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
  align-items:center;
  flex-direction: row;
  background-color:#fff;
`;

const SendMessageWrapper = styled.View<KeyboardProps>`
  flex-direction: row;
  margin-bottom:${({ marginBottom }: any) => marginBottom}px;
  margin-top: auto;
  padding-bottom:16px;
  `;

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
const TimeAgoTV = styled.Text`
color:#C7C7C7;
width:70%;
text-align:right;
`;

const ChatNameView = styled.View`
  margin-left: 16px;
`;

const ChatMainView = styled.View`
  width: 100%;
  padding-right:10px;
`;

const ProfileImage = styled.Image`
  width: 45px;
  height: 45px;
  margin-left: 16px;
  border-radius: 25px;
`;
const ChatWrapper = styled.View<TextProps>`
  flex-direction:  ${({ flexDirection }: any) => flexDirection};
  padding: 10px 0;
`;

const ParentWrapper = styled.View`
height: 100%;
  flex-direction: column;
  display: flex;
  background-color:#F1F4F6;
`;

