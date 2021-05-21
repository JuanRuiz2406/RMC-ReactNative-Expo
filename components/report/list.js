import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
let Image_Http_URL ={ uri: 'https://firebasestorage.googleapis.com/v0/b/reportmycity-5912e.appspot.com/o/032AE213-6C21-43EB-B433-139DFF5833E01621595712843.png?alt=media&token=8a52011c-c8da-4b2b-9cc2-82c9dcbc0b8f'};
export default ({ onRefresh, refreshing, reports, onPress }) => {
  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
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

          <Text style={styles.description}>{item.description}</Text>

          <Image
          
            source={{ uri: item.imgURL}}
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
    marginBottom: 10,
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
