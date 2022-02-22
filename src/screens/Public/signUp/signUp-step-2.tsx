import React, { useState } from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { withTheme } from "styled-components";
import { MainParentWrapper } from "@root/utils/globalStyle";
// @ts-ignore
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import { Formik } from "formik";
// @ts-ignore
import styled from "styled-components/native";
import TextField from "@root/components/TextField";
import { Dropdown } from "react-native-element-dropdown";
import { STATES } from "@root/utils/constants";
import CustomTimePicker from "@root/components/TimePicker";
import { format } from "date-fns";
import PrimaryButton from "@root/components/Button";
import { StackActions, useNavigation, useTheme } from "@react-navigation/native";
import { SignUpInterface } from "@root/store/login/interfaces";
import { useActions } from "@root/hooks/useActions";
import  {navigationRef}  from "../../../navigation/RootNavigation";
import navigationStrings from "../../../navigation/navigationStrings";

var radio_props = [
  { label: "Male  ", value: 1 },
  { label: "Female  ", value: 2 },
  { label: "Other", value: 3 },
];
// @ts-ignore
const SignUpStep2 = ({ props,route }) => {
  const { signUp } = useActions();
  const { colors }: any = useTheme();
  const [value, setValue] = useState(1);
  const [isFocus, setIsFocus] = useState(false);
  const [sigup,setSignUp] = useState('SignUp')
  const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
  const [stime, setSTime] = useState<any>(new Date());
  const nav  = useNavigation()

  const handleSignUp = async (values: SignUpInterface) => {
    {
      setSignUp('loading...')
      await signUp({
        'first_name' :values.first_name,
        'last_name' :values.last_name,
        'email' :values.email,
        'password' :values.password,
        'mobile' :values.mobile,
        'account_type' :values.account_type,
        'social_media' :values.social_media,
        'address' :values.address,
        'street':values.street,
        'city' :values.city,
        'state' :values.state,
        'zip' :values.zip,
        'dob' : values.dob,
        'gender': values.gender})

         navigationRef.current.dispatch(StackActions.replace(navigationStrings.LOGIN))
    }
  };

  // @ts-ignore
  return (
    <ImageBackground
      resizeMode={"stretch"}
      style={{ flex: 1 }}
      source={require("@root/assets/login/login.png")}>

      <ScrollView>
        <MainParentWrapper>
          <Formik
            initialValues={{
              address: "",
              street: "",
              city: "",
              state: "",
              zip: "",
              dob: "",
              gender: "",
            }}
            onSubmit={values => {
              handleSignUp(values);
            }}>
            {({ setFieldValue, handleSubmit, errors }) => (
              <View>
                <TextField
                  accessibilityLabel="Address"
                  onChangeText={(value: any) => {
                    setFieldValue("address", value);
                  }}
                  placeholder="Address (Optional)"
                  keyboardType={"default"}

                />

                <TextField
                  accessibilityLabel="Street"
                  onChangeText={(value: any) => {
                    setFieldValue("street", value);
                  }}
                  placeholder="Street (Optional)"
                  keyboardType={"default"}

                />

                <TextField
                  accessibilityLabel="City"
                  onChangeText={(value: any) => {
                    setFieldValue("city", value);
                  }}
                  placeholder="City (Optional)"
                  keyboardType={"default"}

                />

                <Genderhearder>
                  State
                </Genderhearder>

                <Horizontal>
                  <Dropdown
                    style={{ width: "100%" }}
                    data={STATES}
                    search={true}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    searchPlaceholder={"Search"}
                    placeholder={"Alabama"}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setFieldValue("state", value);
                      setIsFocus(false);
                    }}
                  />
                </Horizontal>

                <TextField
                  accessibilityLabel="Zipcode"
                  onChangeText={(value: any) => {
                    setFieldValue("zip", value);
                  }}
                  placeholder="Zipcode (Optional)"
                  keyboardType={"default"}

                />

                <Genderhearder>
                  Date of birth
                </Genderhearder>

                <TouchableOpacity
                  onPress={() => {
                    {
                      setVisibleTimer(true);
                    }
                  }}>
                  <Horizontal>
                    <TimeText>
                      {format(new Date(stime), "yyyy-MM-dd")}
                    </TimeText>
                  </Horizontal>
                </TouchableOpacity>


                <CustomTimePicker
                  showDateTimePicker={visibleTimer}
                  handlePickerData={(date: any) => {
                    setSTime(date);
                    setFieldValue("dob", format(new Date(date), "yyyy-MM-dd"));
                    setFieldValue("first_name", route.params.data.first_name);
                    setFieldValue("last_name", route.params.data.last_name);
                    setFieldValue("email", route.params.data.email);
                    setFieldValue("email", route.params.data.email);
                    setFieldValue("password", route.params.data.password);
                    setFieldValue("mobile", route.params.data.mobile);
                    setFieldValue("account_type", route.params.data.account_type);
                    setFieldValue("social_media", route.params.data.social_media);
                  }
                  }
                  setDateTimePicker={setVisibleTimer}
                />

                <Genderhearder>
                  Gender
                </Genderhearder>
                <RadioWrapper>
                  <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    buttonColor={"#000000"}
                    animation={true}
                    onPress={(value) => { // @ts-ignore
                      setFieldValue("gender", value);
                    }}
                  />

                </RadioWrapper>

                <ButtonWrapper>
                  <PrimaryButton
                    onPress={handleSubmit}
                    backgroundColor={colors.black}
                    btnText={sigup}

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

// @ts-ignore
export default withTheme(SignUpStep2);


const ButtonWrapper = styled.View`
  margin-top: 40px;
  align-items: center;
`;

const Genderhearder = styled.Text`
  font-size: ${({ theme }: any) => theme.fontSize.cardDate};
  margin-top: 16px;
`;
const RadioWrapper = styled.View`
  margin-top: 16px;
  justify-content: center;
  align-items: center;
`;
const TimeText = styled.Text`
  color: ${({ theme }: any) => theme.colors.accentColor};
  padding: 10px 5px;
`;

const Horizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 20px;
  border-width: 1px;
  border-color: ${({ theme }: any) => theme.colors.borderGray};
  border-radius: 8px;
  margin-top: 16px;
`;

const AddressTextField = styled.Text`
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle}px;
  color: black;
  margin-top: 16px;
`;


