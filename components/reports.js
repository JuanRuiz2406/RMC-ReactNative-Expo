import React from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import foto from "../imgs/huracan-otto.jpg";

const styles = StyleSheet.create({
  Page: {
    textAlign: "center",
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
  },
  Title: {
    fontSize: 30,
    marginTop: 10,
    marginLeft: 30,
  },
  Title2: {
    fontSize: 23,
    marginTop: 10,
    marginLeft: 45,
    fontWeight: "bold",
  },
  By: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 45,
    marginBottom: 10,
  },
  ByBold: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 45,
    marginBottom: 10,
    fontWeight: "bold",
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 40,
  },
  StateBold: {
    fontWeight: "bold",
  },
  State: {
    marginLeft: 260,
  },
  Description: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#FEB139",
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  EndReport: {
    marginLeft: 280,
  },
  NoBtn: {
    padding: 5,

  },
  NoBtnTxt: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  Barra: {
    borderBottomWidth: 1,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 30,
    textAlign: "center",
    backgroundColor: "black"
  },
  Img: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    width: 350,
    height: 200,
    alignItems: "center",
  },
});

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch("http://192.168.0.13:8080/report")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () { }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView style={{ flex: 1, paddingTop: 20 }}>
        <Text style={styles.Page}>Reportes</Text>

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.Title}>Reporte #{item.id}</Text>
              <Text style={styles.By}>
                <Text style={styles.ByBold}>Realizado por: </Text>
                <Text style={styles.By}>{item.user.name} {item.user.lastName}</Text>
              </Text>

              <Image source={foto}></Image>

              <Text style={styles.State}>
                <Text style={styles.StateBold}>Estado: </Text>
                <Text style={styles.State}>{item.state}</Text>
              </Text>

              <Text style={styles.Title2}>Descripción:</Text>
              <Text style={styles.Description}>{item.description}</Text>

              <Text style={styles.EndReport}>
                <TouchableOpacity onPress={() => null} style={styles.button}>
                  <Text style={styles.buttonText}>Ver más</Text>
                </TouchableOpacity>
              </Text>

              <View style={styles.Barra}></View>
            </View>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </ScrollView>
    );
  }
}
