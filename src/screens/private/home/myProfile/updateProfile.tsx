import React, { useState } from "react";
import { useTheme, withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import { camera, demoImage, imageLayout } from "@root/utils/assets";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextField from "@root/components/TextField";
import { Formik } from "formik";
import ImagePicker from "react-native-image-crop-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { useActions } from "@root/hooks/useActions";
// @ts-ignore
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import { accountType, designation, radio_props, STATES, visibilty } from "@root/utils/constants";
import { Dropdown } from "react-native-element-dropdown";
import CustomTimePicker from "@root/components/TimePicker";
import { format } from "date-fns";
import { UPDATEPROFILE_SCHEMA } from "./helpers";
import { UpdateProfileInterface } from "@root/store/updateProfile/interfaces";
import NavigationStrings from "@root/navigation/navigationStrings";
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "react-native/Libraries/NewAppScreen";

const UpdateProfile = (props: any) => {
  const { colors }: any = useTheme();
  const [imagePath, setImagePath] = useState<any>(null);
  const [showalert, setShowAlert] = useState(false);
  const [cancelable, setCancelable] = useState(true)
  const [cancel, setCancel] = useState("Cancel");
  const { uploadProfilePicture, updateMyProfile } = useActions();
  const [isFocus, setIsFocus] = useState(false);
  const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
  const [token,setToken] = useState('');
    const { myProfileData, loading } = useTypedSelector(
    (state) => state.myProfile,
  );
  const [value, setValue] = useState(1);
  const [stime, setSTime] = useState<any>(myProfileData ? myProfileData.data.dob : '');
  const [profiledesgination, setProfileDesgination] = useState(myProfileData ? myProfileData.data.designation.toString() : '')
  const [text, setText] = useState('Update Profile')
  AsyncStorage.getItem('TOKEN').then((asyncStorageRes) => {
    // @ts-ignore
    setToken(asyncStorageRes)
  });

  const saveImage = async (values: any) => {
    if (values === null) {
      console.log("Image path error");

    } else {
      const formData = new FormData();
      console.log('Image' , values)
      let osPath =
        Platform.OS === "android"
          ? values.path
          : values.path.replace("file://", "");

      let data = {
        uri: osPath,
        type: values.mime,
        name: values.filename,
      }

      formData.append("profile_pic", JSON.stringify(data));

   

      // setCancel("Uploading");
      // console.log('formData ====>   ', formData)
      await uploadProfilePicture(formData);

    }
  };

  async function handleUpdate(values: UpdateProfileInterface) {

    setText('Updating')
    await updateMyProfile({
      'first_name': values.first_name,
      'last_name': values.last_name,
      'mobile': values.mobile,
      'address': values.address,
      'street': values.street,
      'state': values.state,
      'gender': values.gender,
      'visibility': values.visibility,
      'highschool': values.highschool,
      'college': values.college,
      'degree': values.degree,
      'designation': values.designation,
      'account_type': values.account_type,
      'dob': values.dob,
    })

    props.navigation.navigate(NavigationStrings.TAB_BAR_HOME)
  }

  // @ts-ignore
  return (

    <ScrollView >
      <ParentWrapper>
        <TouchableOpacity onPress={() => {
          ImagePicker.openPicker({
            cropping: true,
            compressImageQuality: 1,

          }).then(async (image) => {
            setImagePath(image);
            await saveImage(image);

          });
        }}>
          <ImageWrapper>
            <ImageView source={imageLayout} />
            <ImageBottom
              source={{
                uri:
                  imagePath !== null
                    ? imagePath.path
                    : '',
              }} />
            <ImageCamera source={camera} />
          </ImageWrapper>
        </TouchableOpacity>


        {/* customView={
              <TabHorizontal>
                <HorizotalCol>
                  <TouchableOpacity
                    onPress={() => {
                      ImagePicker.openCamera({

                        cropping: true,
                        compressImageQuality: 1,
                      }).then((image) => {
                        setImagePath(image);
                      });
                    }}>
                    <Tabs>
                      <ImageBT>
                        <AddImage
                          source={camera} />


                        <TabsText>Camera</TabsText>
                      </ImageBT>
                    </Tabs>
                  </TouchableOpacity>
                </HorizotalCol>

                <HorizotalCol>
                  <TouchableOpacity
                    onPress={() => {
                      ImagePicker.openPicker({
                        cropping: true,
                        compressImageQuality: 1,

                      }).then(async (image) => {
                        setImagePath(image);
                        await saveImage(image);

                      });
                    }}>
                    <Tabs
                    >
                      <ImageBT>
                        <AddImage
                          source={camera} />


                        <TabsText>Gallery</TabsText>
                      </ImageBT>
                    </Tabs>
                  </TouchableOpacity>
                </HorizotalCol>
              </TabHorizontal>
            } */}


        <Formik
          validationSchema={UPDATEPROFILE_SCHEMA}
          initialValues={{
            first_name: myProfileData ? myProfileData.data.first_name : "",
            last_name: myProfileData ? myProfileData.data.last_name : "",
            mobile: myProfileData ? myProfileData.data.mobile : "",
            address: myProfileData ? myProfileData.data.address : "",
            street: myProfileData ? myProfileData.data.street : "",
            highschool: myProfileData ? myProfileData.data.highschool : "",
            state: myProfileData ? myProfileData.data.state : "",
            visibility: myProfileData ? myProfileData.data.visibility : "",
            college: myProfileData ? myProfileData.data.college : "",
            degree: myProfileData ? myProfileData.data.degree : "",
            designation: myProfileData ? myProfileData.data.account_type : '',
            account_type: myProfileData ? myProfileData.data.account_type : '',
            dob: myProfileData ? myProfileData.data.dob : "",
            gender: myProfileData ? myProfileData.data.gender : '',
          }}
          onSubmit={(values) => {
            handleUpdate(values);
          }}>
          {({ setFieldValue, handleSubmit, errors, values }) => (
            <View>
              <TextField
                accessibilityLabel={'Firstname'}
                onChangeText={(value: any) => {
                  setFieldValue("first_name", value);
                }}
                placeholder="Firstname"
                keyboardType={"default"}
                value={values.first_name}
                autoCapitalize={"none"}
                error={errors ? errors.first_name : null}
              />

              <TextField
                accessibilityLabel={'Lastname'}
                onChangeText={(value: any) => {
                  setFieldValue("last_name", value);
                }}
                placeholder="Lastname"
                keyboardType={"default"}
                value={values.last_name}
                autoCapitalize={"none"}
                error={errors ? errors.last_name : null}
              />


              <TextField
                accessibilityLabel={'Mobile'}
                onChangeText={(value: any) => {
                  setFieldValue("mobile", value);
                }}
                placeholder="Mobile"
                keyboardType={"numeric"}
                value={values.mobile}
                autoCapitalize={"none"}
                error={errors ? errors.mobile : null}
              />

              <TextField
                accessibilityLabel={'Address'}
                onChangeText={(value: any) => {
                  setFieldValue("address", value);
                }}
                placeholder="Address"
                keyboardType={"default"}
                value={values.address}
                autoCapitalize={"none"}
                error={errors ? errors.address : null}
              />

              <TextField
                accessibilityLabel={'Street'}
                onChangeText={(value: any) => {
                  setFieldValue("street", value);
                }}
                placeholder="Street"
                keyboardType={"default"}
                value={values.street}
                autoCapitalize={"none"}
                error={errors ? errors.street : null}
              />
              <Genderhearder>
                State
              </Genderhearder>
              <Horizontal>
                <Dropdown
                   style={{ width: "100%",backgroundColor:'#D3D3D3' ,borderRadius:8,padding : 5 }}
                   selectedTextStyle={{color:colors.black}}
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
                    setFieldValue("state", item.value);

                    setIsFocus(false);
                  }}
                />
              </Horizontal>
              <Genderhearder>
                Visibilty
              </Genderhearder>

              <Horizontal>
                <Dropdown
                  style={{ width: "100%",backgroundColor:'#D3D3D3' ,borderRadius:8,padding : 5 }}
                  selectedTextStyle={{color:colors.black}}
                  data={visibilty}
                  search={false}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  placeholder={myProfileData ? myProfileData.data.visibility === "0" ? "Public" : "Private" : ''}
                  value={myProfileData ? myProfileData.data.visibility : ''}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setFieldValue("visibility", value);
                    setIsFocus(false);
                  }}
                />
              </Horizontal>

              <TextField
                accessibilityLabel={'HighSchool'}
                onChangeText={(value: any) => {
                  setFieldValue("highschool", value);
                }}
                placeholder="HighSchool"
                keyboardType={"default"}
                value={values.highschool}
                autoCapitalize={"none"}
                error={errors ? errors.highschool : null}
              />

              <TextField
                accessibilityLabel={'College'}
                onChangeText={(value: any) => {
                  setFieldValue("college", value);
                }}
                placeholder="College"
                keyboardType={"default"}
                value={values.college}
                autoCapitalize={"none"}
                error={errors ? errors.college : null}
              />

              <TextField
                accessibilityLabel={'Degree'}
                onChangeText={(value: any) => {
                  setFieldValue("degree", value);
                }}
                placeholder="Degree"
                keyboardType={"default"}
                value={values.degree}
                autoCapitalize={"none"}
                error={errors ? errors.degree : null}
              />

              <Genderhearder>
                Designation
              </Genderhearder>

              <Horizontal>
                <Dropdown
                   style={{ width: "100%",backgroundColor:'#D3D3D3' ,borderRadius:8,padding : 5 }}
                   selectedTextStyle={{color:colors.black}}
                  data={designation}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  searchPlaceholder={"Search"}
                  placeholder={profiledesgination === "0" ? 'Student' : profiledesgination === '1' ? 'Parent' : profiledesgination === "2" ? 'College Counselor' : profiledesgination === '3' ? 'Admissions - College' : profiledesgination === '4' ? 'Recruiter' : profiledesgination === '5' ? 'Company' : 'Coach'}
                  value={profiledesgination}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(true)}
                  onChange={item => {
                    setFieldValue("designation", item.value);
                    setIsFocus(false);
                  }}
                />
              </Horizontal>

              <Genderhearder>
                Account Type
              </Genderhearder>
              <Horizontal>
                <Dropdown
                  style={{ width: "100%",backgroundColor:'#D3D3D3' ,borderRadius:8,padding : 5 }}
                  selectedTextStyle={{color:colors.black}}
                  data={accountType}
                  search={false}
                  maxHeight={100}
                  labelField="label"
                  valueField="value"
                  placeholder={myProfileData ? myProfileData.data.account_type === "1" ? "Individual" : 'My Spin' : ''}
                  value={myProfileData ? myProfileData.data.account_type : ''}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setFieldValue('account_type', item.value)
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </Horizontal>


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
                  initial={myProfileData ? parseInt(myProfileData.data.gender) - 1 : ''}
                  formHorizontal={true}
                  buttonColor={"#000000"}
                  animation={true}
                  onPress={(value) => { // @ts-ignore
                    setFieldValue("gender", value);

                  }}
                />

              </RadioWrapper>
              <TouchableOpacity onPress={handleSubmit}>
                <ButtonWrapper>
                  <TextBt> {text} </TextBt>
                </ButtonWrapper>
              </TouchableOpacity>
            </View>
          )}
        </Formik>


      </ParentWrapper>

      <AwesomeAlert
        show={showalert}
        showProgress={false}
        title="Alert"
        message="Are you sure to delete this?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={cancelable}

        cancelText="Cancel"

        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert(false)
        }}

      />
    </ScrollView>
  );
};

export default withTheme(UpdateProfile);

const TextBt = styled.Text`
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
  color: ${({ theme }: any) => theme.colors.white};
  padding: 10px;
  text-align: center;
`;

const ButtonWrapper = styled.View`

  align-items: center;
  width: 90%;
  margin: 40px 16px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${({ theme }: any) => theme.colors.black};
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

const Genderhearder = styled.Text`
  font-size: ${({ theme }: any) => theme.fontSize.cardDate};
  margin-top: 16px;
  color:#000;
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



const ImageCamera = styled.Image`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
`;



const ImageView = styled.Image`
  width: 200px;
  height: 200px;`;

const ImageBottom = styled.Image`
    position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 80px;
`;

const ImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 188px;
  height: 188px;
  margin-top: 15px;
`;


const ParentWrapper = styled.View`
  width: 100%;
  padding: 16px 16px;
  background-color: ${({ theme }: any) => theme.colors.white};
  justify-content: center;
  align-items:center`
  ;