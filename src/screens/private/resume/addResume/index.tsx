import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MainWrapperWhite } from "@root/utils/globalStyle";
import { useTheme, withTheme } from "styled-components";
import { Formik } from 'formik';
import TextField from "@root/components/TextField";
import { ScrollView } from "react-native-gesture-handler";
import { useActions } from "@root/hooks/useActions";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import AppLoader from "@root/components/Loader";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import PrimaryButton from '@root/components/Button';
import { RESUME_SCHEMA } from './helpers';
import styled from "styled-components/native";
import { navigationRef } from "../../../../navigation/RootNavigation";

const AddResume = ({ props, route }) => {
    const { colors }: any = useTheme();
    const { resumeDetail, resume_CategoryList, resume_ActivityList, getMySupporter, getMyInterest, add_Resume, resume_Update } = useActions();
    let [series, setSeries] = useState([])
    const { resumeData, loading } = useTypedSelector((state) => state.resumeData);
    const { resumeCData, loadingC } = useTypedSelector((state) => state.resumeCData);
    const { resumeActivityData, resumeActivityloading } = useTypedSelector((state) => state.resumeActivityData);
    const { mySupporterData, supporterLoading } = useTypedSelector((state) => state.mySupporters);
    const { myInterestData, interestLoading } = useTypedSelector(
        (state) => state.interest,
    );
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profile, setProfile] = useState('');
    const [category_names, setCategory_names] = useState('');
    const [activity_names, setActivity_names] = useState('');
    const [supporters_ids, setSupporters_ids] = useState('');
    const [interest_names, setInterest_names] = useState('');
    useEffect(() => {
        if (route.params.type != "new") {
             resumeDetail(route.params.id)
             
         }
        resume_CategoryList(),
            getMySupporter(),
            getMyInterest()
        {
            loadingC || resumeActivityData || resumeActivityData || myInterestData ? <AppLoader /> :
                resumeCData && Object.keys(resumeCData).length > 0 ? resumeCData.data.map((item: any) => (setSeries(item))) : setSeries([])
        }
    }, []);

    useEffect(()=>{
        if (route.params.type != "new" && loading === false) {
            
            setName(resumeData.data.resume_name)
            
            setEmail(resumeData.data.resume_email)
           
            setPhone(resumeData.data.resume_phone)
            
            setProfile(resumeData.data.resume_profile)
        }
    },[resumeData.data])
    return (
        <MainWrapperWhite>
            {
                loading ? <AppLoader /> :
                    <ScrollView nestedScrollEnabled={false}>
                        <ResumeView>
                           
                            <Formik
                                validationSchema={RESUME_SCHEMA}
                                enableReinitialize={true}
                                initialValues={{
                                    name: name,
                                    email: email,
                                    phone: phone,
                                    profile: profile,
                                    category_names: category_names,
                                    activity_names: activity_names,
                                    supporters_ids: supporters_ids,
                                    interest_names: interest_names,
                                }}
                                onSubmit={async (values) => {
                                    route.params.type === 'new' ?
                                        await add_Resume({
                                            name: values.name,
                                            email: values.email,
                                            phone: values.phone,
                                            profile: values.profile,
                                            category_names: values.category_names,
                                            activity_names: values.activity_names,
                                            supporters_ids: values.supporters_ids,
                                            interest_names: values.interest_names,
                                        })
                                        :
                                        await resume_Update({
                                            name: values.name,
                                            email: values.email,
                                            phone: values.phone,
                                            profile: values.profile,
                                            category_names: values.category_names,
                                            activity_names: values.activity_names,
                                            supporters_ids: values.supporters_ids,
                                            interest_names: values.interest_names,
                                            id:resumeData.data.resume_id
                                        })
                                           
                                    navigationRef.current.goBack()
                                }}>
                                {({ setFieldValue, handleSubmit, errors }) => (
                                    <View>
                                        <TextField accessibilityLabel="Name"
                                            placeholder='Name'
                                            defaultValue={route.params.type === 'new' ? '' : resumeData.data.resume_name}
                                            onChangeText={(value: any) => {
                                                setFieldValue('name', value);
                                                setName(value)
                                            }}
                                            error={errors ? errors.name : null} />

                                        <TextField accessibilityLabel="Email"
                                            placeholder='Email'
                                            defaultValue={route.params.type === 'new' ? '' : resumeData.data.resume_email}
                                            onChangeText={(value: any) => {
                                                setFieldValue('email', value);
                                                setEmail(value)
                                            }}
                                            error={errors ? errors.email : null} />

                                        <TextField accessibilityLabel="Phone"
                                            placeholder='Phone'
                                            defaultValue={route.params.type === 'new' ? '' : resumeData.data.resume_phone}
                                            onChangeText={(value: any) => {
                                                setFieldValue('phone', value);
                                                setPhone(value)
                                            }}
                                            error={errors ? errors.phone : null} />

                                        <TextField accessibilityLabel="Resume Profile"
                                            placeholder='Resume Profile'
                                            defaultValue={route.params.type === 'new' ? '' : resumeData.data.resume_profile}
                                            onChangeText={(value: any) => {
                                                setFieldValue('profile', value);
                                                setProfile(value)
                                            }}
                                            error={errors ? errors.profile : null} />

                                        <Title>
                                            Category
                                        </Title>
                                        <Horizontal>
                                            <Dropdown
                                                style={{ width: "100%", backgroundColor: '#D3D3D3', borderRadius: 8, padding: 5 }}
                                                data={resumeCData && Object.keys(resumeCData).length > 0 ? resumeCData.data : series}
                                                search={false}
                                                maxHeight={300}
                                                labelField="cat_name"
                                                valueField="cat_id"
                                                searchPlaceholder={"Search"}
                                                value={'cat_name'}
                                                selectedTextStyle={{ color: colors.black }}
                                                onChange={item => {
                                                    setFieldValue('category_names', item.cat_name)
                                                    setCategory_names(item.cat_name)
                                                    resume_ActivityList({ cat_id: item.cat_id })
                                                }}
                                            />
                                        </Horizontal>
                                        {errors !== null && (
                                            <ErrorWrapper>
                                                <ErrorWrapper__Text>{errors ? errors.category_names : null}</ErrorWrapper__Text>
                                            </ErrorWrapper>
                                        )}
                                        <TextTV>Select categories in the order that should appear in the resume.</TextTV>

                                        <Title>
                                            Activity
                                        </Title>

                                        <Horizontal>
                                            <Dropdown
                                                style={{ width: "100%", backgroundColor: '#D3D3D3', borderRadius: 8, padding: 5 }}
                                                selectedTextStyle={{ color: colors.black }}
                                                data={resumeActivityData && Object.keys(resumeActivityData).length > 0 ? resumeActivityData.data : series}
                                                search={false}
                                                maxHeight={150}
                                                labelField="title"
                                                valueField="id"
                                                searchPlaceholder={"Search"}
                                                value={'title'}
                                                onChange={item => {
                                                    setFieldValue('activity_names', item.title)
                                                    setActivity_names(item.title)
                                                }}
                                            />

                                        </Horizontal>
                                        {errors !== null && (
                                            <ErrorWrapper>
                                                <ErrorWrapper__Text>{errors ? errors.activity_names : null}</ErrorWrapper__Text>
                                            </ErrorWrapper>
                                        )}

                                        <Title>
                                            Supporters
                                        </Title>

                                        <Horizontal>
                                            <Dropdown
                                                style={{ width: "100%", backgroundColor: '#D3D3D3', borderRadius: 8, padding: 5 }}
                                                selectedTextStyle={{ color: colors.black }}
                                                data={mySupporterData && Object.keys(mySupporterData).length > 0 ? mySupporterData.data : series}
                                                search={false}
                                                maxHeight={150}
                                                labelField="name"
                                                valueField="id"
                                                searchPlaceholder={"Search"}
                                                value={'name'}
                                                onChange={item => {
                                                    setFieldValue('supporters_ids', item.name)
                                                    setSupporters_ids(item.name)
                                                }}
                                            />
                                        </Horizontal>

                                        {errors !== null && (
                                            <ErrorWrapper>
                                                <ErrorWrapper__Text>{errors ? errors.supporters_ids : null}</ErrorWrapper__Text>
                                            </ErrorWrapper>
                                        )}

                                        <TextTV>order you select here is directly affected in resume.</TextTV>

                                        <Title>
                                            Interests
                                        </Title>

                                        <Horizontal>
                                            <Dropdown
                                                style={{ width: "100%", backgroundColor: '#D3D3D3', borderRadius: 8, padding: 5 }}
                                                selectedTextStyle={{ color: colors.black }}
                                                data={myInterestData && Object.keys(myInterestData).length > 0 ? myInterestData.data : series}
                                                search={false}
                                                maxHeight={150}
                                                labelField="title"
                                                valueField="id"
                                                searchPlaceholder={"Search"}
                                                value={'title'}
                                                onChange={item => {
                                                    setFieldValue('interest_names', item.title)
                                                    setInterest_names(item.title)
                                                }}
                                            />
                                        </Horizontal>

                                        {errors !== null && (
                                            <ErrorWrapper>
                                                <ErrorWrapper__Text>{errors ? errors.interest_names : null}</ErrorWrapper__Text>
                                            </ErrorWrapper>
                                        )}
                                        <TextTV>Order you select here is directly affected in resume.</TextTV>
                                        <ButtonWrapper>
                                            <PrimaryButton
                                                onPress={() => { handleSubmit() }}
                                                backgroundColor={colors.black}
                                                btnText={'Confirm'}
                                                loading={loading}
                                            />
                                        </ButtonWrapper>
                                    </View>

                                )}
                            </Formik>

                        </ResumeView>

                    </ScrollView>
            }

        </MainWrapperWhite>


    )
}

export default withTheme(AddResume)

const TextTV = styled.Text`
color:#000`;
const ErrorWrapper = styled.View`
  margin-top: 3px;
  padding-left: 2px;
`;
const ErrorWrapper__Text = styled.Text`
  color: red;
`;

const ButtonWrapper = styled.View`
  margin: 40px 0;
  align-items: center;
`;

const Title = styled.Text`
color:#000;
margin-top:16px;
font-size:${({ theme }: any) => theme.fontSize.cardDate}px;`;

const ResumeView = styled.View`
padding:0 16px;
`;

const Horizontal = styled.View`
display: flex;
align-items: center;
border-width: 1px;
border-color: ${({ theme }: any) => theme.colors.borderGray};
border-radius: 8px;
margin-top: 10px;
`;