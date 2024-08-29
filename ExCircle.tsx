import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const innerBoxSize = 60;
const outerRingSize = 200;
const borderWidth = 2;
const comeOutOffset = innerBoxSize / 2 - borderWidth / 2;

function CircularSlider() {
  const x = useSharedValue(0);
  const y = useSharedValue(-(outerRingSize / 2) + borderWidth / 2);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      const maxMove = (outerRingSize - innerBoxSize) / 2 + comeOutOffset;
      const angle1 = Math.atan2(
        event.translationY + ctx.startY,
        event.translationX + ctx.startX,
      );
      const yValue = Math.sin(angle1) * maxMove;
      const xValue = Math.cos(angle1) * maxMove;
      x.value = xValue;
      y.value = yValue;
      console.log(x.value, y.value);
    },
  });

  // useEffect(() => {
  //   let count = 0;

  //   const interval = setInterval(() => {
  //     if (count < 3) {
  //       x.value = x.Value + 10;
  //       y.value = y.Value + 10;
  //       count++;
  //     } else {
  //       clearInterval(interval); // 10번 실행되면 반복 종료
  //     }
  //   }, 2000); // 2초 간격

  //   return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
  // }, []);

  const _style = useAnimatedStyle(() => ({
    transform: [{translateX: x.value}, {translateY: y.value}],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.outer} />
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.box, _style]} />
      </PanGestureHandler>
    </View>
  );
}

export default function CircularSliderReanimated1() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.flex}>
        <CircularSlider />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: innerBoxSize,
    width: innerBoxSize,
    borderRadius: innerBoxSize,
    backgroundColor: '#000',
  },
  outer: {
    height: outerRingSize,
    width: outerRingSize,
    borderRadius: outerRingSize,
    borderWidth: borderWidth,
    borderColor: '#000',
    position: 'absolute',
  },
});
