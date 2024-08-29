import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Platform,
} from 'react-native';
import Svg, {Circle, Rect} from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {FixData} from './data';
import {PieChartData} from './PieChart';

export const LearnRectCircle = ({size = 200, strokeWidth = 20}: any) => {
  const progress = useSharedValue(0);
  const [data, setData] = useState<PieChartData>([]);

  const halfSize = size / 2;
  const radius = (size - strokeWidth) / 2;
  const pi = 2 * Math.PI * radius;

  const Percent1 = 7.7 / 100;
  const Percent2X = Percent1 * 2;
  const Percent4X = Percent1 * 4;

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
              // backgroundColor: 'gray',
            }
          }>
          <Rect
            fill={'none'}
            width={size - strokeWidth}
            height={size - strokeWidth}
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            rx={halfSize}
            stroke={'green'}
            strokeWidth={strokeWidth}
            strokeDasharray={pi}
            strokeDashoffset={pi * (1 - Percent1)}
            originX={halfSize}
            originY={halfSize}
            rotation={0}
          />

          <Rect
            fill={'none'}
            width={size - strokeWidth}
            height={size - strokeWidth}
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            rx={halfSize}
            stroke={'lightgreen'}
            strokeWidth={strokeWidth}
            strokeDasharray={pi}
            strokeDashoffset={pi * (1 - Percent2X)}
            originX={halfSize}
            originY={halfSize}
            rotation={Percent1 * 360}
          />
          <Rect
            fill={'none'}
            rx={halfSize}
            width={size - strokeWidth}
            height={size - strokeWidth}
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            stroke={'skyblue'}
            strokeWidth={strokeWidth}
            strokeDasharray={pi}
            strokeDashoffset={pi * (1 - Percent2X)}
            originX={halfSize}
            originY={halfSize}
            rotation={(Percent1 + Percent2X) * 360}
          />
          <Rect
            fill={'none'}
            width={size - strokeWidth}
            height={size - strokeWidth}
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            rx={halfSize}
            stroke={'gray'}
            strokeWidth={strokeWidth}
            strokeDasharray={pi}
            strokeDashoffset={pi * (1 - Percent4X)}
            originX={halfSize}
            originY={halfSize}
            rotation={(Percent1 + Percent2X + Percent2X) * 360}
          />
          <Rect
            fill={'none'}
            width={size - strokeWidth}
            height={size - strokeWidth}
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            stroke={'yellow'}
            rx={halfSize}
            strokeWidth={strokeWidth}
            strokeDasharray={pi}
            strokeDashoffset={pi * (1 - Percent4X)}
            originX={halfSize}
            originY={halfSize}
            rotation={(Percent1 + Percent2X + Percent2X + Percent4X) * 360}
          />
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
    transform:
      Platform.OS === 'android' ? [{rotateZ: '90deg'}] : [{rotateZ: '-90deg'}],
  },
  buttonWrap: {marginTop: 20},
});
