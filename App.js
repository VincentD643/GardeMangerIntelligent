import React from "react";
import { Provider } from 'react-redux';
import store from "./reducers/store"
import {
  NativeBaseProvider,
  extendTheme,
  Icon
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import HomeScreen from "./components/HomeScreen";
import GroceryList from "./components/GroceryList"
import History from "./components/History"

// Define the config
const config = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
const Tab = createBottomTabNavigator();

//https://reactnavigation.org/docs/bottom-tab-navigator/ pour les options du tab nav
//https://icons.expo.fyi/ pour les icones, essayez d'utiliser MaterialCommunityIcons
export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen  name="Home" component={HomeScreen} options={{
              title: 'Garde manger',
              tabBarIcon: ({ color, size }) => (
                <Icon as={MaterialCommunityIcons} name="food-apple" color={color} size={size} />
              ),
              }}/>
            <Tab.Screen name="GroceryList" component={GroceryList} options={{
              title: 'Liste d\'épicerie',
              tabBarIcon: ({ color, size }) => (
                <Icon as={MaterialCommunityIcons} name="format-list-bulleted" color={color} size={size} />
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
      </NativeBaseProvider>
    </Provider>
  );
}
