import React, { useEffect, useState } from "react";
import { useTheme, withTheme } from "styled-components";
import styled from 'styled-components/native'
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { MainParentWrapper, MainWrapper, NotFound } from "../../../../utils/globalStyle";
import TextField from '@root/components/TextField';
import PrimaryButton from '@root/components/Button';
import { dp } from "@root/utils/assets";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { Formik } from 'formik';
import { imageUrl } from "@root/utils/constants";
import { FIND_SUPPORTER_SCHEMA } from "./helpers";
import AppLoader from "@root/components/Loader";
import { SearchSupporterInterface } from "@root/store/findSupporter/interface";
import AwesomeAlert from 'react-native-awesome-alerts';
import NavigationStrings from "@root/navigation/navigationStrings";

const AddSupporter = () => {
    const { findSupporter, addSupporter } = useActions();
    const { findSupporterData, loading, error } = useTypedSelector((state) => state.findSupporterData);
    const { addSupporterData, addloading } = useTypedSelector((state) => state.addSupporterData);
    const [search, setSearch] = useState('')
    const { colors }: any = useTheme()
    const [showAlert, setShowAlert] = useState(false);

    const handleSearch = (values: SearchSupporterInterface) => {
        findSupporter(values.keyword)
    };

    return (
        <MainView>
            {
                loading || addloading ? <AppLoader /> : <ChildView>
                    <TitleText>
                        Enter supporter's name to locate user.
                    </TitleText>

                    <Formik
                        validationSchema={FIND_SUPPORTER_SCHEMA}
                        initialValues={{
                            keyword: '',
                        }}
                        onSubmit={(values) => {
                            handleSearch(values)

                        }}>
                        {({ setFieldValue, handleSubmit, errors }) => (
                            <View>
                                <TextField
                                    onChangeText={(value: any) => {

                                        setFieldValue('keyword', value)
                                    }}
                                    placeholder="Search supporter"
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    error={errors ? errors.keyword : null}
                                />

                                <ButtonWrapper>
                                    <PrimaryButton
                                        onPress={handleSubmit}
                                        backgroundColor={colors.black}
                                        btnText={'Search'}
                                    />
                                </ButtonWrapper>
                                {
                                    Object.keys(findSupporterData).length > 0 && findSupporterData.data.length > 0 ?
                                        (<FlatList
                                            nestedScrollEnabled={false}
                                            data={findSupporterData.data}
                                            numColumns={3}
                                            style={{ height: '75%' }}
                                            horizontal={false}
                                            renderItem={({ item }) => {
                                                return (
                                                    <DrawerThreeSection>
                                                        <TouchableOpacity onPress={async () => {
                                                            await addSupporter({ to_user: item.user_id })
                                                        }}>
                                                            <HeaderWrapper>
                                                                <ImageWrapper>
                                                                    {/* <ImageContent source={item != null ? { uri: imageUrl + item.profile_photo } : dp} ></ImageContent> */}
                                                                    <ImageContent source={{ uri: item != null ? imageUrl + item.profile_photo : dp }} />
                                                                </ImageWrapper>
                                                                <UserName numberOfLines={1}>{item.first_name + " " + item.last_name}</UserName>
                                                                <BtnView>
                                                                    <RequestTv >{'Request'}</RequestTv>
                                                                </BtnView>
                                                            </HeaderWrapper>
                                                        </TouchableOpacity>


                                                    </DrawerThreeSection>

                                                );
                                            }}
                                        />) : (<NotFound></NotFound>)

                                }

                            </View>
                        )}
                    </Formik>


                </ChildView>
            }

        </MainView>
    );
}


export default withTheme(AddSupporter)


const OkayText = styled.Text`
width:150px;
height:20px;
color:#fff;
text-align:center;
`;
const AlertView = styled.View`
width:100%
margin-top:10px
`;

const RequestTv = styled.Text`
color:#fff;
`;
const BtnView = styled.View`
border-radius:20px;
background-color:#000;
padding:10px;
`;

const UserName = styled.Text`
padding:5px;
color:#000`;

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

const DrawerThreeSection = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:33.3333%;
  padding-top: 15px;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.View`
  margin-top: 40px;
  align-items: center;
`;

const TitleText = styled.Text`
margin-top:16px;
color:${({ theme }: any) => theme.colors.text};
`;

const ChildView = styled.View`
padding:16px;`

const MainView = styled.View`
width:100%;
height:100%;`;