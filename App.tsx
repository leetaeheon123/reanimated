import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import First from './First';
import CircularSliderReanimated1 from './ExCircle';
import {PieChart} from './PieChart';

const App = () => {
  const rotation = useSharedValue(0);

  // rotation 값을 계속 업데이트
  const rotate = useDerivedValue(() => {
    return withTiming(rotation.value, {duration: 2000});
  });

  // 애니메이션 시작
  useEffect(() => {
    rotation.value = 180; // 360도 회전
  }, []);

  // 회전 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotate.value}deg`}],
    };
  });

  return (
    // <View style={styles.container}>
    //   <Animated.View style={[styles.circle, animatedStyle]} />
    // </View>

    // <First />

    <View style={styles.container}>
      <PieChart />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: 428,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
  },
});

export default App;
