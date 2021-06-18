import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  View
} from "react-native";

let Image_Http_URL = { uri: 'https://firebasestorage.googleapis.com/v0/b/reportmycity-5912e.appspot.com/o/032AE213-6C21-43EB-B433-139DFF5833E01621595712843.png?alt=media&token=8a52011c-c8da-4b2b-9cc2-82c9dcbc0b8f' };

const Color = async (text) => {
  {
    if (text === "Aceptado") {
      <Text style={styles.textGreen}> {text}</Text>
    }
    if (text === "Procesando") {
      <Text style={styles.textYellow}> {text}</Text>
    }
    if (text === "Rechazado") {
      <Text style={styles.textRed}> {text}</Text>
    }
    <Text style={styles.textNew}> {text}</Text>
  }
}

export default ({ onRefresh, refreshing, reports, onPress }) => {
  return (
    <View>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={reports}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.report}
              onPress={() => {
                onPress(item);
              }}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Image
              
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/reportmycity-5912e.appspot.com/o/asset1623987485700.PNG%3Fid%3D7302CD32-F38B-4074-BD67-05EFA7290985%26ext%3DPNG?alt=media&token=bf4436c8-c7bf-4768-a621-5e9387883fce' }}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.viewRow}>
              <Text style={styles.subTitleLeft}>Descripcion: </Text>
              <Text style={styles.subTitleLeft}>Estado:
              <Text
                  style={{
                    color: item.state === "Aceptado" ? '#3CBA69' :
                      item.state === "Procesando" ? '#fce63f' :
                        item.state === "Rechazado" ? '#FF0000' : '#F8A513'
                  }}> {item.state}</Text>
              </Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 0.5,
                marginBottom: "4%",
                marginTop: "4%",
              }}
            ></View>
          </View>

        )}
      />

    </View>

  );
};

const styles = StyleSheet.create({
  cointarner: {
    borderBottomWidth: 0.5,
  },
  image: {
    width: '96%',
    height: 200,
    borderRadius: 7,
    marginLeft: '2%'
  },
  report: {
    marginTop: '3%',
    textAlign: "center",
    paddingBottom: '2%',
  },
  title: {
    fontSize: 25,
    marginBottom: '3%',
    alignSelf: "center",
  },
  subTitleLeft: {
    fontSize: 20,
    marginTop: '3%',
    marginLeft: '3%',
    marginBottom: '1%',
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: '5%',
    marginBottom: 10,
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginRight: '1%',
  },
  textGreen: {
    color: '#3CBA69',
  },
  textRed: {
    color: '#FF0000',
  },
  textYellow: {
    color: '#fce63f',
  },
  textNew: {
    color: '#F8A513',
  }

});
