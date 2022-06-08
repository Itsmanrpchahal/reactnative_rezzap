import React, {useEffect, useState} from 'react';
import {
  Platform,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme, withTheme} from 'styled-components';
import styled from 'styled-components/native';
import {MainWrapperWhite} from '@root/utils/globalStyle';
import TextField from '../../../../components/TextField';
import {Dropdown} from 'react-native-element-dropdown';
import {useActions} from '@root/hooks/useActions';
import {useTypedSelector} from '@root/hooks/useTypedSelector';
import CustomTimePicker from '@root/components/TimePicker';
import {format} from 'date-fns';
import AppLoader from '../../../../components/Loader';
import {ScrollView} from 'react-native-gesture-handler';
import PrimaryButton from '@root/components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {Formik} from 'formik';
import {ADD_ACTIVITY_SCHEMA, ADD_ACTIVITY_SCHEMA1} from './helpers';

const AddActivity = (props: any) => {
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState('');
  const [catv, setCatV] = useState(1);
  const [pdf, setPdf] = useState('');
  const [sound, setSound] = useState('');
  const [word, setWord] = useState('');
  const [category, setCategory] = useState();
  let [series, setSeries] = useState([]);
  var radio_props = [
    {label: 'Image  ', value: 1},
    {label: 'Video  ', value: 2},
    {label: 'Audio ', value: 3},
    {label: 'Text ', value: 4},
    {label: 'Pdf ', value: 5},
    {label: 'Word ', value: 6},
  ];

  var video_props = [
    {label: 'Upload a Video', value: 1},
    {label: 'Youtube/Video Embed link', value: 2},
  ];
  const [imagePath, setImagePath] = useState<any>('');
  const [vedioPath, setVideoPath] = useState<any>('');
  const {colors}: any = useTheme();
  const {addActivity, getActivityCategories} = useActions();
  const [isFocus, setIsFocus] = useState(false);
  const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
  const {activity_categoryData, activity_catloading} = useTypedSelector(
    state => state.activity_categoryData,
  );

  const {mytimelineData, mytimelineLoading} = useTypedSelector(
    state => state.mytimelineData,
  );

  useEffect(() => {
    getActivityCategories();
    {
      activity_catloading ? (
        <AppLoader />
      ) : activity_categoryData &&
        Object.keys(activity_categoryData).length > 0 ? (
        activity_categoryData.data.map((item: any) => setSeries(item))
      ) : (
        setSeries([])
      );
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : null}>
      <MainWrapperWhite>
        {mytimelineLoading || activity_catloading ? (
          <AppLoader />
        ) : (
          <ScrollView>
            <MainView>
              <Formik
                validationSchema={
                  value == 4 || catv == 2
                    ? ADD_ACTIVITY_SCHEMA1
                    : ADD_ACTIVITY_SCHEMA
                }
                enableReinitialize={true}
                initialValues={{
                  title: title,
                  category: category,
                  media_type: value,
                  event_date: format(new Date(), 'yyyy-MM-dd'),
                  content: '',
                }}
                onSubmit={async values => {
                  if (
                    values.media_type == 0 ||
                    values.media_type == 4 ||
                    (values.media_type == 2 && catv == 2)
                  ) {
                    await addActivity(
                      {
                        title: values.title,
                        category: values.category,
                        media_type: catv == 2 ? '4' : values.media_type,
                        event_date: values.event_date,
                        content: values.content,
                      },
                      values.media_type,
                      catv,
                    );
                    props.navigation.pop();
                  } else if (
                    values.media_type == 1 ||
                    values.media_type == 2 ||
                    values.media_type == 3 ||
                    values.media_type == 5 ||
                    values.media_type == 6
                  ) {
                    await addActivity(values.content, values.media_type, catv);
                    props.navigation.pop();
                    // alert(JSON.stringify(values.content));
                  }
                }}>
                {({setFieldValue, handleSubmit, errors, values}) => (
                  <View>
                    <TextField
                      accessibilityLabel="Title"
                      value={values.title}
                      onChangeText={(value: any) => {
                        setTitle(value);
                        setFieldValue('title', value);
                      }}
                      error={errors ? errors.title : null}></TextField>

                    <Hearder>Category</Hearder>

                    <Horizontal>
                      <Dropdown
                        style={{
                          width: '100%',
                          backgroundColor: '#D3D3D3',
                          borderRadius: 8,
                          padding: 5,
                        }}
                        selectedTextStyle={{color: colors.black}}
                        data={
                          activity_categoryData &&
                          Object.keys(activity_categoryData).length > 0
                            ? activity_categoryData.data
                            : series
                        }
                        search={false}
                        maxHeight={300}
                        labelField="title"
                        valueField="title"
                        searchPlaceholder={'Search'}
                        value={category}
                        onChange={item => {
                          setFieldValue('category', item.title);
                          setCategory(item.title);
                        }}
                      />
                    </Horizontal>

                    {errors && (
                      <ErrorWrapper>
                        <ErrorWrapper__Text>
                          {errors.category}
                        </ErrorWrapper__Text>
                      </ErrorWrapper>
                    )}

                    <Hearder>Event Date</Hearder>
                    <TouchableOpacity
                      onPress={() => {
                        {
                          setVisibleTimer(true);
                        }
                      }}>
                      <Horizontal>
                        <TimeText>{values.event_date}</TimeText>
                      </Horizontal>
                    </TouchableOpacity>

                    <CustomTimePicker
                      showDateTimePicker={visibleTimer}
                      handlePickerData={(date: any) => {
                        setFieldValue('event_date', format(date, 'yyyy-MM-dd'));
                      }}
                      setDateTimePicker={setVisibleTimer}
                    />
                    <Hearder>Type</Hearder>

                    <Horizontal>
                      <Dropdown
                        style={{
                          width: '100%',
                          backgroundColor: '#D3D3D3',
                          borderRadius: 8,
                          padding: 5,
                        }}
                        selectedTextStyle={{color: colors.black}}
                        data={radio_props}
                        search={false}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={value}
                        searchPlaceholder={'Search'}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setIsFocus(false);
                          setValue(item.value);
                        }}
                      />
                    </Horizontal>

                    {value === 2 ? (
                      <Horizontal>
                        <Dropdown
                          style={{
                            width: '100%',
                            backgroundColor: '#D3D3D3',
                            borderRadius: 8,
                            padding: 5,
                          }}
                          selectedTextStyle={{color: colors.black}}
                          data={video_props}
                          search={false}
                          maxHeight={100}
                          labelField="label"
                          valueField="value"
                          value={catv}
                          searchPlaceholder={'Search'}
                          placeholder={'Upload a Video'}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setIsFocus(false);
                            setCatV(item.value);
                          }}
                        />
                      </Horizontal>
                    ) : null}

                    {value === 1 ? (
                      <TouchableOpacity
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
                          formData.append('content', {
                            // @ts-ignore
                            uri: osPath,
                            type: 'image/jpeg',
                            name: 'photo.png',
                          });
                          formData.append('title', values.title);
                          formData.append('category', values.category);
                          formData.append('media_type', values.media_type);
                          formData.append('event_date', values.event_date);
                          setFieldValue('content', formData);
                          console.log('REZAAP ====> ', formData);
                        }}>
                        <ImageBorder>
                          {imagePath === '' ? (
                            <ImageText>Add Image</ImageText>
                          ) : (
                            <ImageV source={{uri: imagePath}}></ImageV>
                          )}
                        </ImageBorder>

                        {imagePath == '' && (
                          <ErrorWrapper>
                            <ErrorWrapper__Text>
                              Image is required
                            </ErrorWrapper__Text>
                          </ErrorWrapper>
                        )}
                      </TouchableOpacity>
                    ) : value === 2 && catv === 1 ? (
                      <TouchableOpacity
                        onPress={async () => {
                          const result = await launchImageLibrary({
                            mediaType: 'video',
                            quality: 1,
                          });
                          var formData = new FormData();
                          let osPath =
                            Platform.OS === 'android'
                              ? result.assets[0].uri
                              : result.assets[0].uri.replace('file://', '');
                          setImagePath(result.assets[0].uri);
                          formData.append('content', {
                            // @ts-ignore
                            uri: osPath,
                            type: result.assets[0].type,
                            name: result.assets[0].fileName,
                          });
                          formData.append('title', values.title);
                          formData.append('category', values.category);
                          formData.append('media_type', values.media_type);
                          formData.append('event_date', values.event_date);
                          setFieldValue('content', formData);
                          setVideoPath(result.assets[0].fileName);

                          console.log('REZAAP ====> ', formData);
                        }}>
                        <ImageBorder>
                          <ImageText>
                            {vedioPath ? vedioPath : 'Select Video'}
                          </ImageText>
                        </ImageBorder>
                        {vedioPath == '' && (
                          <ErrorWrapper>
                            <ErrorWrapper__Text>
                              Video is required
                            </ErrorWrapper__Text>
                          </ErrorWrapper>
                        )}
                      </TouchableOpacity>
                    ) : value === 2 && catv === 2 ? (
                      <TextField
                        placeholder="Youtube/Video Embed Link"
                        value={values.content}
                        onChangeText={(value: any) => {
                          setFieldValue('content', value);
                        }}
                        error={errors ? errors.content : null}></TextField>
                    ) : value === 3 ? (
                      <TouchableOpacity
                        onPress={async () => {
                          try {
                            const file = await DocumentPicker.pick({
                              type: [DocumentPicker.types.audio],
                              copyTo: 'documentDirectory',
                            });

                            let name = file[0].name;
                            setSound(name);
                            var formData = new FormData();
                            let osPath =
                              Platform.OS === 'android'
                                ? file[0].uri
                                : file[0].uri.replace('file://', '');

                            formData.append('content', {
                              // @ts-ignore
                              uri: osPath,
                              type: file[0].type,
                              name: file[0].name,
                            });
                            formData.append('title', values.title);
                            formData.append('category', values.category);
                            formData.append('media_type', values.media_type);
                            formData.append('event_date', values.event_date);
                            setFieldValue('content', formData);
                          } catch (error) {
                            if (DocumentPicker.isCancel(error)) {
                              // The user canceled the document picker.
                              alert(JSON.stringify(error));
                            } else {
                              throw error;
                            }
                          }
                        }}>
                        <ImageBorder>
                          <ImageText>
                            {sound ? sound : 'Upload Audio'}
                          </ImageText>
                        </ImageBorder>

                        {sound == '' && (
                          <ErrorWrapper>
                            <ErrorWrapper__Text>
                              Audio is required
                            </ErrorWrapper__Text>
                          </ErrorWrapper>
                        )}
                      </TouchableOpacity>
                    ) : value === 4 ? (
                      <TextField
                        accessibilityLabel="Content"
                        value={values.content}
                        onChangeText={(value: any) => {
                          setFieldValue('content', value);
                        }}
                        error={errors ? errors.content : null}></TextField>
                    ) : value === 5 ? (
                      <TouchableOpacity
                        onPress={async () => {
                          try {
                            const file = await DocumentPicker.pick({
                              type: [DocumentPicker.types.pdf],
                              copyTo: 'documentDirectory',
                            });
                            let name = file[0].name;
                            setPdf(name);
                            var formData = new FormData();
                            let osPath =
                              Platform.OS === 'android'
                                ? file[0].uri
                                : file[0].uri.replace('file://', '');

                            formData.append('content', {
                              // @ts-ignore
                              uri: osPath,
                              type: file[0].type,
                              name: file[0].name,
                            });
                            formData.append('title', values.title);
                            formData.append('category', values.category);
                            formData.append('media_type', values.media_type);
                            formData.append('event_date', values.event_date);
                            setFieldValue('content', formData);
                          } catch (error) {
                            if (DocumentPicker.isCancel(error)) {
                              // The user canceled the document picker.

                              alert(JSON.stringify(error));
                            } else {
                              throw error;
                            }
                          }
                        }}>
                        <ImageBorder>
                          <ImageText>
                            {pdf === '' ? 'Upload PDF' : pdf}
                          </ImageText>
                        </ImageBorder>

                        {pdf == '' && (
                          <ErrorWrapper>
                            <ErrorWrapper__Text>
                              PDF is required
                            </ErrorWrapper__Text>
                          </ErrorWrapper>
                        )}
                      </TouchableOpacity>
                    ) : value === 6 ? (
                      <TouchableOpacity
                        onPress={async () => {
                          try {
                            const file = await DocumentPicker.pick({
                              type: [DocumentPicker.types.doc],
                              copyTo: 'documentDirectory',
                            });

                            let name = file[0].name;
                            setWord(name);
                            var formData = new FormData();
                            let osPath =
                              Platform.OS === 'android'
                                ? file[0].uri
                                : file[0].uri.replace('file://', '');

                            formData.append('content', {
                              // @ts-ignore
                              uri: osPath,
                              type: file[0].type,
                              name: file[0].name,
                            });
                            formData.append('title', values.title);
                            formData.append('category', values.category);
                            formData.append('media_type', values.media_type);
                            formData.append('event_date', values.event_date);
                            setFieldValue('content', formData);
                          } catch (error) {
                            if (DocumentPicker.isCancel(error)) {
                              // The user canceled the document picker.
                              alert(JSON.stringify(error));
                            } else {
                              throw error;
                            }
                          }
                        }}>
                        <ImageBorder>
                          <ImageText>{word ? word : 'Upload Word'}</ImageText>
                        </ImageBorder>

                        {word == '' && (
                          <ErrorWrapper>
                            <ErrorWrapper__Text>
                              Doc is required
                            </ErrorWrapper__Text>
                          </ErrorWrapper>
                        )}
                      </TouchableOpacity>
                    ) : null}

                    <ButtonWrapper>
                      <PrimaryButton
                        onPress={handleSubmit}
                        backgroundColor={colors.black}
                        btnText={'Post Activity'}
                        loading={false}
                      />
                    </ButtonWrapper>
                  </View>
                )}
              </Formik>
            </MainView>
          </ScrollView>
        )}
      </MainWrapperWhite>
    </KeyboardAvoidingView>
  );
};

export default withTheme(AddActivity);

const ImageV = styled.Image`
  width:auto;
  margin:10px
  height:130px;
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
  height: 20px;
`;

const ImageBT = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ErrorWrapper = styled.View`
  margin-top: 3px;
  padding-left: 2px;
`;
const ErrorWrapper__Text = styled.Text`
  color: red;
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

const ImageText = styled.Text`
  text-align: center;
  color: ${({theme}: any) => theme.colors.textGray};
`;

const ImageBorder = styled.View`
  margin-top: 16px;
  border-radius: 5px;
  min-height: 130px;
  border-width: 1px;
  justify-content: center;
  border-color: ${({theme}: any) => theme.colors.textGray};
`;

const ButtonWrapper = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Hearder = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardDate};
  margin-top: 16px;
  color: #000;
`;

const TimeText = styled.Text`
  color: ${({theme}: any) => theme.colors.accentColor};
  padding: 10px 5px;
`;

const Horizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({theme}: any) => theme.colors.borderGray};
  border-radius: 8px;
  margin-top: 16px;
`;

const MainView = styled.View`
  padding: 16px;
`;
