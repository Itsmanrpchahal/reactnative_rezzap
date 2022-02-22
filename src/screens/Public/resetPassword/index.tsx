import React from "react";
import { useTheme, withTheme } from "styled-components";
import { MainWrapper } from "../../../utils/globalStyle";
import { ImageBackground, ScrollView, Text, View } from 'react-native'
import styled from "styled-components/native";
import { Formik } from "formik";
import { FORGOT_SCHEMA, RESET_PASSWORD_SCHEMA } from "../login/helpers";
import TextField from "../../../components/TextField";
import PrimaryButton from '@root/components/Button';


const ResetPassword = ({ props, route }) => {
    const { colors }: any = useTheme();
    return (
        <ImageBackground
            resizeMode={'stretch'}
            style={{ flex: 1 }}
            source={require('@root/assets/login/login.png')}>

            <ScrollView>
                <ResetView>
                    <Formik
                        validationSchema={RESET_PASSWORD_SCHEMA}
                        initialValues={{
                            email: route.params.email,
                            otp: '',
                            password: ''
                        }}
                        onSubmit={(values) => {
                                alert(JSON.stringify(values))
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
                                    error={errors ? errors.email : null}
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
                                        btnText={'Reset'}
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

const ResetView = styled.View`
    height:90%;
    width:auto;
    padding:16px;
`;