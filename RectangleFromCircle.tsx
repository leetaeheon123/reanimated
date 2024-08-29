// import React from 'react';
// import {View} from 'react-native';
// import Svg, {Circle} from 'react-native-svg';

// const RectangleFromCircle = () => {
//   const width = 200;
//   const height = 100;
//   const strokeWidth = Math.min(width, height);

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Svg width={width} height={height}>
//         <Circle
//           cx={100}
//           cy={50}
//           r={(Math.min(width, height) - strokeWidth) / 2}
//           stroke="blue"
//           // strokeWidth={20}
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeLinecap="round"
//         />
//       </Svg>
//     </View>
//   );
// };

// export default RectangleFromCircle;

import React from 'react';
import {View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const SemiCircle = () => {
  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Svg width={size} height={size / 2}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="blue"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference / 2}
        />
      </Svg>
    </View>
  );
};

export default SemiCircle;
