import React, { useState } from "react";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import TextField from "@root/components/TextField";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useTheme } from "@react-navigation/native";
import { INTEREST_SCHEMA } from "./helpers";
import ImagePicker from "react-native-image-crop-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import { camera, demoImage } from "@root/utils/assets";
import Snackbar from "react-native-snackbar";
import { useActions } from "@root/hooks/useActions";
import RNFetchBlob from 'rn-fetch-blob';
import {apiUri} from '@root/service/apiEndPoints';
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { navigationRef } from "../../../../../navigation/RootNavigation";

const AddNewInterest = ({ props, route }) => {
  const { colors }: any = useTheme();
  const {addNew_Interest,UpdateInterest } = useActions();
  const { myInterestData, interestLoading } = useTypedSelector(
    (state) => state.interest,
  );
  const [showalert, setShowAlert] = useState(false);
  const [imagePath, setImagePath] = useState<any>('');
  const [title,setTitle]=useState('')
  const [uri,setUri]=useState('')

  const saveImage = async (values: any) => {
    if (imagePath === null) {
      console.log("Image path error");
      setShowAlert(false)
    } else {
      const formData = new FormData();
let osPath =
        Platform.OS === "ios"
          ? imagePath.path
          : imagePath.path.replace("file://", "");

      formData.append("image", {
        // @ts-ignore

        uri: osPath,
        type: imagePath.mime,
        name: imagePath.filename,
      });
    
       await addNew_Interest({title : values.title,
        url : values.url,
       },formData)
      setShowAlert(false);
    }
  };

  return (
    <ParentWrapper>
      <BorderWrapper>
        <TextWrapper>
          {
            route.params.item === 'Add' ? 'Add Interest' : 'Edit Interest'
          }
        </TextWrapper>
       
        <Formik
          validationSchema={INTEREST_SCHEMA}
          initialValues={{
            title: route.params.item != 'Add' ? route.params.item.title : '',
            url: route.params.item != 'Add' ? route.params.item.url : '',
          }}
          onSubmit={async (values) => {
            
            {imagePath=== null ? Snackbar.show({
              text: 'Upload Image to continue',
              duration: Snackbar.LENGTH_SHORT,
            }) :  await UpdateInterest({id : route.params.item.id,
              title: values.title,
              url:values.url,
              is_image:0
            })
            navigationRef.current.goBack();
          }
            
             
          }}>
          {({ setFieldValue, handleSubmit, errors, values }) => (
            <View>
              <TextField
                onChangeText={(value: any) => {
                  setFieldValue('title', value);
                }}
                placeholder="Interest Title"
                keyboardType={'default'}
                autoCapitalize={'none'}
                value={values.title}
                error={errors ? errors.title : null}
              />
              <TextField
                onChangeText={(value: any) => {
                  setFieldValue('url', value);
                }}
                placeholder="URL (http://abc.com)"
                keyboardType={'default'}
                autoCapitalize={'none'}
                value={values.url}
                error={errors ? errors.url : null}
              />

              <TouchableOpacity onPress={() => { setShowAlert(true) }}>
                <ImageBorder>
                  {route.params.item === 'Add' ? <ImageText>Add Image</ImageText> : <ImageV source={{
                    uri: 'https://www.rezzap.com/uploads/group-icon/'+route.params.item.image,
                  }}></ImageV>}

                </ImageBorder>

                {
                  showalert && <AwesomeAlert
                    show={showalert}
                    showProgress={false}
                    title="Select Photo"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    cancelText={'Cancel'}
                    customView={
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
                                setImagePath(image)

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
                    }
                    cancelButtonColor={"#DD6B55"}
                    onCancelPressed={() => {
                      setShowAlert(false);
                    }}
                  />
                }
              </TouchableOpacity>


              <TouchableOpacity onPress={handleSubmit}>
                <ButtonWrapper>
                  <TextBt> {
                    route.params.item === 'Add' ? 'Add Interest' :  interestLoading == true ? 'Updating' : 'Update Interest'
                  }</TextBt>
                </ButtonWrapper>
              </TouchableOpacity>


            </View>
          )}
        </Formik>
      </BorderWrapper>
    </ParentWrapper>
  );
};

export default withTheme(AddNewInterest);

const ErrorWrapper = styled.View`
  margin-top: 3px;
  padding-left: 2px;
`;
const ErrorWrapper__Text = styled.Text`
  color: red;
`;

const TabsText = styled.Text`
  padding-left: 12px;
  color: #ffffff;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -0.41px;
`;

const AddImage = styled.Image`
  width: 20px;
  height: 20px`;

const ImageBT = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Tabs = styled.View`
  padding-left: 2px;
  padding-right: 2px;
  margin: 5px;
  height: 50px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #28303d;
`;

const HorizotalCol = styled.View`
  width: 48%;
`;

const TabHorizontal = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ImageV = styled.Image`
  width:auto;
  margin:10px
  height:130px;
 `;

const ImageBorder = styled.View`
  margin-top: 16px;
  border-radius: 5px;
  min-height: 130px;
  border-width: 1px;
  justify-content: center;
  border-color: ${({ theme }: any) => theme.colors.textGray};
`;


const ImageText = styled.Text`
  text-align: center;
  color: ${({ theme }: any) => theme.colors.textGray};
`;

const TextBt = styled.Text`
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
  color: ${({ theme }: any) => theme.colors.white};
  text-align: center;
`;

const ButtonWrapper = styled.View`
  margin-top: 40px;
  align-items: center;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${({ theme }: any) => theme.colors.black};
`;

const TextWrapper = styled.Text`
  color: ${({ theme }: any) => theme.colors.black};
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
  margin-top: 16px;
`;

const BorderWrapper = styled.View`
  justify-content: center;
  border-width: 1px;
  padding: 16px;
  flex-direction: column;
  border-radius: 5px;
  border-color: ${({ theme }: any) => theme.colors.textGray};

`;

const ParentWrapper = styled.View`
  height: 100%;
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }: any) => theme.colors.white};`
  ;
