import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MIN_HEIGHT = SCREEN_HEIGHT * 0.4;
const MAX_HEIGHT = SCREEN_HEIGHT * 0.7;

const DraggableView = () => {
  const translateY = useSharedValue(0); // 드래그에 따라 변화할 값

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(MIN_HEIGHT + translateY.value, {
        damping: 20,
        stiffness: 90,
      }),
    };
  });

  const handleGesture = event => {
    const newHeight = event.translationY;
    if (newHeight < 0) {
      // 드래그가 위쪽으로 움직일 때
      translateY.value = Math.max(-MIN_HEIGHT, newHeight);
    } else {
      // 드래그가 아래쪽으로 움직일 때
      translateY.value = Math.min(MAX_HEIGHT - MIN_HEIGHT, newHeight);
    }
  };

  return (
    <GestureHandlerRootView>
      {/* SVG가 포함된 다른 뷰 */}
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.text}>This is the top view with an SVG.</Text>
          {/* SVG 컴포넌트가 여기에 올 수 있습니다 */}
        </View>

        {/* 드래그 가능한 뷰 */}
        <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View style={[styles.draggableView, animatedStyle]}>
            <Text style={styles.text}>This view can be dragged!</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  topView: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  draggableView: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 20,
    fontSize: 18,
  },
});

export default DraggableView;
