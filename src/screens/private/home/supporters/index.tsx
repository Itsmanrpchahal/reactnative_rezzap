import React, { useEffect, useState } from "react";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import { MainParentWrapper, MainWrapper, NotFound } from "@root/utils/globalStyle";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { dp, close } from "@root/utils/assets";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { imageUrl } from "@root/utils/constants";
import { navigationRef } from "@root/navigation/RootNavigation";
import NavigationStrings from "@root/navigation/navigationStrings";
import { useActions } from "@root/hooks/useActions";
import { useIsFocused, useTheme } from "@react-navigation/native";
import AppLoader from "@root/components/Loader";

const Supportors = (props: any) => {
  const isFocused = useIsFocused();
  const { getMySupporter, deleteSupporter } = useActions();
  const { mySupporterData, supporterLoading } = useTypedSelector((state) => state.mySupporters);
  const { deleteSupporterData, deleteloading } = useTypedSelector((state) => state.mySupporters);
  const [edit, setEdit] = useState(false);
  const [edittext, setEditText] = useState('Edit')


  useEffect(() => {
    if(isFocused){

    } getMySupporter()
   
  }, [isFocused])
  return (
    <MainWrapper>
      {
        supporterLoading || deleteloading ? (
          <AppLoader />
        ) :
          mySupporterData.data.length > 0 ?
            (
              <View>

                <FlatList
                  nestedScrollEnabled={true}
                  data={mySupporterData.data}
                  numColumns={3}
                  horizontal={false}
                  renderItem={({ item }) => {
                    return (
                      <DrawerThreeSection>
                        <HeaderWrapper>
                          <TouchableOpacity onPress={() => {
                            navigationRef.current.navigate(NavigationStrings.SUPPORTER_PROFILE, { item: item, type: 'all' })
                          }
                          }>
                            <ImageWrapper>
                              <ImageContent source={{ uri: item != null ? imageUrl + item.profile_photo : dp }} />
                            </ImageWrapper>
                          </TouchableOpacity>
                          <UserName numberOfLines={1}>{item != null ? item.name : ''}</UserName>
                          {edit && <TouchableOpacity onPress={async () => {
                          await  deleteSupporter(item.id)
                          getMySupporter()
                          }}>
                            <CloseView>Delete</CloseView>
                          </TouchableOpacity>}

                        </HeaderWrapper>

                      </DrawerThreeSection>

                    );
                  }}
                />

                <EditView>
                  <TouchableOpacity onPress={() => {
                    setEdit(!edit)
                    !edit ?
                      setEditText('Done') :
                      setEditText('Edit')
                  }}>
                    <EditBtn>
                      {edittext}
                    </EditBtn>
                  </TouchableOpacity>

                </EditView>
              </View>
            ) : (<UserName>No Data Found</UserName>)
      }




    </MainWrapper>
  );
};

// @ts-ignore
export default withTheme(Supportors);

const EditBtn = styled.Text`
background-color:#000;
padding:5px;
margin:16px;
width:70px;
text-align:center;
color:#fff;
`

const EditView = styled.View`
justify-content:flex-end;
align-items:flex-end;
`;

const CloseView = styled.Text`
  background-color:#000;
  padding:5px;
  margin-top:5px;
  color:#ffffff;
  border-radius:10px;
`;
const HeaderWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  margin-bottom: 1px;
`;

const ImageWrapper = styled.View`
  border: 1px solid #000;
  padding:2px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  overflow: hidden;
`;
const ImageContent = styled.Image`
  width: 40px;
  height: 40px;
  margin: 1.5px;
  border-radius: 100px;
`;


const UserName = styled.Text``;

const DrawerThreeSection = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:33.3333%;
  padding: 15px;
  box-sizing: border-box;
  position:relative;
`;

