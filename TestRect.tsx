import React, {useCallback} from 'react';
import {SafeAreaView, Button, View} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const TestRect = ({size = 400, strokeWidth = 20}) => {
  const fourSize = size / 4;

  const animatedHeight = useSharedValue(fourSize);
  const animatedRx = useSharedValue(200); // rx의 초기값을 50으로 변경

  const startAnimation = useCallback(() => {
    animatedHeight.value = withTiming(10, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    animatedRx.value = withTiming(10, {
      // rx를 50에서 10으로 변경하는 애니메이션 추가
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [animatedHeight, animatedRx, fourSize]);

  const animatedProps = useAnimatedProps(() => {
    return {
      height: animatedHeight.value,
      rx: animatedRx.value,
      ry: animatedRx.value, // ry도 rx와 같이 변경되도록 추가
    };
  });

  return (
    <SafeAreaView>
      <View>
        <Svg
          width={size}
          height={size / 2} // 높이를 반으로 줄여 반원 형태로 표시
          style={{
            backgroundColor: 'gray',
          }}>
          <AnimatedRect
            animatedProps={animatedProps}
            fill={'none'}
            x={0}
            y={0}
            width={size}
            height={size} // 높이를 size로 설정하여 반원 형태 유지
            stroke={'red'}
            strokeWidth={2.5}
            fillOpacity={1}
          />
        </Svg>
        <Button title="애니메이션 시작" onPress={startAnimation} />
      </View>
    </SafeAreaView>
  );
};
