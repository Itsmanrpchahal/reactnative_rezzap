import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme, withTheme } from "styled-components";
import styled from "styled-components/native"
import { MainWrapper, MainWrapperWhite } from "../../../../utils/globalStyle";
import CheckBox from '@react-native-community/checkbox';
import { deleteBlack, editBlack, add } from "@root/utils/assets";
import TextField from '@root/components/TextField';
import { useIsFocused } from "@react-navigation/native";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { useActions } from "@root/hooks/useActions";
import { NotFound } from "@root/utils/globalStyle";
import { CATEGORY_SCHEMA } from './helpers';
import { Formik } from 'formik';
import PrimaryButton from "@root/components/Button";
import AppLoader from "../../../../components/Loader";
import AwesomeAlert from "react-native-awesome-alerts";
import { addWhite } from "../../../../utils/assets";
import { navigationRef } from "../../../../navigation/RootNavigation";
import navigationStrings from "../../../../navigation/navigationStrings";

const AddNewCategory = () => {
  const { colors }: any = useTheme();
  const isFocused = useIsFocused();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [checkedIds, setChekedIds] = useState({})
  const [data, setData] = useState('');
  const [itemId, setItemId] = useState('');
  const [confirm, setConfirm] = useState('Update');
  const { getCategories, deleteCategory, updateCategory, addCategory } = useActions();
  const { categoryData, loading } = useTypedSelector(
    (state) => state.categoryData,
  );

  const [showAlert, setShowAlert] = useState(false)
  useEffect(() => {
    if (isFocused) {
      getCategories()
    }
  }, [isFocused]);

  return (

    <MainWrapperWhite>
      
      <MainView>
        
        {loading ? (
          <AppLoader />
        ) :
          Object.keys(categoryData).length > 0 ?
            (<FlatList
              nestedScrollEnabled={true}
              data={categoryData.data}
              horizontal={false}
              renderItem={({ item }) => {
                return (
                  <CateView>
                    <CateItem>
                      <CateLeft>
                        <CheckBox
                          disabled={false}
                          value={item.default && true}
                          boxType={'square'}
                          onTintColor={colors.greenColor}
                          tintColor={colors.greenColor}
                          animationDuration={0}
                          onFillColor={colors.greenColor}
                          onCheckColor={colors.greenColor}
                          onValueChange={(newValue) => { setToggleCheckBox(newValue)}}
                        />

                        <TitleText>
                          {item.title}
                        </TitleText>
                      </CateLeft>

                      {
                        item.is_custom === '1' ? <CateRight>

                          <TouchableOpacity onPress={() => { setShowAlert(true), setData(item.title), setItemId(item.id) }}>
                            <AddBtn
                              source={editBlack}
                            />
                          </TouchableOpacity>


                          <TouchableOpacity onPress={async () => { await deleteCategory({ id: item.id }) 
                              await getCategories() }}>
                            <AddBtn source={deleteBlack} />
                          </TouchableOpacity>

                        </CateRight> : <Text></Text>
                      }

                    </CateItem>

                  </CateView>
                )
              }}
            />) :
            (<Text>No Data Found</Text>)

        }

        {
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={'Update Category'}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            customView={
              <PopUpView>
                <TextField
                  onChangeText={(value: any) => {
                    setData(value)
                  }}
                  defaultValue={data}
                  placeholder="Category name"
                  secureTextEntry={false}
                >

                </TextField>

                {data === '' ? (
                  <ErrorWrapper>
                    <ErrorWrapper__Text>Category Required</ErrorWrapper__Text>
                  </ErrorWrapper>
                ) : <Text></Text>}

              </PopUpView>
            }
            cancelText="Cancel"
            confirmText={confirm}
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              setShowAlert(false)
            }}
            onConfirmPressed={async () => {
              setConfirm('Updating...')
              await updateCategory({ id: itemId, title: data })
              getCategories()
              setShowAlert(false)
            }}>
          </AwesomeAlert>
        }
        <AddWrapper>

          <Formik
            validationSchema={CATEGORY_SCHEMA}
            initialValues={{
              title: '',
            }}
            onSubmit={async (values) => {

              await addCategory({ title: values.title })
              setData('')
              getCategories()
            }}>
            {({ setFieldValue, handleSubmit, errors }) => (
              <View style={{ width: '95%', marginLeft: 10, marginRight: 10 }}>
                <TextField
                  onChangeText={(value: any) => {
                    setFieldValue('title', value);
                  }}
                  placeholder="Title"
                  autoCapitalize={'none'}
                  error={errors ? errors.title : null}
                />


                <AddBt>
                  <TouchableOpacity onPress={handleSubmit}>
                    <AddImage
                      source={addWhite}
                    />
                  </TouchableOpacity>

                </AddBt>

              </View>
            )}
          </Formik>

        </AddWrapper>

        <ButtonWrapper>
          <PrimaryButton
            onPress={() => { 
             // navigationRef.current.navigate(navigationStrings.PAYPAL)
            }}
            backgroundColor={colors.black}
            btnText={"Add"}
            loading={loading}
          />
        </ButtonWrapper>
      </MainView>

    </MainWrapperWhite>




  )
}

export default withTheme(AddNewCategory)

const ButtonWrapper = styled.View`
  margin-bottom: 20px;
  align-items: center;
`;


const ErrorWrapper = styled.View`
  margin-top: 3px;
  padding-left: 2px;
`;
const ErrorWrapper__Text = styled.Text`
  color: red;
`;

const PopUpView = styled.View`
  width:100%;
  height:auto;

`;

const AddImage = styled.Image`
`;

const AddBt = styled.View`
width:40px;
background-color:#000;
  position:absolute;
  top:10px;
  right:0;
  height:40px;
  justify-content:center;
  align-items:center;
`

const AddWrapper = styled.View`
flex-direction:row;
align-items:center;
width:100%;
background:#F5F5F5;
position:relative;
margin:auto auto 50px auto;
`;

const AddBtn = styled.Image`
  margin-left:10px;
`;

const TitleText = styled.Text`
margin-left:10px;
margin-top:6px;
color:#000;
`;

const CateLeft = styled.View`
flex-direction:row;
align-items:center;
`;

const CateRight = styled.View`
margin-left:auto;
flex-direction:row;
align-items:center;
`;
const CateItem = styled.View`
    margin:10px 0;
    flex-direction:row;
    flex-direction:row;
    align-items:center;
    width:100%;
`;

const CateView = styled.View`
flex-direction:row;
    flex-wrap:wrap;
        width:95%;
        margin-left:10px
`;

const MainView = styled.View`
flex-direction:row;
flex-wrap:wrap;
flex-direction:column;
height:100%;
background-color:#fffff;
width:100%;
`;