import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { Formik } from 'formik';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
// @ts-ignore
import { MainParentWrapper } from '@root/utils/globalStyle';
import TextField from '@root/components/TextField';
import PrimaryButton from '@root/components/Button';
import { FORGOT_SCHEMA, LOGIN_SCHEMA } from './helpers';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import navigationStrings from '@root/navigation/navigationStrings';
import { useActions } from "@root/hooks/useActions";
import { useTheme } from "@react-navigation/native";
import { ForgotInterface, LoginInterface } from "../../../store/login/interfaces";
import AwesomeAlert from 'react-native-awesome-alerts';
import SecondaryButton from '@root/components/ButtonSecondary';

const Login = (props: any) => {
  const [confirm, setConfirm] = useState('Send')
  const [email,setEmail] = useState('')
  const { login, send_Email } = useActions('');
  const { colors }: any = useTheme();
  const { loading, error, isAuthenticated } = useTypedSelector(
    state => state.auth,
  );
  const { sendEmailloading, sendEmailerror, sendEmailData } = useTypedSelector(
    state => state.sendEmailData,
  );
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
  

  }, [error, sendEmailerror]);

  useEffect(() => {
    if (isAuthenticated) {
      props.navigation.replace(navigationStrings.TAB_BAR_HOME);
    }
  }, [isAuthenticated]);

  const handleLogin = (values: LoginInterface) => {
    login(values);
  };

  const handleForgot = async (values: ForgotInterface) => {
    setConfirm('Sending...')
    await send_Email({ email: values.email })
    setEmail(values.email)
    if(sendEmailData.data.status)
    {
      props.navigation.navigate(navigationStrings.RESET_PASSWORD,values)
    }
   
    setShowAlert(false)
  }
  return (
    <ImageBackground
      resizeMode={'stretch'}
      style={{ flex: 1 }}
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
                {({ setFieldValue, handleSubmit, errors }) => (
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
                      <TouchableOpacity onPress={() => { props.navigation.navigate(navigationStrings.SIGNUP) }}>
                        <DontHaveAccountText textColor={colors.greenColor} fontSize={20}> SignUp</DontHaveAccountText>
                      </TouchableOpacity>
                    </SignUpView>
                  </View>
                )}
              </Formik>
            </EmailPasswordWrapper>

            <TouchableOpacity onPress={() => {
              setShowAlert(true)
              setConfirm('Send')
            }}>
              <ForgotWrapper>
                Forgot Password?
              </ForgotWrapper>


            </TouchableOpacity>

          </ChildWrapper>
        </ChildWrapperOuter>
        {
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Forgot Password?"
            message="Please fill out your email. A link to reset password will be sent there."
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            customView={
              <AlertView>
                <Formik
                  validationSchema={FORGOT_SCHEMA}
                  initialValues={{
                    email: '',
                  }}
                  onSubmit={(values) => {
                    handleForgot(values);
                  }}>
                  {({ setFieldValue, handleSubmit, errors }) => (
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

                      <BtnWrapper>

                        <SecondaryButton
                          onPress={() => {
                            setShowAlert(false)
                          }}
                          btnText={'Cancel'}
                          backgroundColor={colors.darkGray}
                        />

                        <SecondaryButton
                          onPress={
                            handleSubmit
                          }
                          btnText={confirm}
                          backgroundColor={colors.greenColor}
                        />
                      </BtnWrapper>

                    </View>

                  )}
                </Formik>

              </AlertView>
            }
            showCancelButton={false}
            showConfirmButton={false}
            cancelText="Cancel"
            confirmText="Confirm"
            confirmButtonColor="#DD6B55"

          />
        }


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

const BtnWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  justify-content:center;
`;

const AlertView = styled.View`
width:100%
margin-top:10px
`;

const ForgotWrapper = styled.Text`
  font-size:16px;
  text-align:center;
  margin-top:16px;
`;

const DontHaveAccountText = styled.Text<DontHaveAccountProps>`
  color: ${({ textColor }: any) => textColor};
  font-size: ${({ fontSize }: any) => fontSize}px;
`;

const SignUpView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${({ theme }: any) => theme.spacing.horizontal}px;
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
  padding-left: ${({ theme }: any) => theme.spacing.horizontal}px;
  padding-right: ${({ theme }: any) => theme.spacing.horizontal}px;
`;

const LoginText = styled.Text`
  font-size: ${({ theme }: any) => theme.fontSize.cardHeading}px;
  color: ${({ theme }: any) => theme.colors.text};
  padding-bottom: 2px;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  text-align: center;
`;
