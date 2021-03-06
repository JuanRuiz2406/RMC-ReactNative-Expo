import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
    return <Image source={require('../../image/ReportsMyCity.png')} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 310,
        height: 110,
        marginBottom: 20,
        marginVertical: 40,
        marginLeft: '10%'
    },
})