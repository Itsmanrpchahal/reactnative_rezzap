import React from "react";
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import { MainParentWrapper } from "../../../../utils/globalStyle";
const FAQ = () => {

    return (
        <MainParentWrapper>
            <WebView source={{ uri: 'https://www.rezzap.com/faq' }} 
             javaScriptEnabled={true}
             domStorageEnabled={true}
             
             startInLoadingState={true}/>
        </MainParentWrapper>
    );
}

export default FAQ