import React, { useEffect, useState } from "react";
import { useTheme, withTheme } from "styled-components";
import { MainWrapper } from "../../../utils/globalStyle";
import { ImageBackground, ScrollView, Text, View } from 'react-native'
import styled from "styled-components/native";
import { Formik } from "formik";
import { FORGOT_SCHEMA, RESET_PASSWORD_SCHEMA } from "../login/helpers";
import TextField from "../../../components/TextField";
import PrimaryButton from '@root/components/Button';
import { useActions } from "@root/hooks/useActions";
import { navigationRef } from "../../../navigation/RootNavigation";
import navigationStrings from "../../../navigation/navigationStrings";
import { StackActions } from "@react-navigation/native";
import { useTypedSelector } from '@root/hooks/useTypedSelector';


const ResetPassword = ({ props, route }) => {
    const [confirm, setConfirm] = useState('Reset')
    const { colors }: any = useTheme();
    const { reset_Password } = useActions();
    const { sendEmailloading, sendEmailerror, sendEmailData } = useTypedSelector(
        state => state.sendEmailData,
    );

    useEffect(() => {

        if (sendEmailerror !== null) {

        }

    }, [sendEmailerror]);
    return (
        <ImageBackground
            resizeMode={'stretch'}
            style={{ flex: 1 }}
            source={require('@root/assets/login/login.png')}>

            <ScrollView>
                <ResetView>

                    <ForgotText>
                        Please check your email. A link for reset password has been sent.
                    </ForgotText>
                    <Formik
                        validationSchema={RESET_PASSWORD_SCHEMA}
                        initialValues={{
                            email: route.params.email,
                            otp: '',
                            password: ''
                        }}
                        onSubmit={async (values) => {
                            setConfirm('Loading...')
                            await reset_Password({
                                email: values.email,
                                otp: values.otp,
                                password: values.password
                            })
                            setConfirm('Try again')
                            navigationRef.current.dispatch(StackActions.replace(navigationStrings.LOGIN))
                        }}>
                        {({ setFieldValue, handleSubmit, errors }) => (
                            <View>
                                <TextField
                                    accessibilityLabel="Email"
                                    onChangeText={(value: any) => {
                                        setFieldValue('email', value);
                                    }}
                                    editable={false}
                                    defaultValue={route.params.email}
                                    placeholder="email"
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}

                                />

                                <TextField
                                    accessibilityLabel="OTP"
                                    onChangeText={(value: any) => {
                                        setFieldValue('otp', value);
                                    }}
                                    placeholder="OTP"
                                    keyboardType={'numeric'}
                                    autoCapitalize={'none'}
                                    error={errors ? errors.otp : null}
                                />

                                <TextField
                                    accessibilityLabel="Password"
                                    onChangeText={(value: any) => {
                                        setFieldValue('password', value);
                                    }}
                                    placeholder="Password"
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    secureTextEntry={true}
                                    error={errors ? errors.password : null}
                                />

                                <ButtonWrapper>
                                    <PrimaryButton
                                        onPress={handleSubmit}
                                        backgroundColor={colors.black}
                                        btnText={confirm}
                                    />
                                </ButtonWrapper>

                            </View>

                        )}
                    </Formik>
                </ResetView>
            </ScrollView>


        </ImageBackground>

    );
}

export default withTheme(ResetPassword)

const ButtonWrapper = styled.View`
  margin-top: 80px;
  align-items: center;
`;

const ForgotText = styled.Text`
    color:#000;
    text-align:center;
`;
const ResetView = styled.View`
    height:90%;
    width:auto;
    padding:16px;
`;