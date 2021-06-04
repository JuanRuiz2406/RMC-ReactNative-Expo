import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import { Camera } from "expo-camera";
import { IconButton, Colors } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
export default ({ navigation: { goBack } }) => {
  const route = useRoute();

  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data);
      route.params.setImage(data.uri);
      setImage(data.uri);
      setPreview(true);
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (preview === true) {
    return (
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.imageContainer} />}
        <View style={styles.buttonViewContainerClose}>

          <IconButton
            icon="window-close"
            color={'#a8a8a8'}
            size={50}
            onPress={() => setPreview(false)}
          />


        </View>
        <View style={styles.buttonViewContainerCheck}>
        <IconButton
          icon="check"
          color={'#a8a8a8'}
          size={50}
          
          onPress={() => goBack()}
        />

        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)} style={styles.camera} type={type} ratio={'4:3'} />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.iconFlip}>
          <IconButton
            icon="camera-front"
            color={'#a8a8a8'}
            size={40}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </View>
        <View style={styles.iconTakePicture}>
          <IconButton
            icon="circle-slice-8"
            color={'#a8a8a8'}
            size={75}
            onPress={() => takePicture()}
          />
        </View>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    aspectRatio: 0.8,
  },
  cameraContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginLeft: '11.5%',
  },
  iconFlip: {
    marginTop: '7%',
  },
  iconTakePicture: {
    margin: '-3%',
    marginEnd: '5%',
    marginRight: '10%',
    marginLeft: '5%',
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#3E5EAB",
    marginBottom: '30%'
  },
  imageContainer: {
    flex: 1,
  },
  buttonViewContainerClose: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: "absolute",
    bottom: '0%',
    marginLeft: '2%',
  },
  buttonViewContainerCheck: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    position: "relative",
    bottom: '0%',
    marginLeft: '2%',
  },
});
