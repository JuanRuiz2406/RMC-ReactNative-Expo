import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import CarouselItem from "./carouselItemProfile";

const { width, height } = Dimensions.get("window");

export default Carousel = ({ data }) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CarouselItem item={item} />;
          }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        />
      </View>
    );
  }

  console.log("Please provide images");
  return null;
};

const styles = StyleSheet.create({
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
