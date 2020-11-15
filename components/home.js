import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Carousel from './carousel'
import { dummyData } from '../data/data'
import Donut from './donutChart'


const data = [
    {
        percentage: 8,
        color: 'tomato',
        max: 10,
        radius: 50,
    },
    {
        percentage: 14,
        color: 'skyblue',
        max: 20,
        radius: 50,
    },
    {
        percentage: 92,
        color: 'gold',
        max: 100,
        radius: 50,
    }
]

export default class Home extends React.Component {
    render() {
        return (
            <View>
                <Carousel data={dummyData} />
                <StatusBar style="auto" />
                <View
                    style={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap',
                        flexDirection: 'row'
                    }}>
                    {data.map((p, i) => {
                        return <Donut key={i} percentage={p.percentage} color={p.color} delay={1000} max={p.max} radius={p.radius} />
                    })}
                </View>

            </View>
        );
    }
}