// @ts-ignore
import styled from 'styled-components/native';

export const NotFoundWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const NotFound = styled.Text`
  font-size: 18px;
  color: #000000;
  width:100%
  height:100%;
  justify-content:center;
  align-items:center;
`;

export const MainParentWrapper = styled.View`
  padding-left: ${({ theme }: any) => theme.spacing.horizontal}px;
  padding-right: ${({ theme }: any) => theme.spacing.horizontal}px;
  height: 100%;
  
`;

export const commonStyledText = styled.Text``;

export const MainWrapper = styled.View`
  background-color: '#EBEBEB;
  height:100%;
`;


export const MainWrapperWhite = styled.View`
  background-color: '#FFFFFF;
  height:100%;
`;
type DrawerWrapperProps = {
  backgroundColor: string;
  height: string;
};

export const Divider = styled.View<DrawerWrapperProps>`
  height: ${({ height }: any) => height}px;
  margin-top: 10px;
  background-color: ${({ backgroundColor }: any) => backgroundColor};
`;

