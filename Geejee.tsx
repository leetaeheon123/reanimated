import React, {useCallback, useEffect} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

// Constants
const {width, height} = Dimensions.get('window');
const HORIZONTAL_RADIUS = 100;
const INITIAL_VERTICAL_RADIUS = 100;
const FINAL_VERTICAL_RADIUS = 1;
const CENTER_X = width / 2;
const CENTER_Y = height / 4;

// Create animated components
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Geejee = () => {
  // Shared values for animation
  const verticalRadius = useSharedValue(INITIAL_VERTICAL_RADIUS);
  const rotation = useSharedValue(0);
  const degree = useSharedValue(1);

  // Function to start the animation
  const startAnimation = useCallback(() => {
    rotation.value = withTiming(90, {duration: 1000});
    degree.value = withTiming(180, {duration: 1000}, finished => {
      if (finished) {
        rotation.value = 0;
        verticalRadius.value = withTiming(
          FINAL_VERTICAL_RADIUS,
          {
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
          },
          finished => {
            if (finished) {
              degree.value = 1;
              verticalRadius.value = INITIAL_VERTICAL_RADIUS;
            }
          },
        );
      }
    });
  }, [degree, rotation, verticalRadius]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  // Animated properties for the Path
  const animatedProps = useAnimatedProps(() => {
    const angle = (degree.value * Math.PI) / 180;
    const x = HORIZONTAL_RADIUS * Math.cos(angle);
    const y = HORIZONTAL_RADIUS * Math.sin(angle);
    const isFirstAnimDone = degree.value === 180;

    const d = `
      M ${CENTER_X - (isFirstAnimDone ? HORIZONTAL_RADIUS : 0)} ${
      CENTER_Y - (isFirstAnimDone ? 0 : verticalRadius.value)
    }
      A ${HORIZONTAL_RADIUS} ${verticalRadius.value} 0 ${
      isFirstAnimDone ? 0 : 1
    } ${isFirstAnimDone ? 1 : 0} ${
      CENTER_X + (isFirstAnimDone ? HORIZONTAL_RADIUS : y)
    } ${CENTER_Y - (isFirstAnimDone ? 0 : x)}
    `;

    return {d};
  });

  // Animated style for the rotation
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.donutContainer}>
        <AnimatedSvg width={width} height={height / 2} style={animatedStyle}>
          <AnimatedPath
            animatedProps={animatedProps}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </AnimatedSvg>
      </View>

      <Pressable onPress={startAnimation} style={styles.pan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  donutContainer: {
    flex: 1,
  },
  pan: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default Geejee;
