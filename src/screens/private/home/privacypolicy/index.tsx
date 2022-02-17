import React from "react";
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import { MainParentWrapper, NotFound } from "../../../../utils/globalStyle";
const PrivacyPolicy = () => {

    return (
        <MainParentWrapper>
            <WebView source={{ uri: 'https://www.rezzap.com/privacy-policy' }} 
             javaScriptEnabled={true}
             domStorageEnabled={true}
             startInLoadingState={true} />
        </MainParentWrapper>
    );
}

export default PrivacyPolicy