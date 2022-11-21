import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@draftbit/ui";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import {
  useNavigation,
  DrawerActions,
  NavigationContainer,
} from "@react-navigation/native";
import { Image } from "@draftbit/core";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function Test() {
  return (
    <View>
      <Text>Hello there.... I am test.</Text>
    </View>
  );
}

const ROUTES = {
  Test: Test,
};

function Example({ title, children }) {
  const navigation = useNavigation();

  return (
    <ScreenContainer
      hasSafeArea={true}
      hasTopSafeArea={true}
      hasBottomSafeArea={true}
      scrollable={false}
    >
      <View style={exampleStyles.headerStyle}>
        <TouchableOpacity
          style={exampleStyles.menuButtonStyle}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image
            style={exampleStyles.menuButtonImageStyle}
            source={require("./assets/images/hamburger.png")}
          />
        </TouchableOpacity>

        <Text style={[exampleStyles.headerTextStyle]}>{title}</Text>
      </View>
      <ScreenContainer scrollable={true} hasSafeArea={false}>
        {children}
      </ScreenContainer>
    </ScreenContainer>
  );
}

export default function Generator() {
  // How do we even start this?
  // We know we want to have:
  /*
            1. An editable menu on the left side
            2. A viewable app in the center
            3. Settings for a given component on the right side.
            
            You can probably copy a lot of their ui.
            
            But try not to be obvious about it? I think we would get sued or something lol.
            
            We probably save the data as JSON somewhere in our state.
            */

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ScreenContainer
        hasSafeArea={true}
        hasTopSafeArea={true}
        hasBottomSafeArea={true}
        scrollable={false}
      >
        <ScreenContainer
          hasSafeArea={false}
          scrollable={true}
          style={{ flex: 1, backgroundColor: "pink" }}
        >
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Layout"
              drawerContentOptions={{
                activeTintColor: "rgba(90, 69, 255, 1)",
              }}
            >
              {Object.entries(ROUTES).map(([key, Screen]) => {
                return (
                  <Drawer.Screen key={key} name={key}>
                    {() => (
                      <Example title={key}>
                        <Screen theme={{}} />
                      </Example>
                    )}
                  </Drawer.Screen>
                );
              })}
            </Drawer.Navigator>
          </NavigationContainer>
        </ScreenContainer>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

// function Example({ title, children }) {
//   const navigation = useNavigation();

//   return (
//     <ScreenContainer
//       hasSafeArea={true}
//       hasTopSafeArea={true}
//       hasBottomSafeArea={true}
//       scrollable={false}
//     >
//       <View style={exampleStyles.headerStyle}>
//         <TouchableOpacity
//           style={exampleStyles.menuButtonStyle}
//           onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//         >
//           <Image
//             style={exampleStyles.menuButtonImageStyle}
//             source={require("./assets/images/hamburger.png")}
//           />
//         </TouchableOpacity>

//         <Text style={[exampleStyles.headerTextStyle]}>{title}</Text>
//       </View>
//       <ScreenContainer scrollable={true} hasSafeArea={false}>
//         {children}
//       </ScreenContainer>
//     </ScreenContainer>
//   );
// }

// function Examples() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         initialRouteName="Layout"
//         drawerContentOptions={{
//           activeTintColor: "rgba(90, 69, 255, 1)",
//         }}
//       >
//         {Object.entries(ROUTES).map(([key, Screen]) => {
//           return (
//             <Drawer.Screen key={key} name={key}>
//               {() => (
//                 <Example title={key}>
//                   <Screen theme={{}} />
//                 </Example>
//               )}
//             </Drawer.Screen>
//           );
//         })}
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   const [loaded] = Font.useFonts(customFonts);

//   if (!loaded) {
//     return <AppLoading />;
//   }

//   return (
//     <Provider theme={DefaultTheme}>
//       <SafeAreaProvider initialMetrics={initialWindowMetrics}>
//         <Examples />
//       </SafeAreaProvider>
//     </Provider>
//   );
// }
const exampleStyles = StyleSheet.create({
  mainParent: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(251, 252, 253, 1)",
  },
  headerStyle: {
    flexDirection: "row",
    backgroundColor: "rgba(90, 69, 255, 1)",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "10%",
    maxHeight: 60,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  menuButtonStyle: {
    flex: 0.2,
    alignItems: "center",
  },
  menuButtonImageStyle: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    tintColor: "white",
  },
  headerTextStyle: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    marginTop: 5,
    marginStart: "2%",
    marginBottom: 8,
    paddingVertical: 4,
  },
  scrollViewStyle: {
    paddingBottom: 20,
  },
});
