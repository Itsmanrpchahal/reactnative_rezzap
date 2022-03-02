import React, { useEffect, useState } from "react";
import { MainParentWrapper, MainWrapper, NotFound } from "@root/utils/globalStyle";
// @ts-ignore
import styled from "styled-components/native";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { FlatList, ScrollView, Text, TouchableOpacity } from "react-native";
import { withTheme } from "styled-components";
import PieChart from "react-native-pie-chart";
import AppLoader from "@root/components/Loader";
import { MainWrapperWhite } from "@root/utils/globalStyle";
import { filter, support } from "@root/utils/assets";
import Timeline from "../../../../components/timeline";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


function MyWheel(props: any) {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const isFocused = useIsFocused();
  const { getMyGraph, getMyTimeline ,search_Activity} = useActions();
  const { myGraphData, loading } = useTypedSelector((state) => state.myGraph);
  const { timelineData, timelineLoading } = useTypedSelector(
    (state) => state.timeline,
  );
  const series = [123]
  const sliceColor = ['#F44336']


  const { colors }: any = useTheme();
  const widthAndHeight = 200;

  useEffect(() => {
    if (isFocused) {
      getMyGraph();
      getMyTimeline();
    }
  }, [isFocused]);

  return (


    <MainWrapper>


      {loading || timelineLoading ? (
        <AppLoader />
      ) : <ChildWrapperOuter>
        <ChartView>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={myGraphData && Object.keys(myGraphData).length > 0 ? myGraphData.data.map((li: any) => parseInt(li["percentage"])) : series}
            sliceColor={myGraphData && Object.keys(myGraphData).length > 0 ? myGraphData.data.map((li: any) => li["color"]) : sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={"#FFFFFF"}
          />

        </ChartView>


        <Divider backgroundColor={colors.divider} />



        <FilterView>
         
          <Menu
            visible={visible}
            anchor={<Text style={{ fontWeight: '500' }} onPress={showMenu}>Filter by category </Text>}
            onRequestClose={hideMenu}
          >
            <FlatList
              data={myGraphData.data}
              renderItem={({ item }) => {
                return <MenuItem onPress={() => { 
                 setVisible(false)
                  search_Activity({id:item.category_id})
                 }}>{ item != null ? item.category_name : "" }</MenuItem>
              }}
            />


            <MenuDivider />

          </Menu>
        </FilterView>




        {
          timelineLoading ? (
            <NotFound>Loading...</NotFound>
          ) :
            timelineData.data && Object.keys(timelineData.data).length > 0 ?
              (
                <FlatList
                  data={timelineData.data}
                  renderItem={({ item }) => {
                    return <Timeline item={item} />
                  }}
                />

              ) :
              (<Text>No Data Found</Text>)
        }


      </ChildWrapperOuter>}


    </MainWrapper>
  );
}

export default withTheme(MyWheel);


type DrawerWrapperProps = {
  backgroundColor: string;
};
const ImageFilter = styled.Image`
  
`;

const FilterView = styled.View`
flex-direction:row;
justify-content:flex-end;
align-items:flex-end;
padding:5px;`;

const ValuetText = styled.Text<DrawerWrapperProps>`
  color: #000000;
  margin-left: 16px;
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle}px;
`;

const BoxView = styled.View<DrawerWrapperProps>`
  width: 30px;
  height: 30px;
  background-color: ${({ backgroundColor }: any) => backgroundColor};
`;

const ValueView = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-left: 16px;
`;

const ChartView = styled.View`
  align-items: center;
  justify-content: center;
`;

const Divider = styled.View<DrawerWrapperProps>`
  height: 1px;
  margin-top: 20px;
  background-color: ${({ backgroundColor }: any) => backgroundColor};
`;


const ChildWrapperOuter = styled.View`
  width:100%;
  height:100%;
  padding-top:10px;
  margin-bottom: 20px;
  background-color: white;
`;
