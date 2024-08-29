import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const LearnHalfRectCircleLine = ({
  size = 300,
  strokeWidth = 20,
}: any) => {
  const [isCircle, setIsCircle] = useState(true);
  const progress = useSharedValue(0);

  const halfSize = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const percentages = [7.7, 15.4, 7.7, 15.4, 15.4];
  const colors = ['green', 'lightgreen', 'skyblue', 'gray', 'yellow'];

  const toggleShape = () => {
    setIsCircle(!isCircle);
    progress.value = withTiming(isCircle ? 1 : 0, {duration: 1000});
  };

  const getAnimatedProps = (
    startAngle: number,
    percentage: number,
    index: number,
  ) => {
    return useAnimatedProps(() => {
      const lineWidth = (percentage / 100) * size;
      const sweepAngle = (percentage / 100) * 360;

      const x = interpolate(
        progress.value,
        [0, 1],
        [halfSize, strokeWidth / 2 + index * lineWidth],
      );
      const y = interpolate(progress.value, [0, 1], [halfSize, halfSize]);
      const width = interpolate(
        progress.value,
        [0, 1],
        [size - strokeWidth, lineWidth],
      );
      const height = interpolate(
        progress.value,
        [0, 1],
        [size - strokeWidth, strokeWidth],
      );
      const rx = interpolate(progress.value, [0, 1], [radius, 0]);

      return {
        x,
        y,
        width,
        height,
        rx,
        originX: halfSize,
        originY: halfSize,
        rotation: interpolate(progress.value, [0, 1], [startAngle, 0]),
        strokeDasharray: circumference,
        strokeDashoffset: circumference * (1 - percentage / 100),
      };
    });
  };

  let startAngle = 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>
        {isCircle ? 'Circular Chart' : 'Linear Chart'}
      </Text>
      <View style={[styles.chartContainer, {width: size, height: size}]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {percentages.map((percentage, index) => {
            const animatedProps = getAnimatedProps(
              startAngle,
              percentage,
              index,
            );
            startAngle += (percentage / 100) * 360;
            return (
              <AnimatedRect
                key={index}
                fill={colors[index]}
                strokeWidth={strokeWidth}
                animatedProps={animatedProps}
              />
            );
          })}
        </Svg>
      </View>
      <TouchableOpacity style={styles.button} onPress={toggleShape}>
        <Text style={styles.buttonText}>
          {isCircle ? 'Switch to Linear' : 'Switch to Circular'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: '700',
  },
  chartContainer: {
    // Container for the chart
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
