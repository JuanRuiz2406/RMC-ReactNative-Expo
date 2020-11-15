import React from "react";
import { FlatList, ActivityIndicator, Text, View, Button } from "react-native";

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch("http://192.168.1.112:8080/reports")
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

  delete(id) {
    fetch("http://192.168.1.112:8080/reports/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View>
              <Text
                style={{
                  borderBottomWidth: 1,
                  marginBottom: 12,
                  fontSize: 20,
                  fontWeight: "200",
                  textAlign: "center",
                  paddingBottom: 30,
                }}
              >
                Reporte #{item.id}
                {"\n"}
                Realizado por: {item.user.name} {item.user.lastName}
                {"\n"}
                {"\n"}
                Descripción: {item.description}
                {"\n"}
                Estado: {item.state}
                {"\n"}
                Privacidad: {item.privacy}
                {"\n"}
                {"\n"}
                <Button title="Ver más" onPress={() => null} />
                <Button title="Eliminar" onPress={() => this.delete(item.id)} />
              </Text>
              <Text></Text>
            </View>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}
