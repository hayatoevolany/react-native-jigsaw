import color from "color";
import themeT from "./DefaultTheme";
// import * as Colors from "./colors";
// import { Animated } from "react-native";

export default function shadow(elevation: number, theme: typeof themeT) {
  if (theme.elevation[elevation]) {
    const { borderOpacity, ...themeElevation } = theme.elevation[elevation];
    themeElevation.borderColor = color(themeElevation.borderColor)
      .alpha(borderOpacity)
      .rgb()
      .string();

    return themeElevation;
  } else return theme.elevation[0];
}

// const SHADOW_COLOR = Colors.black;
// const SHADOW_OPACITY = 0.24;

// export default function shadow(elevation: number | Animated.Value = 0) {
//   if (elevation instanceof Animated.Value) {
//     const inputRange = [0, 1, 2, 3, 8, 24];

//     return {
//       shadowColor: SHADOW_COLOR,
//       shadowOffset: {
//         width: new Animated.Value(0),
//         height: elevation.interpolate({
//           inputRange,
//           outputRange: [0, 0.5, 0.75, 2, 7, 23],
//         }),
//       },
//       shadowOpacity: new Animated.Value(SHADOW_OPACITY),
//       shadowRadius: elevation.interpolate({
//         inputRange,
//         outputRange: [0, 0.75, 1.5, 3, 8, 24],
//       }),
//     };
//   } else {
//     if (elevation === 0) {
//       return {};
//     }

//     let height, radius;
//     switch (elevation) {
//       case 1:
//         height = 0.5;
//         radius = 0.75;
//         break;
//       case 2:
//         height = 0.75;
//         radius = 1.5;
//         break;
//       default:
//         height = elevation - 1;
//         radius = elevation;
//     }

//     return {
//       shadowColor: SHADOW_COLOR,
//       shadowOffset: {
//         width: 0,
//         height,
//       },
//       shadowOpacity: SHADOW_OPACITY,
//       shadowRadius: radius,
//     };
//   }
// }
