import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";

export default () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.17:8080/report")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setReports(data);
      });
  }, []);

  const touch = (reportId) => {
    Alert.alert("Detalle", "http://192.168.0.17:8080/report/" + reportId);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reports}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.report}
            onPress={() => {
              Alert.alert(
                "Detalle",
                "http://192.168.0.17:8080/report/" + String(item.id)
              );
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    paddingTop: 22,
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
    marginBottom: 25,
  },
  state: {
    marginLeft: 230,
  },
});
