import React from "react";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";
import { useTypedSelector } from "@root/hooks/useTypedSelector";
import { NotFound } from "../../../../utils/globalStyle";
import { ScrollView, TouchableOpacity } from "react-native";
import { demoImage, imageLayout, loc } from "../../../../utils/assets";
import { imageUrl } from "@root/utils/constants";
import ProfileItem from "@root/components/profileItem";
import { useTheme } from "@react-navigation/native";

const ProfileView = (props: any) => {
  const { colors }: any = useTheme();
  const { myProfileData, loading } = useTypedSelector(
    (state) => state.myProfile,
  );
  return (
    <ViewProfile>

      {loading ? (
          <NotFound>Loading...</NotFound>
        ) :
        <ChildWrapper>
          <TouchableOpacity onPress={() => {

          }}>
            <ImageWrapper>
              <ImageView source={imageLayout} />
              <ImageBottom
                source={{ uri: myProfileData != null ? myProfileData.data.profile_photo != "" ? imageUrl + myProfileData.data.profile_photo : demoImage : demoImage }} />
            </ImageWrapper>
          </TouchableOpacity>

          <UserText>{myProfileData != null ? myProfileData.data.first_name + " " + myProfileData.data.last_name : ""}</UserText>

          <Divider backgroundColor={colors.divider} height={2} />


          <ProfileItem heading={"Location :"}
                       decs={myProfileData != null ? myProfileData.data.city : ""}
                       backgroundColor={colors.divider}
                       icon={loc} />
          <ProfileItem heading={"DOB :"}
                       decs={myProfileData != null ? myProfileData.data.dob : ""}
                       backgroundColor={colors.white}
                       icon={loc} />
          <ProfileItem heading={"Gender :"}
                       decs={myProfileData != null ? myProfileData.data.gender : ""}
                       backgroundColor={colors.divider}
                       icon={loc} />
          <ProfileItem heading={"Mobile :"}
                       decs={myProfileData != null ? myProfileData.data.mobile : ""}
                       backgroundColor={colors.white}
                       icon={loc} />
          <ProfileItem heading={"Email :"}
                       decs={myProfileData != null ? myProfileData.data.email : ""}
                       backgroundColor={colors.divider}
                       icon={loc} />
          <ProfileItem heading={"Rezzap :"}
                       decs={myProfileData != null ? myProfileData.data.social_media : ""}
                       backgroundColor={colors.white}
                       icon={loc} />
          <ProfileItem heading={"High School :"}
                       decs={myProfileData != null ? myProfileData.data.highschool : ""}
                       backgroundColor={colors.divider}
                       icon={loc} />
          <ProfileItem heading={"College :"}
                       decs={myProfileData != null ? myProfileData.data.college : ""}
                       backgroundColor={colors.white}
                       icon={loc} />

          <ProfileItem heading={"Degree :"}
                       decs={myProfileData != null ? myProfileData.data.degree : ""}
                       backgroundColor={colors.divider}
                       icon={loc} />
          <ProfileItem heading={"Designation :"}
                       decs={myProfileData != null ? myProfileData.data.designation === "0" ? "Student" : myProfileData.data.designation === "1" ? "Parent" : myProfileData.data.designation === "2" ? "College Counselor" : myProfileData.data.designation === "3" ? "Admissions - College" : myProfileData.data.designation === "4" ? "Recruiter" : myProfileData.data.designation === "5" ? "Company" : myProfileData.data.designation === "5" ? "Company" : "" : ""}
                       backgroundColor={colors.white}
                       icon={loc} />
          <ProfileItem heading={"Address :"}
                       decs={myProfileData != null ? myProfileData.data.address : ""}
                       backgroundColor={colors.divider}
                       icon={loc} />
          <ProfileItem heading={"Street :"}
                       decs={myProfileData != null ? myProfileData.data.street : ""}
                       backgroundColor={colors.white}
                       icon={loc} />
          <ProfileItem heading={"Visibilty :"}
                       decs={myProfileData != null ? myProfileData.data.visibility  === "0" ? 'Public' : 'Private' : ''}
                       backgroundColor={colors.divider}
                       icon={loc} />


        </ChildWrapper>
      }

    </ViewProfile>
  );
};

export default withTheme(ProfileView);


const Divider = styled.View`
  height: ${({ height }: any) => height}px;
  margin-top: 10px;
  background-color: ${({ theme }: any) => theme.colors.divider};
  margin-bottom: 10px;
`;

const ChildWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 10px 0 10px;
`;

const UserText = styled.Text`
  color: ${({ theme }: any) => theme.colors.black};
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle}px;
  margin-top: 10px;
`;

const ImageView = styled.Image`
  width: 200px;
  height: 200px;`;

const ImageBottom = styled.Image`
    position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 80px;
`;

const ImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 188px;
  height: 188px;
  margin-top: 15px;
`;
const ViewProfile = styled.View``;
