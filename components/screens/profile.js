import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Alert, Modal, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/authContext";

import { useForm } from 'react-hook-form';
import { TextInput } from '../hook-form/index';
import ActivityIndicator from "./activityIndicator";

import AsyncStorage from "@react-native-community/async-storage";
import Button from "../ComponetsLogin/Button";
import { IconButton, Colors } from "react-native-paper";
import * as firebase from "firebase";
import { deleteUser, updateUserImage } from "../services/user";
import * as ImagePicker from "expo-image-picker";

export default function Profile({ navigation: { navigate } }) {
  const { handleSubmit, control, reset, errors } = useForm();
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);  
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);


  const loadUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
    setLoading(false);
    console.log(user);
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const camera = async () => {
      setModalVisible(!modalVisible);
      navigate("Cámara", {
        setImage: setImage,
      });
      setModalVisible(!modalVisible);
  }
  const saveImage = async () => {
    const uploadUrl = await uploadImageAsync(image);
    usuario = JSON.parse(await AsyncStorage.getItem("user"))
    console.log(uploadUrl);
    let im = uploadUrl.toString();
    updateResponse = await updateUserImage(usuario, im);
    if(updateResponse.code === 201){
      usuario.imgURL = uploadUrl;
      await AsyncStorage.setItem("user", JSON.stringify(usuario));
    }
  }
  const onDeleteUser = async (userEmail) => {

    const deleteResponse = await deleteUser(userEmail);
    console.log(deleteResponse);
    if (deleteResponse.code === 200) {
      Alert.alert(deleteResponse.message);
      logout();
    }
    if (deleteResponse.code === 401) {
      Alert.alert("Error al eliminar: ", deleteResponse.error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={{ alignSelf: "center" }}>

            
            <View style={styles.profileImage}>
              {user.imgURL === null ? (           
                <Image
                source={require("../../image/Profile_Picture_Null.png")}
                style={styles.image}
                resizeMode="center"
              />): (
                <Image
                source={{ uri: user.imgURL }}
                style={styles.image}
                resizeMode="center"
              />
              )}

            </View>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
          
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.gallery}>
              <IconButton icon="image" size={30} color="#FEB139"
              onPress={pickImage}
              />
            </View>
            <View style={styles.camera}>
              <IconButton icon="camera" size={30} color="#FEB139"
                onPress={camera}
              />
            </View>
            <View style={styles.profileImage}>
            {image === null ? (           
                <Image
                source={{ uri: user.imgURL }}
                style={styles.image}
                resizeMode="center"
              />): (
                <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
              />
              )}
            </View>
            <TouchableHighlight
              style={{ ...styles.closeButton, backgroundColor: '#FF0000' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.saveButton, backgroundColor: '#3CBA69' }}
              onPress={saveImage}>
              <Text style={styles.textStyle}>Guardar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
            <View style={styles.pencil}>
              <IconButton icon="pencil" size={30} color="#FEB139"
              onPress={() => {
                setModalVisible(true)}}
              />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {user.name}
            </Text>
            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              {user.lastname}
            </Text>
          </View>

          <View style={styles.infoUserContainer}>
            <TextInput
              title="Identificacion"
              control={control}
              isPassword={false}
              name="idCard"
              rules={{
                required: {
                  value: true,
                  message: "*La Cédula es obligatoria*",
                },
              }}
              defaultValue="504200201"
              errorMessage={errors?.idCard?.message}
              leftIconName="id-card"
            />
            <TextInput
              title="Correo Electrónico"
              control={control}
              isPassword={false}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "*El Correo Electrónico es obligatorio*",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "*El Correo Electrónico debe tener un formato válido*",
                },
              }}
              defaultValue={String(user.email)}
              errorMessage={errors?.email?.message}
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              returnKeyType="next"
              leftIconName="at"
            />

            <TextInput
              title="Dirección"
              control={control}
              isPassword={false}
              name="direction"
              rules={{
                required: {
                  value: true,
                  message: "*La Dirección es obligatoria*",
                },
              }}
              defaultValue={String(user.direction)}
              errorMessage={errors?.direction?.message}
              leftIconName="location-arrow"
            />

            <TextInput
              title="Contraseña"
              control={control}
              isPassword={true}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "*La Contraseña es obligatoria*",
                },
                minLength: {
                  value: 8,
                  message: "*La Contraseña debe tener 8 caracteres mínimo*",
                },
              }}
              defaultValue={String(user.passdecode)}
              errorMessage={errors?.password?.message}
              leftIconName="lock"
            />
            <Button mode="outlined" onPress={() => navigate("Cambiar Contraseña")}>
              Cambiar Contraseña
              </Button>

            <Button mode="outlined" onPress={() => navigate("Reportes del Usuario")}>
              Mis Reportes
            </Button>

            <Button mode="contained" style={styles.bottonBorrar} onPress={() => onDeleteUser(user.email)}>
              Eliminar cuenta
            </Button>
          </View>



        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImage: {
    marginTop: '4%',
    width: 200,
    height: 200,
    borderRadius: 200,
    overflow: "hidden",
  },
  pencil: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    left: 50,
    bottom: 10,
    flexDirection: 'row',
    backgroundColor: "#41444B",
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  gallery: {
    bottom: 10,
    right: 50,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    backgroundColor: "#41444B",
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  infoUserContainer: {
    alignSelf: "auto",
    marginTop: 20,
    marginLeft: '3%',
    marginRight: '3%',
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "normal",
    lineHeight: 50,
  },
  textSecond: {
    fontSize: 25,
    fontWeight: "normal",
    marginLeft: 40,
    color: "#AEB5BC",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  RegisterButton: {
    marginVertical: 32,
  },
  button: {
    padding: 7,
    marginTop: 25,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
  bottonBorrar: {
    backgroundColor: "#FF0000",
    margin: '5%',
    marginTop: '10%'
  },
  viewPass: {
    flexDirection: 'row',
    //justifyContent: 'space-around',
  },
  modalView: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    left: 10,
    top: 10,
    position: "absolute",
    flexDirection: 'row',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  saveButton: {
    top: 10,
    right: 10,
    position: "absolute",
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  let filename = uri.substring(uri.lastIndexOf("/") + 1);
  const extension = filename.split(".").pop();
  const name = filename.split(".").slice(0, -1).join(".");
  filename = name + Date.now() + "." + extension;

  const ref = firebase.storage().ref().child(filename);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
