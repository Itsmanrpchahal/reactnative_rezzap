import React from "react";
import { MainWrapper } from "../utils/globalStyle";
import { withTheme } from "styled-components";
// @ts-ignore
import styled  from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import PieChart from "react-native-pie-chart";
import {  ScrollView } from "react-native";

function Wheel(item:any) {
  const { colors }: any = useTheme();
  const widthAndHeight = 200;
  const data = ['1','1','1']
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#4F4998", "#4CAD62", "#1E6DB6", "#FB8F1D", "#FF9800"];
  return (
    <MainWrapper>
      <ChartView>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={item.item.map((li:any) => parseInt(li['percentage']))}
          sliceColor={item.item.map((li:any) => li['color'])}
          doughnut={true}
          coverRadius={0.45}
          coverFill={"#FFFFFF"}
        />

        <ScrollView>
          {
            item.item.map((item:any) => (
              <ValueView>
                <BoxView backgroundColor={item.color} />
                <ValuetText>{item.category_name}</ValuetText>
              </ValueView>

            ))
          }
        </ScrollView>


      </ChartView>


    </MainWrapper>
  );
}

export default withTheme(Wheel);

type DrawerWrapperProps = {
  backgroundColor: string;
};

const ValuetText = styled.Text<DrawerWrapperProps>`
  color : #000000;
  margin-left: 16px;
  font-size: ${({theme}: any) => theme.fontSize.cardTitle}px;
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
  margin: 16px;
  flex-direction: row;
 
`;
