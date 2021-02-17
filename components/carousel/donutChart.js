import React from "react";
import { View, Text, Animated, TextInput, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export default function Donut({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = "tomato",
  delay = 500,
  textColor,
  max = 100,
  texto = "Casos Atendidos",
}) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const circleRef = React.useRef();
  const inputRef = React.useRef();

  const Animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start(() => {
      Animation(toValue === 0 ? percentage : 0);
    });
  };

  React.useEffect(() => {
    Animation(percentage);

    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }

      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage]);
  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            startOffset={circleCircumference / 2}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <TextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: textColor ?? color },
          { fontWeight: "900", textAlign: "center" },
        ]}
      />
      <Text
        style={{
          fontWeight: "bold",
          textDecorationLine: "none",
          textAlign: "center",
          fontSize: 20,
          lineHeight: 40,
        }}
      >
        {texto}
      </Text>
    </View>
  );
}

/*const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
});*/
