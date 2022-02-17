// @ts-ignore
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { withTheme } from "styled-components";
// @ts-ignore
import styled from "styled-components/native";

type ProfileItemProps = {
  heading: string;
  decs: string;
  backgroundColor: string;
  icon?: string | null;
};

const ProfileItem: React.FC<ProfileItemProps> = ({

                                                   heading,
                                                   decs,
                                                   backgroundColor,
                                                   icon,
                                                 }) => {
  return (
      <ItemWrapper   backgroundColor={backgroundColor}>
        <HorizontalWrapper>
          <TextImageWrapper>
            <Image source={icon} />
            <TextWrapper>{heading}</TextWrapper>
            <TextWrapper>{decs}</TextWrapper>
          </TextImageWrapper>
        </HorizontalWrapper>
      </ItemWrapper>

  );
};

// @ts-ignore
export default withTheme(ProfileItem);

const TextWrapper = styled.Text`
  color: ${({ theme }: any) => theme.colors.black};
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
  margin-left: 16px;
  min-width:85px;
`;

const TextImageWrapper = styled.View`
  display: flex;
  padding-right: 15px;
  padding-top: 2px;
  padding-bottom: 2px;
  flex-direction: row;
  align-items: center;
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
  margin: 5px 16px;
  align-items: center;
`;

const ItemWrapper = styled.View`
  background-color: ${({ backgroundColor }: any) => backgroundColor};
  width: 100%;
 
`;
