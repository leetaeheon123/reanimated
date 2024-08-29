/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import App from './App';
import CircularSliderReanimated1 from './ExCircle';
import {PieChart} from './PieChart';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import Geejee from './Geejee';
import TestModal from './TestModal';
import AnimatedSemiCircle from './AnimatedSemiCircle';
import ShrinkingCircleToSemiCircle from './ShrinkingCircleToSemiCircle';
import SemiCircleToLineAnimation from './SemiCircleToLineAnimation';
import RectangleFromCircle from './RectangleFromCircle';

import {LearnCircle} from './LearnCircle';
import {LearnRect} from './LearnRect';
import {TestRect} from './TestRect';
import DraggableView from './DraggableView';
import TestModal2 from './TestModal2';
import {SnappingList} from './SnappingList';

import LayoutHandle from './LayoutHandle';
import {LearnRectCircle} from './LearnRectCircle';

const AppWithGestureHandler = () => (
  <GestureHandlerRootView>
    <LearnRectCircle />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => AppWithGestureHandler);
