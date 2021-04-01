import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default ({ reports, onPress }) => {
  return (
    <FlatList
      data={reports}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.report}
          onPress={() => {
            onPress(item);
          }}
        >
          <Text style={styles.title}>{item.title}</Text>

          <Text style={[styles.titleLeft, styles.bold]}>
            Descripción:
          </Text>
          <Text style={styles.description}>{item.description}</Text>

          <Image
            source={require("../../image/arbol-carretera.jpg")}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 250,
  },
  report: {
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    textAlign: "center",
    paddingBottom: 10,
    borderColor: "grey",
  },
  title: {
    fontSize: 30,
    marginLeft: 20,
  },
  titleLeft: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 40,
    marginBottom: 10,
  },
  photo: {
    fontSize: 45,
    marginLeft: 100,
  },
});
