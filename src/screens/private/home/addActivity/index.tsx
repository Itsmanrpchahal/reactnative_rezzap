import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { withTheme } from "styled-components";
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

const AddActivity = () => {
    const [value, setValue] = useState(null);
    const [catValue, setCatValue] = useState();
    let [series, setSeries] = useState([])
    var radio_props = [
        { label: "Image  ", value: 1 },
        { label: "Text  ", value: 2 },
        { label: "Word ", value: 3 },
        { label: "Video ", value: 4 },
        { label: "Pdf ", value: 5 },
        { label: "Audio ", value: 6 }
    ];
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

                            <Horizontal>
                                <Dropdown
                                    style={{ width: "100%" }}
                                    data={radio_props}
                                    search={true}
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

                            <Horizontal>

                            </Horizontal>
                        </MainView>
                    </ScrollView>


            }
        </MainWrapperWhite>


    )
}

export default withTheme(AddActivity)

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