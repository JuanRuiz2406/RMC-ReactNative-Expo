import React from "react";
import { FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
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
    marginLeft: 30,
    fontWeight: "bold",
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 40,
  },
  Description: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 70,
    marginRight: 70,
  },
  button: {
    backgroundColor: "#FEB139",
    padding: 7,
    marginLeft: 120,
    marginRight: 120,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  Barra: {
    borderBottomWidth: 1,
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 30,
    fontSize: 30,
    fontWeight: "200",
    textAlign: "center",
  },
});

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch("http://192.168.0.3:8080/reports")
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
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text style={styles.Page}>Reportes</Text>

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View>
              <Text style={ styles.Title }>Reporte #{item.id}</Text>
              <Image source={ foto }></Image>

              <Text style={ styles.Title2 }>Descripción:</Text>
              <Text style={ styles.Description }>{item.description}</Text>

              <Text style={ styles.Description }>
              <TouchableOpacity onPress={() => null} style={styles.button}>
                <Text style={styles.buttonText}>Ver más</Text>
              </TouchableOpacity>
                {item.state}</Text>
              
              <Text style={ styles.Barra }></Text>  
              
            </View>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}
