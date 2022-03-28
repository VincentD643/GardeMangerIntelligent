import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import {
    NativeBaseProvider,
    extendTheme,
    Icon,
} from "native-base";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import Constants from 'expo-constants';
import store from "./reducers/store"
import colors from "./theme"
import GardeManger from "./components/GardeManger";
import GroceryList from "./components/GroceryList"
import History from "./components/History"
import BarcodeScannerCamera from "./components/BarcodeScannerCamera";
import ProductForm from "./components/ProductForm";
import ContainerForm from "./components/ContainerForm"
import QRCodeScreen from "./components/QRCodeScreen"

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
            <ProductFormStack.Screen name="GardeManger" component={GardeManger}/>
            <ProductFormStack.Screen name="ProductForm" component={ProductForm}/>
            <ProductFormStack.Screen name="ContainerForm" component={ContainerForm}/>
            <ProductFormStack.Screen name="BarcodeScannerCamera" component={BarcodeScannerCamera}/>
            <ProductFormStack.Screen name="QRCodeScreen" component={QRCodeScreen}/>
        </ProductFormStack.Navigator>
    );
}

const styles = StyleSheet.create({
  app: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "#8971D0",
      flex: 1
  },
});
//https://reactnavigation.org/docs/bottom-tab-navigator/ pour les options du tab nav
//https://icons.expo.fyi/ pour les icones, essayez d'utiliser MaterialCommunityIcons
export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={<View><Text>Chargement...</Text></View>} persistor={persistor}>
        <NativeBaseProvider contentContainerStyle={{ flexGrow: 1 }} theme={theme}>
          <View style={styles.app}>
            <NavigationContainer>
              <Tab.Navigator 
                screenOptions={{
                  headerShown: false
                }}
                >
                <Tab.Screen  name="GardeMangerScreen" component={GardeMangerScreen} options={{
                  title: 'Garde Manger',
                  tabBarIcon: ({ color, size }) => (
                    <Icon as={MaterialCommunityIcons} name="food-apple" color={color} size={size} />
                  ),
                  }}/>
                <Tab.Screen name="GroceryList" component={GroceryList} options={{
                  title: 'Liste d\'épicerie',
                  tabBarIcon: ({ color, size }) => (
                    <Icon as={MaterialCommunityIcons} name="cart-outline" color={color} size={size} />
                  ),
                  }}
              />
                <Tab.Screen name="History" component={History} options={{
                  title: 'Historique',
                  tabBarIcon: ({ color, size }) => (
                    <Icon as={MaterialCommunityIcons} name="history" color={color} size={size} />
                  ),
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </View>
            
        </NativeBaseProvider>
      </PersistGate>
    </Provider>

    );
}
