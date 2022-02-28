import React from "react";
import {
  HStack,
  Icon,
  Pressable,
} from "native-base"
import {
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { useDispatch } from 'react-redux';
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {useSwipeableItemParams } from "react-native-swipeable-item";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { addItem } from "../../reducers/groceryListReducer";
import { addItem as addItemGardeManger } from "../../reducers/gardeMangerReducer"


const UnderlayLeft = ({ item }) => {
    const dispatch = useDispatch();
    const { it, percentOpen } = useSwipeableItemParams();

    const animStyle = useAnimatedStyle(
      () => ({
        opacity: percentOpen.value,
      }),
      [percentOpen]
    );

    const incrementQuantity = () => {
      dispatch(addItemGardeManger(item))
      if (Platform.OS === "android") {
        const newQty = item.quantity + 1
        ToastAndroid.show('La quantité est maintenant: ' + newQty, ToastAndroid.SHORT);
      }
    }

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
                onPress={() => incrementQuantity()}  
                _pressed={{
                    opacity: 0.5
                }} 
                bg={colors.green}
                justifyContent="center">
                <Icon as={<MaterialIcons name="exposure-plus-1"/>} color="white" />
            </Pressable>
            <Pressable
                  pl="4"
                  pr="5"
                  py="2"
                  borderRightRadius="10"
                  onPress={() => addGroceryList()}  
                  _pressed={{
                    opacity: 0.5
                  }} 
                  bg={colors.green}
                  justifyContent="center">
                  <Icon as={<MaterialCommunityIcons name="cart-plus"/>} color="white" />
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
   
export default UnderlayLeft