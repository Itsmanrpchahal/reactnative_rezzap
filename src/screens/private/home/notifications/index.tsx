import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { MainParentWrapper } from "@root/utils/globalStyle";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { useIsFocused } from "@react-navigation/native";
import AppLoader from "@root/components/Loader";
import { MainWrapper, MainWrapperWhite } from "@root/utils/globalStyle";
import { useTheme, withTheme } from "styled-components";
import styled from "styled-components/native"
import { imageUrl } from "@root/utils/constants";
import PrimaryButton from '@root/components/Button';

const Notifications = () => {

    const { getNotifications, clear_Notificatins } = useActions();
    const { notificationsData, loading } = useTypedSelector((state) => state.notificationsData);
    const {colors}: any = useTheme();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getNotifications()
        }
    }, [isFocused]);

    return (
        <MainWrapperWhite>
            {
                loading ? (<AppLoader />) :
                    Object.keys(notificationsData).length > 0 ?
                        (
                            <ListView>
                                <FlatList
                                    nestedScrollEnabled={false}
                                    data={notificationsData.data}
                                    horizontal={false}
                                    renderItem={({ item }) => {
                                        return <ItemView>
                                            <ImageView source={{ uri: imageUrl + item.profile_photo }}></ImageView>
                                            <NotificatinText>
                                                {item.notification}
                                            </NotificatinText>
                                        </ItemView>
                                    }}
                                />


                                <ButtonView>
                                <PrimaryButton
                                    onPress={()=> {clear_Notificatins()}}
                                    backgroundColor={colors.black}
                                    btnText={'Clear'}
                                />
                                </ButtonView>
                            </ListView>
                        )
                        :
                        (<Text>No Data Found</Text>)

            }

        </MainWrapperWhite>
    );
}

export default withTheme(Notifications)

const ButtonView = styled.View`
align-items:flex-end;
margin-right:10px;
margin-top:10px;
`;

const ListView = styled.View`
width:auto;
height:auto`;

const NotificatinText = styled.Text`
font-size:16px;
color:#000;
margin-right:16px;
margin-left:8px;
`;

const ImageView = styled.Image`
    height:50px;
    width:50px;
    margin-left:8px;
    border-radius:10px;
`;
const ItemView = styled.View`
flex-direction:row
width:auto;
height:55px;
margin-left:8px;
margin-right:8px;
background:#FFFFFF;
align-items:center;
margin-top:8px;
`;
