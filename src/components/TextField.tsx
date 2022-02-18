// @ts-ignore
import React, {useState} from 'react';

import {withTheme} from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

type TextFieldProps = {
  onChangeText?: Function;
  placeholder?: string;
  value?: string;
  accessibilityLabel?: string;
  secureTextEntry?: boolean;
  keyboardType?: string;
  autoCapitalize?: string;
  error?: string | null;
  multiline?: boolean;
  defaultValue? : string;
  editable? : boolean;
  style?: any;
};

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  accessibilityLabel,
  secureTextEntry = false,
  keyboardType = 'default',
  onChangeText = false,
  autoCapitalize = 'sentences',
  error = null,
  multiline = false,
  defaultValue='',
  editable=true,
  style = {},
  ...rest
}) => {
  const [showSecureEntry, setShowSecureEntry] = useState(false);

  return (
    <TextFieldWrapper>
      {accessibilityLabel !== undefined && (
        <TextInputLabelWrapper>
          <TextInputLabelWrapper__Content>
            {accessibilityLabel}
          </TextInputLabelWrapper__Content>
        </TextInputLabelWrapper>
      )}

      <Horizontal>
        <TextInputField
          onChangeText={onChangeText}
          secureTextEntry={showSecureEntry ? false : secureTextEntry}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable ={editable}
          underlineColorAndroid="rgba(0,0,0,0)"
          multiline={multiline}
          defaultValue = {defaultValue}
          style={style}
          {...rest}
        />
      </Horizontal>
      {error !== null && (
        <ErrorWrapper>
          <ErrorWrapper__Text>{error}</ErrorWrapper__Text>
        </ErrorWrapper>
      )}
    </TextFieldWrapper>
  );
};

// @ts-ignore
export default withTheme(TextField);

const ErrorWrapper = styled.View`
  margin-top: 3px;
  padding-left: 2px;
`;
const ErrorWrapper__Text = styled.Text`
  color: red;
`;

const TextInputField = styled.TextInput`
  flex: 1;
  color: ${({theme}: any) => theme.colors.text};
  padding-left: 8px;
`;

const Horizontal = styled.View`
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({theme}: any) => theme.colors.borderGray};
  border-radius: 8px;
  margin-top: 10px;
`;

const TextInputLabelWrapper__Content = styled.Text`
  color: ${({theme}: any) => theme.colors.text};
`;

const TextInputLabelWrapper = styled.View`
  margin-top: 24px;
`;

const TextFieldWrapper = styled.View``;
