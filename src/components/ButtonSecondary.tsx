// @ts-ignore
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {withTheme} from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

type PrimaryButtonProps = {
  onPress: Function;
  btnText: string;
  loading?: boolean;
  backgroundColor?: string;
};

const SecondaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  btnText,
  loading = false,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <SecondaryButton__Wrapper backgroundColor={backgroundColor}>
        <SecondaryButton__Wrapper__Text>
          {loading ? 'Loading...' : btnText}
        </SecondaryButton__Wrapper__Text>
      </SecondaryButton__Wrapper>
    </TouchableOpacity>
  );
};

// @ts-ignore
export default withTheme(SecondaryButton);

const SecondaryButton__Wrapper = styled.View`
  width: 140px;
  margin: 3px;
  align-items: center;
  background-color: ${({backgroundColor}: any) => backgroundColor};
  height: 40px;
  border-radius: 8px;
  padding: 0 6px 0 6px;
  justify-content: center;
`;
const SecondaryButton__Wrapper__Text = styled.Text`
  color: ${({theme}: any) => theme.colors.textBlack};
  font-size: ${({theme}: any) => theme.fontSize.cardDate}px;
`;
