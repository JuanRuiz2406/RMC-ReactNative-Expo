import React from 'react';
import { View, StyleSheet } from 'react-native';

export function AuthContainer({ children }) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        paddingTop: 100,
        alignItems: 'center',
    },
});