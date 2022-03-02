import React, { useState } from "react";
import { MainParentWrapper } from "@root/utils/globalStyle";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import { ImageBackground, ScrollView, View } from "react-native";
import { Formik } from "formik";
import TextField from "@root/components/TextField";
import { SIGNUP_SCHEMA } from "./helpers";
import { Dropdown } from "react-native-element-dropdown";
import PrimaryButton from "../../../components/Button";
import { useActions } from "../../../hooks/useActions";
import { useTheme } from "@react-navigation/native";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { LoginInterface, SignUpStep1 } from "../../../store/login/interfaces";
import navigationStrings from "../../../navigation/navigationStrings";
import { store } from "../../../store";

const SignUp = (props: any) => {
  const { colors }: any = useTheme();
  const state = store.getState();
  const { loading } = useTypedSelector(
    state => state.auth,
  );
  const data = [
    { label: "Individual", value: 1 },
    { label: "My Spin", value: 2 },

  ];

  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);

  const handleSignUp = (values: SignUpStep1) => {
    {
      props.navigation.navigate(navigationStrings.SIGNUP_STEP_2,{data:values,props:props})
      // @ts-ignore

    }
  };

  return (

    <ImageBackground
      resizeMode={"stretch"}
      style={{ flex: 1 }}
      source={require("@root/assets/login/login.png")}>
      <ScrollView>
        <MainParentWrapper>

            <Formik
              validationSchema={SIGNUP_SCHEMA}
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                mobile: "",
                social_media: "",
                account_type: "1",
              }}
              onSubmit={values => {
                handleSignUp(values)
              }}>
              {({ setFieldValue, handleSubmit, errors }) => (
                <View>
                  <TextField
                    accessibilityLabel="Firstname"
                    onChangeText={(value: any) => {
                      setFieldValue("first_name", value);
                    }}
                    placeholder="Firstname"
                    keyboardType={"default"}
                    error={errors ? errors.first_name : null}
                  />

                  <TextField
                    accessibilityLabel="Lastname"
                    onChangeText={(value: any) => {
                      setFieldValue("last_name", value);
                    }}
                    placeholder="Lastname"
                    keyboardType={"default"}
                    error={errors ? errors.last_name : null}
                  />

                  <TextField
                    accessibilityLabel="Email"
                    onChangeText={(value: any) => {
                      setFieldValue("email", value);
                    }}
                    placeholder="Email"
                    keyboardType={"email-address"}
                    error={errors ? errors.email : null}
                  />

                  <TextField
                    accessibilityLabel="Password"
                    onChangeText={(value: any) => {
                      setFieldValue("password", value);
                    }}
                    placeholder="Password"
                    keyboardType={"default"}
                    secureTextEntry={true}
                    error={errors ? errors.password : null}
                  />

                  <TextField
                    accessibilityLabel="Mobile"
                    onChangeText={(value: any) => {
                      setFieldValue("mobile", value);
                    }}
                    placeholder="Mobile"
                    keyboardType={"default"}
                  />

                  <TextField
                    accessibilityLabel="REZZAP user Id"
                    onChangeText={(value: any) => {
                      setFieldValue("social_media", value);
                    }}
                    placeholder="REZZAP user Id"
                    keyboardType={"default"}
                    error={errors ? errors.social_media : null}
                  />

                  <Horizontal>
                    <Dropdown
                       style={{ width: "100%",backgroundColor:'#D3D3D3' ,borderRadius:8,padding : 5 }}
                       selectedTextStyle={{color:colors.black}}
                      data={data}
                      search={false}
                      maxHeight={100}
                      labelField="label"
                      valueField="value"
                      placeholder={"Individual"}
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </Horizontal>

                  <ButtonWrapper>
                    <PrimaryButton
                      onPress={handleSubmit}
                      backgroundColor={colors.black}
                      btnText={"Next"}
                      loading={loading}
                    />
                  </ButtonWrapper>

                </View>
              )}
            </Formik>

        </MainParentWrapper>
      </ScrollView>

    </ImageBackground>

  );
};

export default withTheme(SignUp);

const ButtonWrapper = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Horizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }: any) => theme.colors.borderGray};
  border-radius: 8px;
  margin-top: 16px;
`;





