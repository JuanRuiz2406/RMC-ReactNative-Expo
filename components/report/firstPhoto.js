
import React, { Component, useState, useEffect } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView , Text} from 'react-native'
import { getReportPhotos } from "../services/photography";

export default ({ reportId}) => { 
    const [image, setImage] = useState(null);

    console.log(reportId);
    let url = 'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png'
    let uris = "";
    const fetchDetails = async () => {
    const apiPhotos = await getReportPhotos(reportId);
        for (let i = 0; i < apiPhotos.length; i++) {
            setImage(apiPhotos[i].imagePath);
            break;
        }
    }
    
    //console.log(image);

    useEffect(() => {
        fetchDetails();
    }, []);
    //
    console.log(image);
    return (
      <View
        flex={1}
      >
        <Image
              
        source={{ uri: image }}
        style={styles.image}
        />
      </View>
    );
};


const styles = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 40,
    flexDirection: 'row',
  },
  
    skip: {
    position: 'absolute',
    zIndex: 2,
    bottom: 80,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
    image: {
    width: '96%',
    height: 200,
    borderRadius: 7,
    marginLeft: '2%'
  },
})