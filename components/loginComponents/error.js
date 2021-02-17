import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export function Error({ error }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{error}</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },

    text: {
        color: '#ff0707',
        fontWeight: 'bold',
        fontSize: 14,

    }
});