import React from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import {
  NativeBaseProvider,
  extendTheme,
  Icon
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import store from "./reducers/store"
import colors from "./theme"
import HomeScreen from "./components/HomeScreen";
import GroceryList from "./components/GroceryList"
import History from "./components/History"
import BarcodeScannerPermissions from "./components/BarcodeScannerPermissions"
import BarcodeScannerCamera from "./components/BarcodeScannerCamera";

export const config = {
  ...colors,
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

// Define the config
let persistor = persistStore(store);
const theme = extendTheme(config);
const Tab = createBottomTabNavigator();

// Inner navigation for Scanner tab
const CameraStack = createNativeStackNavigator();
const CameraScreen = () => {
    return (
      <CameraStack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <CameraStack.Screen name="BarcodeScannerPermissions" component={BarcodeScannerPermissions} />
        <CameraStack.Screen name="BarcodeScannerCamera" component={BarcodeScannerCamera} />
      </CameraStack.Navigator>
    );
}

//https://reactnavigation.org/docs/bottom-tab-navigator/ pour les options du tab nav
//https://icons.expo.fyi/ pour les icones, essayez d'utiliser MaterialCommunityIcons
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider contentContainerStyle={{ flexGrow: 1 }} theme={theme}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                headerShown: false
              }}>
              <Tab.Screen  name="Home" component={HomeScreen} options={{
                title: 'Garde manger',
                tabBarIcon: ({ color, size }) => (
                  <Icon as={MaterialCommunityIcons} name="food-apple" color={color} size={size} />
                ),
                }}/>
              <Tab.Screen name="GroceryList" component={GroceryList} options={{
                title: 'Grocery list',
                tabBarIcon: ({ color, size }) => (
                  <Icon as={MaterialCommunityIcons} name="format-list-bulleted" color={color} size={size} />
                ),
                }}
            />
              <Tab.Screen name="History" component={History} options={{
                title: 'Product history',
                tabBarIcon: ({ color, size }) => (
                  <Icon as={MaterialCommunityIcons} name="history" color={color} size={size} />
                ),
                }}
              />
              <Tab.Screen name="Scanner" component={CameraScreen} options={{
                title: 'Scanner',
                tabBarIcon: ({ color, size }) => (
                  <Icon as={MaterialCommunityIcons} name="camera" color={color} size={size} />
                ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
