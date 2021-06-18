import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Title, Dimensions, Image } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {AssetsSelector} from 'expo-images-picker'
import { Ionicons } from '@expo/vector-icons'

export default ({ navigation: { goBack } }) => {
  const route = useRoute();
  const [image, setImage] = useState(null);


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const onDone = async (data) =>{
    console.log(data);
    var uris = "";
    data.map((img) =>
      uris = (uris +  "," + img.uri)
    );
    console.log(uris.substring(1));
    route.params.setImage(uris.substring(1));
    goBack();

}



  return (
    <View style={styles.container}>

<AssetsSelector
    options={{
        /* Add only when u want to Manipulate Assets.
          manipulate: {
          width: 512,
          compress: 0.7,
          base64: false,
          saveTo: 'jpeg',
        },*/
        assetsType: ['photo', 'video'],
        maxSelections: 3,
        margin: 3,
        portraitCols: 4,
        landscapeCols: 5,
        widgetWidth: 100,
        widgetBgColor: "white",
        videoIcon: {
            Component: Ionicons,
            iconName: 'ios-videocam',
            color: 'tomato',
            size: 20,
        },
        selectedIcon: {
            Component: Ionicons,
            iconName: 'ios-checkmark-circle-outline',
            color: 'white',
            bg: '#00000070',
            size: 20,
        },
        spinnerColor: '#3E5EAB',
        onError: () => {},
        noAssets: () => <View></View>,
        defaultTopNavigator: {
            selectedText: 'Seleccionados',
            continueText: 'Terminar',
            goBackText: 'Volver',
            midTextColor: 'black',
            buttonStyle: _buttonStyle,
            buttonTextStyle: _textStyle,
            backFunction: goBack,
            doneFunction: (data) => onDone(data),
        }
    }}
/>

    </View>
  );
};


const _textStyle = {
  color: 'white',
};
const _buttonStyle = {
  backgroundColor: 'black',
  borderRadius: 3,
};

// if you want to use defaultTopNavigator you must send in basic style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});