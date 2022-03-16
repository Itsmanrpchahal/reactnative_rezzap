import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { WebView } from 'react-native-webview';
const Help = () => {

    return (
        <MainParentWrapper>
            <WebView source={{ uri: 'https://www.rezzap.com/help' }} 
             javaScriptEnabled={true}
             domStorageEnabled={true}
             
             startInLoadingState={true}/>
        </MainParentWrapper>
    );
}

export default Help

const MainParentWrapper = styled.View`
    height:100%;
`;