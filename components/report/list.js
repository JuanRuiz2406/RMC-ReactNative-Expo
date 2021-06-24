import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import { default as FirstPhoto } from "../report/firstPhoto";
import { theme } from "../core/theme";

import { Card, Paragraph, Chip, Title, Avatar } from "react-native-paper";

let Image_Http_URL = {
  uri: "https://firebasestorage.googleapis.com/v0/b/reportmycity-5912e.appspot.com/o/032AE213-6C21-43EB-B433-139DFF5833E01621595712843.png?alt=media&token=8a52011c-c8da-4b2b-9cc2-82c9dcbc0b8f",
};

export default ({ onRefresh, refreshing, reports, onPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={reports}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.container2}>
            <Card>
              <TouchableOpacity
                style={styles.report}
                onPress={() => {
                  onPress(item);
                }}
              >
                <Card.Title
                  title={item.user.name + " " + item.user.lastname}
                  subtitle={item.createdAt}
                  left={(props) => (
                    <Avatar.Image
                      size={45}
                      source={{ uri: item.user.imgURL }}
                    />
                  )}
                />
                <FirstPhoto reportId={item.id} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.report}
                onPress={() => {
                  onPress(item);
                }}
              >
                <Card.Content>
                  <Chip
                    style={{
                      backgroundColor:
                        item.state === "Aceptado"
                          ? "#4caf50"
                          : item.state === "Procesando"
                          ? "#ff9800"
                          : item.state === "Rechazado"
                          ? "#FF0000"
                          : "#0277BD",
                      marginRight: "70.5%",
                    }}
                    selectedColor="#fff"
                  >
                    {item.state}
                  </Chip>
                  <Title style={styles.text}>{item.title}</Title>
                  <Paragraph>{item.description}</Paragraph>
                </Card.Content>
              </TouchableOpacity>
            </Card>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "3%",
    marginBottom: "1%",
  },
  container2: {
    marginTop: "5%",
    marginBottom: "5%",
  },
  image: {
    width: "96%",
    height: 200,
    borderRadius: 7,
    marginLeft: "2%",
  },
  report: {
    marginTop: "3%",
    textAlign: "center",
    paddingBottom: "2%",
  },
  title: {
    fontSize: 25,
    marginBottom: "3%",
    alignSelf: "center",
  },
  subTitleLeft: {
    fontSize: 20,
    marginTop: "3%",
    marginLeft: "3%",
    marginBottom: "1%",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: "5%",
    marginBottom: 10,
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "1%",
  },
  text: {
    fontSize: 20,
    marginTop: 15,
  },
});
