import React, { useEffect } from "react";
import { MainParentWrapper, MainWrapper, NotFound } from "@root/utils/globalStyle";
// @ts-ignore
import styled from "styled-components/native";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { FlatList, ScrollView, Text } from "react-native";
import { withTheme } from "styled-components";
import PieChart from "react-native-pie-chart";
import AppLoader from "../../../../components/Loader";
import { MainWrapperWhite } from "../../../../utils/globalStyle";


function MyWheel(props: any) {
  const isFocused = useIsFocused();
  const { getMyGraph } = useActions();
  const { myGraphData, loading } = useTypedSelector((state) => state.myGraph);
  const series = [123]
  const sliceColor = ['#F44336']


  const { colors }: any = useTheme();
  const widthAndHeight = 200;

  useEffect(() => {
    if (isFocused) {
      getMyGraph();
    }
  }, [isFocused]);

  return (

    <MainWrapperWhite>

      {loading ? (
        <AppLoader/>
      ) : <ChildWrapperOuter>
        <ChartView>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={ myGraphData && Object.keys(myGraphData).length > 0 ? myGraphData.data.map((li: any) => parseInt(li["percentage"])):series}
            sliceColor={myGraphData && Object.keys(myGraphData).length > 0 ? myGraphData.data.map((li: any) => li["color"]):sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={"#FFFFFF"}
          />

        </ChartView>


        <Divider backgroundColor={colors.divider} />

        <FlatList
          data={myGraphData.data}
          renderItem={({ item }) => {
            return <ValueView>
              <BoxView backgroundColor={item != null ? item.color : ""} />
              <ValuetText> {item != null ? item.category_name : ""}</ValuetText>
            </ValueView>;
          }}
        />

      </ChildWrapperOuter>}
    </MainWrapperWhite>


  );
}

export default withTheme(MyWheel);


type DrawerWrapperProps = {
  backgroundColor: string;
};

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
  align-content: center;
  justify-content: center;
  background-color: white;
`;
