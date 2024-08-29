// import React, {useEffect} from 'react';
// import {View} from 'react-native';
// import Svg, {Path} from 'react-native-svg';
// import Animated, {
//   useSharedValue,
//   useAnimatedProps,
//   withTiming,
// } from 'react-native-reanimated';

// const AnimatedPath = Animated.createAnimatedComponent(Path);

// const ShrinkingCircleToSemiCircle = () => {
//   const progress = useSharedValue(1);

//   const animatedProps = useAnimatedProps(() => {
//     const endAngle = progress.value * Math.PI * 2;
//     const largeArcFlag = endAngle > Math.PI ? 1 : 0;
//     const x = 100 + 80 * Math.cos(endAngle + Math.PI);
//     const y = 100 + 80 * Math.sin(endAngle + Math.PI);

//     const path = `
//       M 100 20
//       A 80 80 0 ${largeArcFlag} 0 ${x} ${y}
//       L 100 100
//       Z
//     `;

//     return {
//       d: path,
//     };
//   });

//   useEffect(() => {
//     progress.value = withTiming(0.5, {duration: 2000}); // 2초 동안 원이 반원으로 줄어듦
//   }, []);

//   return (
//     <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
//       <Svg height="200" width="200" viewBox="0 0 200 200">
//         <AnimatedPath animatedProps={animatedProps} fill="orange" />
//       </Svg>
//     </View>
//   );
// };

// export default ShrinkingCircleToSemiCircle;
import React, {useEffect} from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const ShrinkingCircleToSemiCircle = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const startAngle = (3 * Math.PI) / 2; // 270도
    const endAngle = startAngle - progress.value * Math.PI; // 270도에서 90도로
    const largeArcFlag = progress.value < 0.5 ? 1 : 0;
    const x = 100 + 80 * Math.cos(endAngle);
    const y = 100 + 80 * Math.sin(endAngle);
    const path = `
      M ${100 + 80 * Math.cos(startAngle)} ${100 + 80 * Math.sin(startAngle)}
      A 80 80 0 ${largeArcFlag} 0 ${x} ${y}
      L 100 100
      Z
    `;
    return {
      d: path,
    };
  });

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.linear,
    });
  }, []);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Svg height="200" width="200" viewBox="0 0 200 200">
        <AnimatedPath animatedProps={animatedProps} fill="orange" />
      </Svg>
    </View>
  );
};

export default ShrinkingCircleToSemiCircle;
