import React from "react";
import { View, Text } from 'react-native' 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import {
  NativeBaseProvider,
  extendTheme,
  Icon,
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import store from "./reducers/store"
import colors from "./theme"
import GardeManger from "./components/GardeManger";
import GroceryList from "./components/GroceryList"
import History from "./components/History"
import BarcodeScannerCamera from "./components/BarcodeScannerCamera";
import ProductForm from "./components/ProductForm";
import ContainerForm from "./components/ContainerForm"
import QRCodeScreen from "./components/QRCodeScreen"
import Notification from "./components/Notification";

export const config = {
  ...colors,
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

// Define the config
let persistor = persistStore(store);
const theme = extendTheme(config);
const Tab = createBottomTabNavigator();

// Inner navigation for GardeManger tab
const ProductFormStack = createNativeStackNavigator();
const GardeMangerScreen = () => {
    return (
      <ProductFormStack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <ProductFormStack.Screen name="GardeManger" component={GardeManger} />
        <ProductFormStack.Screen name="ProductForm" component={ProductForm} />
        <ProductFormStack.Screen name="ContainerForm" component={ContainerForm}/>
        <ProductFormStack.Screen name="BarcodeScannerCamera" component={BarcodeScannerCamera} />
        <ProductFormStack.Screen name="QRCodeScreen" component={QRCodeScreen}/>
      </ProductFormStack.Navigator>
    );
}

//https://reactnavigation.org/docs/bottom-tab-navigator/ pour les options du tab nav
//https://icons.expo.fyi/ pour les icones, essayez d'utiliser MaterialCommunityIcons
export default function App(){

  return (
    <Provider store={store}>
      <PersistGate loading={<View><Text>Loading...</Text></View>} persistor={persistor}>
        <Notification/>
        <NativeBaseProvider contentContainerStyle={{ flexGrow: 1 }} theme={theme}>
            <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                headerShown: false
              }}>
              <Tab.Screen  name="GardeMangerScreen" component={GardeMangerScreen} options={{
                title: 'Garde manger',
                tabBarIcon: ({ color, size }) => (
                  <Icon as={MaterialCommunityIcons} name="food-apple" color={color} size={size} />
                ),
                }}/>
              <Tab.Screen name="GroceryList" component={GroceryList} options={{
                title: 'Grocery list',
                tabBarIcon: ({ color, size }) => (
                  <Icon as={MaterialCommunityIcons} name="cart-outline" color={color} size={size} />
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
            </Tab.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>

  );
}
