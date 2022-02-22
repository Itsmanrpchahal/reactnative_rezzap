import React, { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useTheme, withTheme } from "styled-components";
import styled from "styled-components/native";
import { MainWrapperWhite } from "@root/utils/globalStyle";
import TextField from "../../../../components/TextField";
import { Dropdown } from "react-native-element-dropdown";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import CustomTimePicker from "@root/components/TimePicker";
import { format } from "date-fns";
import AppLoader from "../../../../components/Loader";
import { ScrollView } from "react-native-gesture-handler";
import PrimaryButton from "@root/components/Button";
import AwesomeAlert from "react-native-awesome-alerts";
import ImagePicker from "react-native-image-crop-picker";
import { camera } from "@root/utils/assets";
import DocumentPicker from "react-native-document-picker"

const AddActivity = () => {
    const [value, setValue] = useState(null);
    const [catv, setCatV] = useState(1);
    const [showalert, setShowAlert] = useState(false);
    const [catValue, setCatValue] = useState();
    let [series, setSeries] = useState([])
    var radio_props = [
        { label: "Image  ", value: 1 },
        { label: "Video  ", value: 2 },
        { label: "Audio ", value: 3 },
        { label: "Text ", value: 4 },
        { label: "Pdf ", value: 5 },
        { label: "Word ", value: 6 }
    ];

    var video_props = [
        { label: "Upload a Video", value: 1 },
        { label: "Youtube/Vieo Embed link", value: 2 }
    ];
    const [imagePath, setImagePath] = useState<any>('');
    const [vedioPath, setVideoPath] = useState<any>('Upload Video')
    const { colors }: any = useTheme();
    const { getMyGraph } = useActions();
    const [isFocus, setIsFocus] = useState(false);
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const [stime, setSTime] = useState<any>(new Date());
    const { myGraphData, loading } = useTypedSelector((state) => state.myGraph);

    useEffect(() => {
        getMyGraph();
        {
            loading ? <AppLoader /> :
                myGraphData && Object.keys(myGraphData).length > 0 ? myGraphData.data.map((item: any) => (setSeries(item))) : setSeries([])

        }
    }
        , []);

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


            setShowAlert(false);
        }
    };
    return (
        <MainWrapperWhite>
            {
                loading ? <AppLoader /> :
                    <ScrollView>
                        <MainView>

                            <TextField accessibilityLabel="Title">

                            </TextField>


                            <Hearder>Category</Hearder>
                            <Horizontal>
                                <Dropdown
                                    style={{ width: "100%" }}
                                    data={myGraphData && Object.keys(myGraphData).length > 0 ? myGraphData.data : series}
                                    search={false}
                                    maxHeight={300}
                                    labelField="category_name"
                                    valueField="cat_id"
                                    searchPlaceholder={"Search"}
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setIsFocus(false)
                                        setCatValue(item.value)
                                    }}
                                />
                            </Horizontal>

                            <Hearder>Event Date</Hearder>
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
                                }
                                }
                                setDateTimePicker={setVisibleTimer}
                            />

                            <Hearder>Type</Hearder>

                            <Horizontal>
                                <Dropdown
                                    style={{ width: "100%" }}
                                    data={radio_props}
                                    search={false}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={value}
                                    searchPlaceholder={"Search"}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setIsFocus(false);
                                        setValue(item.value)
                                    }}
                                />
                            </Horizontal>

                            {
                                value === 2 ? <Horizontal>

                                    <Dropdown
                                        style={{ width: "100%" }}
                                        data={video_props}
                                        search={false}
                                        maxHeight={100}
                                        labelField="label"
                                        valueField="value"
                                        value={catv}
                                        searchPlaceholder={"Search"}
                                        placeholder={'Upload a Video'}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setIsFocus(false);
                                            setCatV(item.value)
                                        }}
                                    />
                                </Horizontal> : <Text></Text>
                            }


                            {
                                value === 1 ? <TouchableOpacity onPress={() => { setShowAlert(true) }}>
                                    <ImageBorder>
                                        {imagePath === '' ? <ImageText>Add Image</ImageText> : <ImageV source={{ uri: imagePath.path }}></ImageV>}
                                    </ImageBorder>
                                </TouchableOpacity> :
                                    value === 2 && catv === 1 ? <TouchableOpacity onPress={() => {
                                        ImagePicker.openPicker({
                                            mediaType: "video",

                                        }).then(async (image) => {
                                            setVideoPath(image.path)
                                        });
                                    }}>
                                        <ImageBorder>
                                            {imagePath === '' ? <ImageText>{vedioPath}</ImageText> : <ImageV source={{ uri: imagePath.path }}></ImageV>}
                                        </ImageBorder>
                                    </TouchableOpacity> :

                                        value === 2 && catv === 2 ?
                                            <TextField placeholder="Youtube/Vimeo Embed Link"></TextField> :

                                            value === 3 ?
                                                <TouchableOpacity onPress={() => {
                                                    selectAudio('audio')
                                                }}>
                                                    <ImageBorder>
                                                        {imagePath === '' ? <ImageText>Upload Audio</ImageText> : <ImageV source={{ uri: imagePath.path }}></ImageV>}
                                                    </ImageBorder>
                                                </TouchableOpacity> :

                                                value === 4 ? <TextField accessibilityLabel="Content" placeholder="Content"></TextField> :

                                                    value === 5 ? <TouchableOpacity onPress={() => { selectPdf('Pdf') }}>
                                                        <ImageBorder>
                                                            {imagePath === '' ? <ImageText>Upload PDF</ImageText> : <ImageV source={{ uri: imagePath.path }}></ImageV>}
                                                        </ImageBorder>
                                                    </TouchableOpacity> :

                                                        value === 6 ? <TouchableOpacity onPress={() => { selectWord('word') }}>
                                                            <ImageBorder>
                                                                {imagePath === '' ? <ImageText>Upload Word</ImageText> : <ImageV source={{ uri: imagePath.path }}></ImageV>}
                                                            </ImageBorder>
                                                        </TouchableOpacity> :
                                                            <Text>Else</Text>
                            }

                            <ButtonWrapper>
                                <PrimaryButton
                                    onPress={() => { }}
                                    backgroundColor={colors.black}
                                    btnText={"Post Activity"}
                                    loading={loading}
                                />
                            </ButtonWrapper>

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
                                                            setShowAlert(false)
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
                                                            setShowAlert(false)

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
                        </MainView>
                    </ScrollView>


            }
        </MainWrapperWhite>


    )
}

export default withTheme(AddActivity)

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

const ImageText = styled.Text`
  text-align: center;
  color: ${({ theme }: any) => theme.colors.textGray};
`;

const ImageBorder = styled.View`
  margin-top: 16px;
  border-radius: 5px;
  min-height: 130px;
  border-width: 1px;
  justify-content: center;
  border-color: ${({ theme }: any) => theme.colors.textGray};
`;

const ButtonWrapper = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Hearder = styled.Text`
  font-size: ${({ theme }: any) => theme.fontSize.cardDate};
  margin-top: 16px;
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

const MainView = styled.View`
padding:16px;
`;

async function selectAudio(type: string) {
    try {
        const file = await DocumentPicker.pick({

            type: [DocumentPicker.types.audio],
            copyTo: 'documentDirectory',
        });

        alert(JSON.stringify(file))
    } catch (error) {
        if (DocumentPicker.isCancel(error)) {
            // The user canceled the document picker.
            alert(JSON.stringify(error))
        } else {
            throw error;
        }
    }
}

async function selectPdf(type: string) {
    try {
        const file = await DocumentPicker.pick({

            type: [DocumentPicker.types.pdf],
            copyTo: 'documentDirectory',
        });

        alert(JSON.stringify(file))
    } catch (error) {
        if (DocumentPicker.isCancel(error)) {
            // The user canceled the document picker.
            alert(JSON.stringify(error))
        } else {
            throw error;
        }
    }
}



async function selectWord(type: string) {
    try {
        const file = await DocumentPicker.pick({

            type: [DocumentPicker.types.doc],
            copyTo: 'documentDirectory',
        });

        alert(JSON.stringify(file))
    } catch (error) {
        if (DocumentPicker.isCancel(error)) {
            // The user canceled the document picker.
            alert(JSON.stringify(error))
        } else {
            throw error;
        }
    }
}