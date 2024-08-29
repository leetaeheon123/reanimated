// import React, {useEffect} from 'react';
// import {View} from 'react-native';
// import Svg, {Path} from 'react-native-svg';
// import Animated, {
//   useSharedValue,
//   useAnimatedProps,
//   withTiming,
//   Easing,
//   withSequence,
// } from 'react-native-reanimated';

// const AnimatedPath = Animated.createAnimatedComponent(Path);

// const SemiCircleToLineAnimation = () => {
//   const progress = useSharedValue(0);

//   const animatedProps = useAnimatedProps(() => {
//     const radius = 80;
//     const centerX = 100;
//     const startY = 20;
//     const endY = 180;

//     let path;

//     if (progress.value <= 1) {
//       // 원에서 반원으로
//       const endAngle = (1 - progress.value) * Math.PI;
//       const largeArcFlag = progress.value <= 0.5 ? 1 : 0;
//       const endX = centerX + radius * Math.cos(endAngle);
//       const endY = startY + radius * (1 - Math.sin(endAngle));

//       path = `
//         M ${centerX} ${startY}
//         A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
//         L ${centerX} ${startY + radius}
//         Z
//       `;
//     } else {
//       // 반원에서 선으로
//       const flatteningProgress = progress.value - 1; // 0에서 1로
//       const controlY =
//         startY + radius + (endY - (startY + radius)) * flatteningProgress;

//       path = `
//         M ${centerX - radius} ${startY + radius}
//         Q ${centerX} ${controlY} ${centerX + radius} ${startY + radius}
//         L ${centerX} ${startY + radius}
//         Z
//       `;
//     }

//     return {d: path};
//   });

//   useEffect(() => {
//     progress.value = withSequence(
//       withTiming(1, {duration: 2000, easing: Easing.linear}), // 원에서 반원으로
//       withTiming(2, {duration: 2000, easing: Easing.linear}), // 반원에서 선으로
//     );
//   }, []);

//   return (
//     <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
//       <Svg height="200" width="200" viewBox="0 0 200 200">
//         <AnimatedPath animatedProps={animatedProps} fill="orange" />
//       </Svg>
//     </View>
//   );
// };

// export default SemiCircleToLineAnimation;

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

const FilledSemiCircleToLineAnimation = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    const lineThickness = 2; // 최종 선의 두께

    // 위쪽 제어점의 Y 좌표를 애니메이션 진행에 따라 조정
    const controlY = centerY - radius * (1 - progress.value);

    // 최종 Y 좌표 (선의 위치)
    const finalY = centerY - lineThickness / 2 + progress.value * lineThickness;

    const path = `
      M ${centerX - radius} ${centerY}
      Q ${centerX} ${controlY} ${centerX + radius} ${centerY}
      L ${centerX + radius} ${finalY}
      L ${centerX - radius} ${finalY}
      Z
    `;

    return {d: path};
  });

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
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

export default FilledSemiCircleToLineAnimation;
