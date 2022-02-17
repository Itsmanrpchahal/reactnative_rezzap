// @ts-ignore
import React, { useEffect, useState } from "react";
// @ts-ignore
import { FlatList, ScrollView, Text, View } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { withTheme } from "styled-components";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { MainParentWrapper, MainWrapper, NotFound } from "@root/utils/globalStyle";
import { calender, deletei, doc, edit,  pdfwhite, word } from "@root/utils/assets";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { format } from "date-fns";
import AppLoader from "../../../components/Loader";

const Resume = (props: any) => {
  const { colors }: any = useTheme();
  const [viewmore,setViewMore] = useState(false)
  const isFocused = useIsFocused();
  const { getResume } = useActions();
  const { resumeData, loading } = useTypedSelector((state) => state.resumeData);

  useEffect(() => {
    if (isFocused) {
     getResume()
    }
  }, [isFocused]);

  return (
    <MainWrapper>
      {
        loading ? (
          <AppLoader/>
        ) : 
        <ScrollView nestedScrollEnabled={false} style={{width:'100%'}}>
      {loading ? (
          <NotFound>Loading...</NotFound>
        ) :
        Object.keys(resumeData).length > 0 ?
          (resumeData.data.map((item: any) => (
            <ParentWrapper>
              <Divider backgroundColor={colors.greenColor} height={4} />
              <ResumeWrapper>
                <Titletext>
                  {item.name}
                </Titletext>

                <HorizontalWrapper>
                  <HorizontalWrapper>
                    <ImageWrapper source={calender} />
                    <TimeText>{format(new Date(item.created_at), "yyyy-MM-dd")}</TimeText>

                  </HorizontalWrapper>

                  <HorizontalWrapper>
                    <ImageWrapper source={calender} />
                    <TimeText>{format(new Date(item.updated_at), "yyyy-MM-dd")}</TimeText>
                  </HorizontalWrapper>
                </HorizontalWrapper>

              </ResumeWrapper>

              <GreenWrapper>
                <TouchableOpacity onPress={() => {setViewMore(!viewmore)}}>
                  {
                    viewmore === true ? <ViewMore>
                      <EditWrapper>
                        <EditImages source={edit}/>
                        <EditImages source={pdfwhite}/>
                        <EditImages source={word}/>
                        <EditImages source={doc}/>
                        <EditImages source={deletei}/>
                      </EditWrapper>
                      <TimeTextWhite>View less</TimeTextWhite>
                    </ViewMore> :  <TimeTextWhite>View more</TimeTextWhite>
                  }

                </TouchableOpacity>

              </GreenWrapper>

            </ParentWrapper>



          ))) :
          (<Text>No Data Found</Text>)
        }

    </ScrollView>
}
    </MainWrapper>
    

  );
};

export default withTheme(Resume);


type DrawerWrapperProps = {
  backgroundColor: string;
  height: string;
};

const GreenWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 0 15px;
  background-color : ${({ theme }: any) => theme.colors.greenColor};
`;
const EditImages = styled.Image`
 
`;

const EditWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between`
;

const TimeTextWhite = styled.Text`
color: white;
  font-size: ${({ theme }: any) => theme.fontSize.cardDate}px;
  margin-top: 5px;
`;

const ViewMore = styled.View`
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: -20px;
  padding: 15px;
  justify-content: center;
  align-items: center;
  background-color : ${({ theme }: any) => theme.colors.greenColor};
`;


const TimeText = styled.Text`
  color: black;
  margin-left: 5px;
`;
const ImageWrapper = styled.Image`
  margin-top: 2px;
  
`;

const HorizontalWrapper = styled.View`
  margin: 10px;
  justify-content: space-between;
  flex-direction: row;
`;

const Titletext = styled.Text`
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle}px;
  color: black;
`;

const ResumeWrapper = styled.View`
  width: auto;
  height: 120px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Divider = styled.View<DrawerWrapperProps>`
  height: ${({ height }: any) => height}px;
  margin-top: 10px;
  background-color: ${({ backgroundColor }: any) => backgroundColor};
`;

const ParentWrapper = styled.View`
margin-top: 10px;
  margin-left: 16px;
  margin-right: 16px;
`;
