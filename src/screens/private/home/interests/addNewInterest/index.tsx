import React, {useState} from 'react';
import {withTheme} from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {useTheme} from '@react-navigation/native';
import {INTEREST_SCHEMA} from './helpers';
import {useActions} from '@root/hooks/useActions';
import {useTypedSelector} from '@root/hooks/useTypedSelector';
import {navigationRef} from '../../../../../navigation/RootNavigation';
import {launchImageLibrary} from 'react-native-image-picker';
import AppLoader from '../../../../../components/Loader';

const AddNewInterest = ({props, route}) => {
  const {addNew_Interest, UpdateInterest} = useActions();
  const {myInterestData, interestLoading} = useTypedSelector(
    state => state.interest,
  );
  const [imagePath, setImagePath] = useState<any>('');

  return (
    <MainWrapper>
      {interestLoading && <AppLoader />}
      <ParentWrapper>
        <BorderWrapper>
          <TextWrapper>
            {route.params.item === 'Add' ? 'Add Interest' : 'Edit Interest'}
          </TextWrapper>

          <Formik
            validationSchema={INTEREST_SCHEMA}
            initialValues={{
              title: route.params.item != 'Add' ? route.params.item.title : '',
              url: route.params.item != 'Add' ? route.params.item.url : '',
              image: '',
            }}
            onSubmit={async values => {
              {
                route.params.item != 'Add'
                  ? await UpdateInterest({
                      id: route.params.item.id,
                      title: values.title,
                      url: values.url,
                      is_image: 0,
                    })
                  : await addNew_Interest(values.image);
              }
              navigationRef.current.goBack();
            }}>
            {({setFieldValue, handleSubmit, errors, values}) => (
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

                <TouchableOpacity
                disabled={route.params.item != 'Add' && true}
                  onPress={async () => {
                    const result = await launchImageLibrary({
                      mediaType: 'photo',
                      quality: 0,
                    });
                    var formData = new FormData();
                    let osPath =
                      Platform.OS === 'android'
                        ? result.assets[0].uri
                        : result.assets[0].uri.replace('file://', '');
                    setImagePath(result.assets[0].uri);
                    formData.append('image', {
                      // @ts-ignore
                      uri: osPath,
                      type: 'image/jpeg',
                      name: 'photo.png',
                    });
                    formData.append('title', values.title);
                    formData.append('url', values.url);

                    setFieldValue('image', formData);
                  }}>
                  <ImageBorder>
                    {route.params.item === 'Add' ? (
                      imagePath == '' ? (
                        <ImageText>Add Image</ImageText>
                      ) : (
                        <ImageV source={{uri: imagePath}}></ImageV>
                      )
                    ) : (
                      <ImageV
                        source={{
                          uri:
                            imagePath == ''
                              ? 'https://www.rezzap.com/uploads/group-icon/' +
                                route.params.item.image
                              : imagePath,
                        }}></ImageV>
                    )}
                  </ImageBorder>

                  {imagePath == '' && route.params.item == 'Add' && (
                    <ErrorWrapper>
                      <ErrorWrapper__Text>Image is required</ErrorWrapper__Text>
                    </ErrorWrapper>
                  )}
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSubmit}>
                  <ButtonWrapper>
                    <TextBt>
                      {route.params.item === 'Add'
                        ? 'Add Interest'
                        : interestLoading == true
                        ? route.params.item === 'Add'
                          ? 'Adding'
                          : 'Updating'
                        : 'Update Interest'}
                    </TextBt>
                  </ButtonWrapper>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </BorderWrapper>
      </ParentWrapper>
    </MainWrapper>
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
  border-color: ${({theme}: any) => theme.colors.textGray};
`;

const ImageText = styled.Text`
  text-align: center;
  color: ${({theme}: any) => theme.colors.textGray};
`;

const TextBt = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardTitle};
  color: ${({theme}: any) => theme.colors.white};
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
  background-color: ${({theme}: any) => theme.colors.black};
`;

const TextWrapper = styled.Text`
  color: ${({theme}: any) => theme.colors.black};
  font-size: ${({theme}: any) => theme.fontSize.cardTitle};
  margin-top: 16px;
`;

const BorderWrapper = styled.View`
  justify-content: center;
  border-width: 1px;
  padding: 16px;
  flex-direction: column;
  border-radius: 5px;
  border-color: ${({theme}: any) => theme.colors.textGray};
`;

const ParentWrapper = styled.View`
  height: 100%;
  width: 100%;
  padding: 16px;
  background-color: ${({theme}: any) => theme.colors.white};
`;

const MainWrapper = styled.View``;
