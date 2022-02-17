import React, {useEffect} from 'react';
import { ImageBackground, TouchableOpacity, View } from "react-native";
import {Formik} from 'formik';
// @ts-ignore
import styled from 'styled-components/native';
import {withTheme} from 'styled-components';
// @ts-ignore
import {MainParentWrapper} from '@root/utils/globalStyle';
import TextField from '@root/components/TextField';
import PrimaryButton from '@root/components/Button';
import {LOGIN_SCHEMA} from './helpers';
import {useTypedSelector} from '@root/hooks/useTypedSelector';
import navigationStrings from '@root/navigation/navigationStrings';
import { useActions } from "@root/hooks/useActions";
import { useTheme } from "@react-navigation/native";
import { LoginInterface } from "../../../store/login/interfaces";

const Login = (props: any) => {
  const { login } = useActions();
  const {colors}: any = useTheme();
  const {loading, error, isAuthenticated} = useTypedSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (error !== null) {
      // @ts-ignore
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      props.navigation.replace(navigationStrings.TAB_BAR_HOME);
    }
  }, [isAuthenticated]);

  const handleLogin = (values: LoginInterface) => {
    login(values);
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      style={{flex: 1}}
      source={require('@root/assets/login/login.png')}>
        <MainParentWrapper>
          <ChildWrapperOuter>
            <ChildWrapper>
              <LoginText>Login</LoginText>
              <EmailPasswordWrapper>
                <Formik
                  validationSchema={LOGIN_SCHEMA}
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  onSubmit={(values) => {
                    handleLogin(values);

                  }}>
                  {({setFieldValue, handleSubmit, errors}) => (
                    <View>
                      <TextField
                        accessibilityLabel="Email"
                        onChangeText={(value: any) => {
                          setFieldValue('email', value);
                        }}
                        placeholder="email"
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        error={errors ? errors.email : null}
                      />
                      <TextField
                        accessibilityLabel="Password"
                        onChangeText={(value: any) => {
                          setFieldValue('password', value);
                        }}
                        placeholder="********"
                        secureTextEntry={true}
                        error={errors ? errors.password : null}
                      />

                      <ButtonWrapper>
                        <PrimaryButton
                          onPress={handleSubmit}
                          backgroundColor={colors.black}
                          btnText={'LOGIN'}
                          loading={loading}
                        />
                      </ButtonWrapper>

                      <SignUpView>

                        <DontHaveAccountText textColor={colors.black} fontSize={16}>Don't have account?</DontHaveAccountText>
                        <TouchableOpacity onPress={() => { props.navigation.navigate(navigationStrings.SIGNUP)}}>
                          <DontHaveAccountText textColor={colors.greenColor} fontSize={20}> SignUp</DontHaveAccountText>
                        </TouchableOpacity>
                      </SignUpView>
                    </View>
                  )}
                </Formik>
              </EmailPasswordWrapper>
            </ChildWrapper>
          </ChildWrapperOuter>
        </MainParentWrapper>


    </ImageBackground>
  );
};

// @ts-ignore
export default withTheme(Login);


type DontHaveAccountProps = {
  textColor: string;
  fontSize: string;
};

const DontHaveAccountText = styled.Text<DontHaveAccountProps>`
  color: ${({textColor}: any) => textColor};
  font-size: ${({fontSize}: any) => fontSize}px;
`;

const SignUpView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${({theme}: any) => theme.spacing.horizontal}px;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  margin-top: 80px;
  align-items: center;
`;

const EmailPasswordWrapper = styled.View`
  margin-top: 80px;
`;
const ChildWrapperOuter = styled.View`
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 100%;
`;
const ChildWrapper = styled.View`
  padding-left: ${({theme}: any) => theme.spacing.horizontal}px;
  padding-right: ${({theme}: any) => theme.spacing.horizontal}px;
`;

const LoginText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardHeading}px;
  color: ${({theme}: any) => theme.colors.text};
  padding-bottom: 2px;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  text-align: center;
`;
