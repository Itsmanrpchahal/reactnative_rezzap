import React, { useEffect } from "react";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import { MainParentWrapper, MainWrapper, NotFound } from "@root/utils/globalStyle";
import { deletei, dummy, edit } from "@root/utils/assets";
import { FlatList, Linking, Text, TouchableOpacity } from "react-native";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { useIsFocused } from "@react-navigation/native";
import AppLoader from "@root/components/Loader";
import { navigationRef } from "@root/navigation/RootNavigation";
import navigationStrings from "@root/navigation/navigationStrings";


const Interest = (props: any) => {
  const isFocused = useIsFocused();
  const { getMyInterest ,deleteMyInterest} = useActions();
  const { myInterestData, interestLoading } = useTypedSelector(
    (state) => state.interest,
  );

  useEffect(() => {
    if (isFocused) {
      getMyInterest();
    }
  }, [isFocused]);


  return (
    <MainWrapper>
      {
        interestLoading ? (
          <AppLoader />
        ) :
          Object.keys(myInterestData).length > 0 ?
            (<FlatList
              nestedScrollEnabled={false}
              data={myInterestData.data}
              horizontal={false}
              renderItem={({ item }) => {
                return (<HorizontalWrapper>
                  <TouchableOpacity style={{ width: '70%' }} onPress={() => {
                    Linking.openURL(item.url);
                  }}>
                    <BorderWrapper>
                      <VerticalDivider />
                      <ImageWrapper source={dummy} />
                      <TitleText>{item.title}</TitleText>
                    </BorderWrapper>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    props.navigation.navigate(navigationStrings.ADDNEWINTEREST,{item:item});
                  }}>
                    <GreenView>
                      <ImageBT source={edit}></ImageBT>
                    </GreenView>
                  </TouchableOpacity>


                  <TouchableOpacity onPress={async () => {
                   await deleteMyInterest( {id:item.id})
                   getMyInterest();
                  }}>
                    <GreenView>
                      <ImageBT source={deletei}></ImageBT>
                    </GreenView>
                  </TouchableOpacity>


                </HorizontalWrapper>);


              }}
            />) :
            (<Text>No Data Found</Text>)
      }

    </MainWrapper>
  );
};

export default withTheme(Interest);

const TitleText = styled.Text`
color:#000;`
const ImageBT = styled.Image`
  width: 20px;
  height: 20px;
  margin: 5px;
`;


const GreenView = styled.View`
  width: 60px;
  height: 60px;
  margin-left: 5px;
  background-color: ${({ theme }: any) => theme.colors.greenColor};
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.Image`
  width: 50px;
  height: 50px;
  margin: 5px;
`;

const VerticalDivider = styled.View`
  height: 55px;
  width: 3px;
  background-color: ${({ theme }: any) => theme.colors.greenColor};
`;

const BorderWrapper = styled.View`
  
  border-width: 1px;
  align-items: center;
  flex-direction: row;
  border-color: ${({ theme }: any) => theme.colors.darkGray};

`;

const HorizontalWrapper = styled.View`
  display: flex;
  padding-right: 25px;
  margin: 5px 16px;
  flex-direction: row;
  align-items: center;

`;

const ParentWrapper = styled.View`
  height: 100%;
  background-color: ${({ theme }: any) => theme.colors.white};`
  ;
