import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default class Profile extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titleBar}>
                        <Ionicons name="ios-arrow-back" size={24} color="#52575D" />
                        <Ionicons name="md-more" size={24} color="#52575D" />
                    </View>

                    <View style={{ alignSelf: "center" }}>
                        <View style={styles.profileImage}>
                            <Image source={require('../image/Diego.jpg')} style={styles.image} resizeMode="center" />
                        </View>
                        <View style={styles.add}>
                            <Ionicons name="ios-add" size={40} color="#FEB139" />
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Diego</Text>
                        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Villarreal</Text>
                    </View>

                    <View style={styles.infoUserContainer}>
                        <Text style={styles.textTitle}>Cedula:</Text>
                        <Text style={styles.textSecond}>5 0420 0201</Text>
                        <Text style={styles.textTitle}>Correo:</Text>
                        <Text style={styles.textSecond}>diegovillatj@gmail.com</Text>
                        <Text style={styles.textTitle}>Ccontraseña:</Text>
                        <Text style={styles.textSecond}>*******</Text>
                        <Text style={styles.textTitle}>Provincia:</Text>
                        <Text style={styles.textSecond}>Guanacaste</Text>
                        <Text style={styles.textTitle}>Cantón:</Text>
                        <Text style={styles.textSecond}>Liberia</Text>
                        <Text style={styles.textTitle}>Numero de Celular:</Text>
                        <Text style={styles.textSecond}>+506 8888 8888</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontFamily: "HelveticaNeue",
        backgroundColor: "#fff"
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 200,
        overflow: "hidden",

    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    infoUserContainer: {
        alignSelf: "auto",
        alignItems: "flex-start",
        marginLeft: 20,
        marginTop: 20
    },
    textTitle: {
        fontSize: 30,
        fontWeight: "normal",
        lineHeight: 50,
        fontFamily: "HelveticaNeue",
    },
    textSecond: {
        fontSize: 25,
        fontWeight: "normal",
        marginLeft: 40,
        color: "#AEB5BC"
    }
});