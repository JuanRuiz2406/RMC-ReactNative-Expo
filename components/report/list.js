import React from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";

export default ({ reports, onPress }) => {
  return (
    <FlatList
      data={reports}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.report}
          onPress={() => {
            onPress(item.id);
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.titleLeft}>
            <Text style={styles.bold}>Realizado por: </Text>
            <Text>
              {item.user.name} {item.user.lastname}
            </Text>
          </Text>

          <Text style={styles.state}>
            <Text style={styles.bold}>Estado: </Text>
            <Text>{item.state}</Text>
          </Text>

          <Text style={[styles.titleLeft, styles.bold]}>Descripción: </Text>
          <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 25,
  },
  state: {
    marginLeft: 230,
  },
});
