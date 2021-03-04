import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default ({ report, details }) => {
  return (
    <View style={styles.report}>
      <Text style={styles.title}>{report.title}</Text>
      <Text style={styles.titleLeft}>
        <Text style={styles.bold}>Realizado por: </Text>
        <Text>
          {report.user.name} {report.user.lastname}
        </Text>
      </Text>
      <Text style={styles.state}>
        <Text style={styles.bold}>Estado: </Text>
        <Text>{report.state}</Text>
      </Text>
      <Text style={[styles.titleLeft, styles.bold]}>Descripción: </Text>
      <Text style={styles.description}>{report.description}</Text>

      <Text style={[styles.titleLeft, styles.bold]}>Detalles:</Text>

      {details.length > 0 ? (
        details.map((x) => (
          <Text style={styles.description} key={x.id}>
            {x.updateDetail}
          </Text>
        ))
      ) : (
        <Text style={styles.description}>No hay Detalles de este Reporte</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  report: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    textAlign: "center",
    paddingBottom: 10,
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
