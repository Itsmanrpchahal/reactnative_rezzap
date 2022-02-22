import React from "react";
import { MainWrapper } from "../utils/globalStyle";
import ProfileItem from "./profileItem";
import { loc } from "../utils/assets";
import { useTheme } from "@react-navigation/native";
import Wheel from "./wheel";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";

function Detail(item:any) {
  const { colors }: any = useTheme();
  return (
    <MainView>
      <ProfileItem heading={"Location :"}
                   decs={ item.item != null ? item.item.city : ''}
                   backgroundColor={colors.divider}
                   icon={loc} />
      <ProfileItem heading={"DOB :"}
                   decs={ item.item != null ? item.item.dob : ''}
                   backgroundColor={colors.white}
                   icon={loc} />
      <ProfileItem heading={"Gender :"}
                   decs={item.item != null ? item.item.gender : ''}
                   backgroundColor={colors.divider}
                   icon={loc} />
      <ProfileItem heading={"Mobile :"}
                   decs={ item.item != null ? item.item.mobile : ''}
                   backgroundColor={colors.white}
                   icon={loc} />
      <ProfileItem heading={"Email :"}
                   decs={ item.item != null ? item.item.email : ''}
                   backgroundColor={colors.divider}
                   icon={loc} />
      <ProfileItem heading={"Rezzap :"}
                   decs={ item.item != null ? item.item.social_media : ''}
                   backgroundColor={colors.white}
                   icon={loc} />
      <ProfileItem heading={"High School :"}
                   decs={item.item != null ? item.item.highschool : ''}
                   backgroundColor={colors.divider}
                   icon={loc} />
      <ProfileItem heading={"College :"}
                   decs={item.item != null ? item.item.college : ''}
                   backgroundColor={colors.white}
                   icon={loc} />

      <ProfileItem heading={"Degree :"}
                   decs={item.item != null ? item.item.degree : ''}
                   backgroundColor={colors.divider}
                   icon={loc} />
      <ProfileItem heading={"Designation :"}
                   decs={item.item != null ? item.item.designation === '0' ? 'Student' : item.item.designation === '1' ? 'Parent' : item.item.designation === '2' ? 'College Counselor' : item.item.designation === '3' ? 'Admissions - College' : item.item.designation === '4' ? 'Recruiter' : item.item.designation === '5' ?'Company' : item.item.designation === '5' ?'Company': '' : ''}
                   backgroundColor={colors.white}
                   icon={loc} />
      <ProfileItem heading={"Address :"}
                   decs={item.item != null ? item.item.address : ''}
                   backgroundColor={colors.divider}
                   icon={loc} />
      <ProfileItem heading={"Street :"}
                   decs={item.item != null ? item.item.street : ''}
                   backgroundColor={colors.white}
                   icon={loc} />
      <ProfileItem heading={"Visibilty :"}
                   decs={ item.item != null ? item.item.visibility === 0 ? 'Public' : 'Private' : ''}
                   backgroundColor={colors.divider}
                   icon={loc} />
    </MainView>
  );
}

export default withTheme(Detail);


const MainView = styled.View``;


