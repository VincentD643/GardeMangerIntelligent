import React from "react";
import {
  Icon,
  Pressable,
  HStack
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
import {addItem} from "../../reducers/gardeMangerReducer";
import {reduceQuantity, addItem as addItemGroceryList} from "../../reducers/groceryListReducer";
import {addHistory} from "../../reducers/historyReducer";

const UnderLayLeftGroceryList = ({ item }) => {
    const dispatch = useDispatch();
    const { it, percentOpen, close } = useSwipeableItemParams();
    const animStyle = useAnimatedStyle(
      () => ({
        opacity: percentOpen.value,
      }),
      [percentOpen]
    );

    const incrementQuantity = () => {
      dispatch(addItemGroceryList(item))
        if (!item.isContainer) {
            dispatch(addHistory(item))
        }
      if (Platform.OS === "android") {
        const newQty = item.quantity + 1
        ToastAndroid.show('La quantité est maintenant: ' + newQty, ToastAndroid.SHORT);
      }
    }
    const addProduct = () => {
        close();
        dispatch(addItem(item))
        if (!item.isContainer) {
            dispatch(addHistory(item))
        }
        dispatch(reduceQuantity(item))
        if (Platform.OS === "android") {
          ToastAndroid.show('Produit ajouté au Garde Manger.', ToastAndroid.SHORT);
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
                    onPress={() => addProduct()}
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
   
export default UnderLayLeftGroceryList