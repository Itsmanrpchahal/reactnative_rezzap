import React, { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme, withTheme } from "styled-components";
import { MainWrapper } from "@root/utils/globalStyle";
import styled from "styled-components/native";
import { Dropdown } from "react-native-element-dropdown";
import { bookmark, dp, searchwhite, closewhite } from "@root/utils/assets";
import { NotFound } from "@root/utils/globalStyle";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import AppLoader from "@root/components/Loader";
import { useIsFocused } from "@react-navigation/native";


const Dash = () => {
    const isFocused = useIsFocused();
    const { colors }: any = useTheme();
    const { getCollegeStates, getCollegeList, getDreamCollegeList, getAllCollege, search_StateSchool, search_CollegeKeyword } = useActions();
    const { collegeStateData, loading } = useTypedSelector((state) => state.collegeStateData);
    const { collegeListData, collegeloading } = useTypedSelector((state) => state.collegeListData);
    const { allcollegeData, allCollegeloading } = useTypedSelector((state) => state.allcollegeData);
    const { dreamCollegeData, dreamloading } = useTypedSelector((state) => state.dreamCollegeData);
    const [searcht, setSearch] = useState("");
    let [states, setStates] = useState([])
    let [state, setState] = useState('')
    let [school_type, setSchoolType] = useState('')
    const [dreamValue, setDreamValue] = useState({});
    const [isFocus, setIsFocus] = useState(false);
    const [showDream, setShowDream] = useState(0);

    useEffect(() => {
        if (isFocused) {
            getCollegeStates()
            getCollegeList()
            getDreamCollegeList()
            getAllCollege()
        }

    }, [isFocused]);
    return (
        <MainWrapper>

            <SearchWrapper>
                <TextInput style={{ color: '#000000' }} placeholder={"Search"} onChangeText={(mess) => setSearch(mess)}>
                </TextInput>
                {
                    searcht === '' ? <TouchableOpacity onPress={() => {
                        getAllCollege()
                    }}>
                        <ImageView source={closewhite} />
                    </TouchableOpacity> : <TouchableOpacity onPress={() => {
                        search_CollegeKeyword({ keyword: searcht })
                    }}>
                        <ImageView source={searchwhite} />
                    </TouchableOpacity>
                }



            </SearchWrapper>

            {
                loading || collegeloading || dreamloading ? <AppLoader /> : <ChildView>

                    <DropDownView>
                        <Horizontal>
                            <Dropdown
                                style={{ width: "100%",backgroundColor:'#D3D3D3' ,padding : 5 }}
                                selectedTextStyle={{color:colors.black}}
                                data={collegeStateData && Object.keys(collegeStateData).length > 0 ? collegeStateData.data : states}
                                search={false}
                                maxHeight={300}
                                labelField="state"
                                searchPlaceholder={"Search"}
                                value={'state'}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setState(item.state)
                                    setIsFocus(false);
                                    search_StateSchool({
                                        state: item.state,
                                        school_type: school_type
                                    })

                                }} valueField={"state"} />
                        </Horizontal>

                        <Horizontal>
                            <Dropdown
                                 style={{ width: "100%",backgroundColor:'#D3D3D3' ,padding : 5 }}
                                 selectedTextStyle={{color:colors.black}}
                                data={collegeListData && Object.keys(collegeListData).length > 0 ? collegeListData.data : states}
                                search={false}
                                maxHeight={300}
                                labelField="school_type"
                                valueField="school_type"
                                searchPlaceholder={"Search"}
                                value={'school_type'}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setSchoolType(item.school_type)
                                    setIsFocus(false)
                                    search_StateSchool({
                                        state: state,
                                        school_type: item.school_type
                                    })
                                }}
                            />
                        </Horizontal>
                    </DropDownView>

                    <DropView>
                        <Dropdown
                             style={{ width: "100%",backgroundColor:'#D3D3D3',padding : 5 }}
                             selectedTextStyle={{color:colors.black}}
                            data={dreamCollegeData && Object.keys(dreamCollegeData).length > 0 ? dreamCollegeData.data : states}
                            search={false}
                            maxHeight={300}
                            labelField="college_name"
                            valueField="college_name"
                            searchPlaceholder={"Search"}
                            value={'college_name'}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setIsFocus(false)
                                setDreamValue(item)
                                setShowDream(1)
                            }}
                        />
                    </DropView>

                </ChildView>
            }


            {
                loading || collegeloading || dreamloading || allCollegeloading ? <AppLoader /> : allcollegeData && Object.keys(allcollegeData).length > 0 ?
                    <FlatList
                        nestedScrollEnabled={false}
                        data={allcollegeData.data}
                        horizontal={false}
                        style={{ height: '72%' }}
                        renderItem={({ item, index }) => {
                            return (
                                <CollegeItem>
                                    <CollegeView backgroundColor={colors.blue}>
                                        <CollegeTitle color={colors.white}>
                                            {item.college_name}
                                        </CollegeTitle>
                                        <ImageWrapper source={bookmark} />

                                    </CollegeView>

                                    <CollegeView backgroundColor={colors.white}>
                                        <CollegeTitle color={colors.black}>
                                            Acceptance rate %
                                        </CollegeTitle>

                                        <MathView backgroundColor={colors.black}>
                                            {item.acceptance_rate}
                                        </MathView>
                                    </CollegeView>
                                    <Divider />

                                    <CollegeView backgroundColor={colors.white}>
                                        <CollegeTitle color={colors.black}>
                                            Avg GPA
                                        </CollegeTitle>

                                        <MathView backgroundColor={colors.black}>
                                            {item.avg_gpa}
                                        </MathView>
                                    </CollegeView>
                                    <Divider />


                                    <CollegeView backgroundColor={colors.white}>
                                        <CollegeTitle color={colors.black}>
                                            SAT Math
                                        </CollegeTitle>

                                        <MathView backgroundColor={colors.black}>
                                            {item.sat_math}
                                        </MathView>
                                    </CollegeView>
                                    <Divider />

                                    <CollegeView backgroundColor={colors.white}>
                                        <CollegeTitle color={colors.black}>
                                            SAT Critical
                                        </CollegeTitle>

                                        <MathView backgroundColor={colors.black}>
                                            {item.sat_critical}
                                        </MathView>
                                    </CollegeView>
                                    <Divider />


                                    <CollegeView backgroundColor={colors.white}>
                                        <CollegeTitle color={colors.black}>
                                            AAT Composite
                                        </CollegeTitle>

                                        <MathView backgroundColor={colors.black}>
                                            {item.act_composite}
                                        </MathView>
                                    </CollegeView>
                                </CollegeItem>
                            )
                        }}
                    >
                    </FlatList> : <NotFound>No search record found!</NotFound>
            }

        </MainWrapper>
    );
}

export default withTheme(Dash)

type TextProps = {
    backgroundColor: string;
}

type DrawerWrapperProps = {
    backgroundColor: string;
};

type TitleProps = {
    color: string;
}
const Divider = styled.View`
  height: 2px;
  background-color: ${({ theme }: any) => theme.colors.borderGray};
`;

const MathView = styled.Text<TextProps>`
    width:20%;
    color:#FFFFFF
    text-align:center;
    padding:5px;
    background-color:${({ backgroundColor }: any) => backgroundColor};
`;

const ImageWrapper = styled.Image`
  margin-top: 2px;
  margin-right:10px;
`;

const CollegeTitle = styled.Text<TitleProps>`
color:${({ color }: any) => color}`;

const CollegeView = styled.View<DrawerWrapperProps>`
padding:5px;
flex-direction:row;
align-items:center;
justify-content:space-between;
background-color: ${({ backgroundColor }: any) => backgroundColor};
`;
const CollegeItem = styled.View`
margin-top:10px
padding:10px;`;

const ChildView = styled.View`
margin: 0 10px`
const ImageView = styled.Image``;

const DropView = styled.View`
width:100%;
align-items: center;
background-color: ${({ theme }: any) => theme.colors.borderGray};
margin-top: 16px;
`;

const Horizontal = styled.View`
display: flex;
width:48%;
flex-direction: row;
align-items: center;
background-color: ${({ theme }: any) => theme.colors.borderGray};
margin-top: 16px;
`;

const DropDownView = styled.View`
flex-direction:row;
justify-content:space-between`;

const SearchWrapper = styled.View`
  width: auto;
  margin: 16px;
  padding-left: 15px;
  padding-right: 15px;
    height:40px;
  background-color: ${({ theme }: any) => theme.colors.darkGray};
  justify-content: space-between;
  align-items:center;
  flex-direction: row;
`;

