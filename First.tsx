import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function First() {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withTiming(width.value + 50);
  };

  // useEffect(() => {
  //   let count = 0;

  //   const interval = setInterval(() => {
  //     if (count < 10) {
  //       width.value = withTiming(width.value + 50);
  //       count++;
  //     } else {
  //       clearInterval(interval); // 10번 실행되면 반복 종료
  //     }
  //   }, 2000); // 2초 간격

  //   return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
  // }, []);

  // 지금 처럼 길이가 축소되는 코드가 모달의 올라옴 비율에 따라 자동으로 실행되도록 해보자

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     width: width.value,
  //   };
  // });

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Animated.View
        style={[
          {
            height: 100, // 반원의 높이를 설정
            backgroundColor: 'violet',
            marginTop: 200,
            borderBottomLeftRadius: 50, // 반원의 하단 왼쪽을 둥글게
            borderBottomRightRadius: 50, // 반원의 하단 오른쪽을 둥글게
            borderTopLeftRadius: 50, // 반원의 상단 왼쪽을 둥글게
            borderTopRightRadius: 50, // 반원의 상단 오른쪽을 둥글게
            overflow: 'hidden', // 둥근 반원 모양 유지
            width,
          },
        ]}
      />
    </View>
  );
}
