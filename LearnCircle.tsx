import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {FixData, generatePieChartData} from './data';
import {PieChartData} from './PieChart';

type LearnCircleProps = {
  size?: number;
  strokeWidth?: number;
};

export type LearnCircleDataItem = {
  color: string;
  percent: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type LearnCircleData = LearnCircleDataItem[];

export const LearnCircleSegment: FC<{
  center: number;
  radius: number;
  strokeWidth: number;
  color: string;
  circumference: number;
  angle: number;
  percent: number;
  progress: Animated.SharedValue<number>;
}> = ({
  center,
  radius,
  strokeWidth,
  circumference,
  color,
  angle,
  percent,
  progress,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * (1 - percent)],
    );
    const rotateAngle = interpolate(progress.value, [0, 1], [0, angle]);

    return {
      strokeDashoffset,
      transform: [
        {translateX: center},
        {translateY: center},
        {rotate: `${rotateAngle}deg`},
        {translateX: -center},
        {translateY: -center},
      ],
    };
  });

  return (
    <AnimatedCircle
      cx={center}
      cy={center}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={color}
      strokeDasharray={circumference}
      originX={center}
      originY={center}
      // @ts-ignore
      fill="none"
      animatedProps={animatedProps}
    />
  );
};

export const LearnCircle = ({
  size = 200,
  strokeWidth = 20,
}: LearnCircleProps) => {
  const progress = useSharedValue(0);
  const [data, setData] = useState<PieChartData>([]);

  const halfSize = size / 2;
  const radius = (size - strokeWidth) / 2;
  const pi = 2 * Math.PI * radius;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
      }}>
      <Text style={styles.titleStyle}>Pie Chart</Text>
      <View
        style={[
          {
            width: size,
            height: size,
            // backgroundColor: 'skyblue',
          },
          styles.rotate,
        ]}>
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={
            {
              // transform: [{rotateZ: '-90deg'}],
              // backgroundColor: 'gray',
            }
          }>
          <Circle
            fill={'none'}
            r={radius}
            cx={halfSize}
            cy={halfSize}
            stroke={'red'}
            strokeWidth={strokeWidth}
            strokeDasharray={pi}
            strokeDashoffset={pi * 0.75}
            originX={halfSize}
            originY={halfSize}
            rotation={90}
            // strokeDashoffset={314.16}
            // strokeDasharray={'314.16 50'}
          ></Circle>
          {/* <Circle
            fill={'none'}
            r={radius}
            cx={halfSize}
            cy={halfSize}
            stroke={'blue'}
            strokeWidth={strokeWidth}
            strokeDasharray={pi}
            strokeDashoffset={pi * 0.75}
            // strokeDashoffset={314.16}
            // strokeDasharray={'314.16 50'}
          /> */}
        </Svg>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: 'center',
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: '700',
  },
  rotate: {
    transform: [{rotateZ: '-90deg'}],
  },
  buttonWrap: {marginTop: 20},
});
