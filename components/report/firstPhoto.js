
import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView , Text} from 'react-native'
import { getReportPhotos } from "../services/photography";

export default class FirstPhoto extends Component {

    constructor(props) {
    super(props);
    this.state = {
      url: 'https://firebasestorage.googleapis.com/v0/b/reportmycity-5912e.appspot.com/o/asset1623987485700.PNG%3Fid%3D7302CD32-F38B-4074-BD67-05EFA7290985%26ext%3DPNG?alt=media&token=bf4436c8-c7bf-4768-a621-5e9387883fce'   
    };
}

  render() {
      const url = this.state.url;
    console.log(this.props.reportId);
    //let url = 'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png'
    let uris = "";
    const getPhotos = async () =>{
        const apiPhotos = await getReportPhotos(this.props.reportId);
        apiPhotos.map((x) => (
                uris = (uris +  "," + x.imagePath)
            ))
            uris = uris.substring(1);
            uris = uris.split(",");
            //console.log(uris);
            this.state.url = uris;
    }
      getPhotos()
      console.log(url)

    return (
      <View
        flex={1}
      >
        <Image
              
        source={{ uri: url }}
        style={styles.image}
        />
      </View>
    )
  }
}


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