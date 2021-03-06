import React from "react";
import {
    HStack,
  Icon,
  Pressable,
} from "native-base"
import {
  TouchableOpacity,
  StyleSheet,
  ToastAndroid
} from "react-native";
import { useDispatch } from 'react-redux';
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {useSwipeableItemParams } from "react-native-swipeable-item";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { addItem } from "../../reducers/groceryListReducer";

const UnderLayLeftHistory = ({ item, navigation }) => {
    const dispatch = useDispatch();
    const { it, percentOpen } = useSwipeableItemParams();

    const animStyle = useAnimatedStyle(
      () => ({
        opacity: percentOpen.value,
      }),
      [percentOpen]
    );

    const addGroceryList = () => {
      dispatch(addItem(item))
      if (Platform.OS === "android") {
        ToastAndroid.show('Produit ajouté à la liste d\'épicerie.', ToastAndroid.SHORT);
      }
    }
    return (
        <Animated.View
          style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
        >
          <TouchableOpacity>
              <HStack>
                <Pressable
                    pl="4"
                    pr="5"
                    py="2"
                    onPress={() => addGroceryList()}  
                    _pressed={{
                        opacity: 0.5
                    }} 
                    bg={colors.green}
                    justifyContent="center">
                    <Icon as={<MaterialCommunityIcons name="cart-plus"/>} color="white" />
                </Pressable>
                <Pressable
                    pl="4"
                    pr="5"
                    py="2"
                    borderRightRadius="10"
                    onPress={() => navigation.navigate('ProductForm', { product: item })}  
                    _pressed={{
                        opacity: 0.5
                    }} 
                    bg={colors.green}
                    justifyContent="center">
                    <Icon as={<MaterialCommunityIcons name="playlist-plus"/>} color="white" />
                </Pressable>
              </HStack>
          </TouchableOpacity>
        </Animated.View>
      )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 60
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  },
  underlayLeft: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
   
export default UnderLayLeftHistory