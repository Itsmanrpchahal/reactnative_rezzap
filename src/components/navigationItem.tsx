// @ts-ignore
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {withTheme} from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

type NavigationItemProps = {
  onPress: Function;
  text: string;
  backgroundColor?: string;

  icon?: string | null;
};

const NavigationItem: React.FC<NavigationItemProps> = ({
  onPress,
  text,
  backgroundColor,

  icon,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <ItemWrapper backgroundColor={{backgroundColor}}>
        <HorizontalWrapper>
          <TextImageWrapper>
            <Image source={icon} />
            <TextWrapper>{text}</TextWrapper>
          </TextImageWrapper>
        </HorizontalWrapper>
      </ItemWrapper>
    </TouchableOpacity>
  );
};

// @ts-ignore
export default withTheme(NavigationItem);

const TextWrapper = styled.Text`
  color: ${({theme}: any) => theme.colors.black};
  font-size: ${({theme}: any) => theme.fontSize.cardTitle};
  margin-left: 16px;
`;

const TextImageWrapper = styled.View`
  display: flex;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 2px;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
  margin: 10px 16px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const ItemWrapper = styled.View`
  background-color: ${({theme}: any) => theme.colors.white};
  height: 50px;
`;
