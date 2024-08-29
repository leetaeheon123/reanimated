import React, {useEffect} from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedSemiCircle = () => {
  const progress = useSharedValue(1);

  const animatedProps = useAnimatedProps(() => {
    const endAngle = progress.value * Math.PI * 2;
    const largeArcFlag = endAngle > Math.PI ? 1 : 0;
    const x = 50 + 40 * Math.cos(endAngle);
    const y = 50 + 40 * Math.sin(endAngle);

    const path = `
      M 1 1
      A 40 40 0 ${largeArcFlag} 1 ${x} ${y}
      L 50 50
      Z
    `;

    return {
      d: path,
    };
  });

  useEffect(() => {
    progress.value = withTiming(0.5, {duration: 2000}); // 2초 동안 원이 반원으로 줄어듦
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 200,
          height: 200,
          backgroundColor: 'gray',
        }}>
        <Svg height="100" width="100" viewBox="0 0 100 100">
          <AnimatedPath animatedProps={animatedProps} fill="orange" />
        </Svg>
      </View>
    </View>
  );
};

export default AnimatedSemiCircle;
