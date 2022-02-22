import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { MainWrapperWhite } from "@root/utils/globalStyle";
import { withTheme } from "styled-components";
import styled from "styled-components/native";
import TextField from "../../../../components/TextField";
import { ScrollView } from "react-native-gesture-handler";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import AppLoader from "../../../../components/Loader";
import { Dropdown } from "react-native-element-dropdown";
import { STATES } from "@root/utils/constants";

const AddResume = ({ props, route }) => {
    const { resumeDetail, resume_CategoryList } = useActions();
    const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(1);
    let [series,setSeries] = useState([])
    const { resumeData, loading } = useTypedSelector((state) => state.resumeData);
    const { resumeCData, loadingC } = useTypedSelector((state) => state.resumeCData);
    useEffect( () => {
        Promise.all([
            resumeDetail(route.params.id),
            resume_CategoryList()
        ])
        {
            loadingC ? <AppLoader/> :  
             resumeCData && Object.keys(resumeCData).length > 0 ? resumeCData.data.map((item:any) => (setSeries(item))) :setSeries([])
  
        }
        }, []);
    return (
        <MainWrapperWhite>
           
            {
                loading  ? <AppLoader /> :
                    <ScrollView nestedScrollEnabled={false}>
                        
                        <ResumeView>
                            <TextField accessibilityLabel="Name" defaultValue={resumeData.data.resume_name} />
                            <TextField accessibilityLabel="Email" defaultValue={resumeData.data.resume_email} />
                            <TextField accessibilityLabel="Phone" defaultValue={resumeData.data.resume_phone} />
                            <TextField accessibilityLabel="Resume Profile" defaultValue={resumeData.data.resume_profile} />
                           
                            
                            <Horizontal>
                            
                              <Dropdown
                                    style={{ width: "100%" }}
                                    data={resumeCData && Object.keys(resumeCData).length>0 ? resumeCData.data:series}
                                    search={false}
                                    maxHeight={300}
                                    labelField="cat_name"
                                    valueField="cat_id"
                                    searchPlaceholder={"Search"}
                                    value={resumeCData && Object.keys(resumeCData).length > 0 ? resumeCData.data.map((li: any) => li['cat_name']) : series}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setIsFocus(false)
                                    }}
                                /> 
                            </Horizontal>
                            <Text>Select categories in the order that should appear in the resume.</Text>
                           
                        </ResumeView>
                    </ScrollView>
            }

        </MainWrapperWhite>


    )
}

export default withTheme(AddResume)

const ResumeView = styled.View`
padding:0 16px;
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