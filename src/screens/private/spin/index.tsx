// @ts-ignore
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity } from "react-native";
import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import { MainParentWrapper, NotFound } from "@root/utils/globalStyle";
import SecondaryButton from '@root/components/ButtonSecondary';
import { useIsFocused, useTheme } from "@react-navigation/native";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import PieChart from "react-native-pie-chart";
import { MainWrapper } from "../../../utils/globalStyle";
import AppLoader from "../../../components/Loader";

const Spin = (props: any) => {
  const { colors }: any = useTheme();
  const [tab, setTab] = useState(1)
  const { getSpin ,setFollowUnfollow} = useActions();
  const widthAndHeight = 120

  const [btnColor, setBtnColor] = useState(false);
  const { spinData, loading } = useTypedSelector(
    (state) => state.spinData,
  );
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      tab === 1 ?
        getSpin('all') :
        getSpin('my')


    }
  }, [isFocused]);

  return (
    <MainWrapper>

      <BtnWrapper>
        <FilterText>Filter</FilterText>
        <SecondaryButton
          onPress={() => {
            setTab(1), getSpin('all')
          }}
          btnText={'All Spin'}
          backgroundColor={tab === 1 ? colors.greenColor : colors.darkGray}
        />
        <SecondaryButton
          onPress={() => {
            setTab(2), getSpin('my')
          }}
          btnText={'My Spin'}
          backgroundColor={tab === 2 ? colors.greenColor : colors.darkGray}
        />
      </BtnWrapper>
      {
        loading ? (
          <AppLoader />
        ) :
          <MainParentWrapper>
            <ChildWrapper>



              {
                loading ? (
                  <NotFound>Loading...</NotFound>
                ) :
                  Object.keys(spinData).length > 0 ?
                    (<FlatList
                      numColumns={2}
                      data={spinData.data}
                      renderItem={({ item }) => {
                        return <TheSpinCont>
                          <TheSpinInfograph>
                            <PieChart
                              widthAndHeight={widthAndHeight}
                              series={item.graph_list.map((li: any) => parseInt(li['percentage']))}
                              sliceColor={item.graph_list.map((li: any) => li['color'])}
                              doughnut={true}
                              coverRadius={0.45}
                              coverFill={'#FFFFFF'}
                            />
                          </TheSpinInfograph>
                          <TheSpinTitle numberOfLines={1}>{item.name} </TheSpinTitle>
                          <TheSpinDesc>{spinData != null ? item.visibility === '0' ? 'Student' : item.visibility === '1' ? 'Parent' : item.visibility === '2' ? 'College Counselor' : item.visibility === '3' ? 'Admissions - College' : item.visibility === '4' ? 'Recruiter' : item.visibility === '5' ? 'Company' : item.visibility === '5' ? 'Company' : '' : ''} </TheSpinDesc>
                          <TouchableOpacity onPress={async () => {
                            // @ts-ignore
                            setBtnColor(!btnColor)
                           await setFollowUnfollow({supporter_id:item.user_id,
                              status_type:item.is_follow === 0 ? '1' : '0'})

                              {tab === 1 ?  getSpin('all') :  getSpin('my')}
                          }}>
                            <TheSpinBtn backgroundColor={item.is_follow === 1 ? colors.greenColor : colors.divider}> {item.is_follow === 1 ? "Following" : "Follow"}</TheSpinBtn>
                          </TouchableOpacity>

                        </TheSpinCont>
                      }}
                    />) :
                    (<Text>No Data Found</Text>)
              }
            </ChildWrapper>
          </MainParentWrapper>
      }


    </MainWrapper>



  );
};

export default withTheme(Spin);


type BtnBackground = {
  backgroundColor: string;

};

const TheSpinCont = styled.View`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  width: 47%;
  margin-top: 10px;
  margin-left: 5px;
  
`;
const TheSpinInfograph = styled.View`
  padding: 15px;
  text-align: center;
  flex-direction: row;
  justify-content: center;
`;
const TheSpinTitle = styled.Text`
  font-size: 18px;
  color:${({ theme }: any) => theme.colors.black} ;
  margin-top: 10px;
  padding: 0 10px;
`;
const TheSpinDesc = styled.Text`
  font-size: 14px;
  color:  ${({ theme }: any) => theme.colors.black} ;
  margin-bottom: 10px;
  padding: 0 10px;
`;
const TheSpinBtn = styled.Text<BtnBackground>`
  background-color: ${({ backgroundColor }: any) => backgroundColor};
  font-size: 14px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  padding: 5px 10px;
`;

const FilterText = styled.Text`
  color: ${({ theme }: any) => theme.colors.black};
  font-size: ${({ theme }: any) => theme.fontSize.cardDate}px;
  margin-right: 5px;
`;

const BtnWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  justify-content:center;
`;

const ChildWrapper = styled.View`
  width: 100%;
`;


