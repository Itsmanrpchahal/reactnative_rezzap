import React from "react";
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import { MainParentWrapper } from "../../../../utils/globalStyle";
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