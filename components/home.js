import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import Carousel from './carousel'
import { dummyData } from '../data/data'
import Donut from './donutChart'
import { circleData } from '../data/circleData'

const Home = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                {circleData.map((p, i) => {
                    return <Donut key={i} percentage={p.percentage} color={p.color} delay={1000} max={p.max} radius={p.radius} texto={p.texto} />
                })}
            </View>

        </ScrollView>
    );
};

export default Home;