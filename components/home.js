import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, ScrollView } from "react-native";

import { Carousel, Donut } from "./index";

import { dummyData } from "../data/data";
import { circleData } from "../data/circleData";

export default Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Carousel data={dummyData} />
      <StatusBar style="auto" />
      <View
        style={{
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {circleData.map((p, i) => {
          return (
            <Donut
              key={i}
              percentage={p.percentage}
              color={p.color}
              delay={1000}
              max={p.max}
              radius={p.radius}
              texto={p.texto}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
