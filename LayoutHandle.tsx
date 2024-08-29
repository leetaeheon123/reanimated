import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

const LayoutHandle = () => {
  // 애니메이션을 위한 Animated.Value
  const animation = useRef(new Animated.Value(100)).current;

  // Animated.Value의 애니메이션 설정
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 300,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [animation]);

  // 애니메이션 값에 따라 컴포넌트의 크기 조정
  const animatedStyle = {
    height: animation,
    width: animation,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // onLayout을 통해 크기 변화를 감지
  const handleLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    console.log(`Component Width: ${width}, Height: ${height}`);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, animatedStyle]}
        onLayout={handleLayout}>
        <Text>Animated Box</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LayoutHandle;
