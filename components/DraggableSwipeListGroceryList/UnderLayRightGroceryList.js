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
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import {useSwipeableItemParams } from "react-native-swipeable-item";
import { removeItem, reduceQuantity } from "../../reducers/groceryListReducer";

const  UnderLayRightGroceryList = ({ item }) => {
    const dispatch = useDispatch()
    const { close } = useSwipeableItemParams()
    const { it, percentOpen } = useSwipeableItemParams();
    const animStyle = useAnimatedStyle(
      () => ({
        opacity: percentOpen.value,
      }),
      [percentOpen]
    );

    const decrementQuantity = () => {
      dispatch(reduceQuantity(item))
      if (Platform.OS === "android") {
        const newQty = item.quantity - 1
        ToastAndroid.show('La quantité est maintenant: ' + newQty, ToastAndroid.SHORT);
      }
    }
    const deleteProduct = () => {
        close();
        dispatch(removeItem(item))
        if (Platform.OS === "android") {
          ToastAndroid.show('Produit supprimé de la liste d\'épicerie.', ToastAndroid.SHORT);
        }
    };

    return (
      <Animated.View style={[styles.row, styles.underlayRight, animStyle]}>
        <TouchableOpacity onPressOut={close}>
          <HStack>
            <Pressable 
                pl="4"
                pr="5"
                py="2"
                borderLeftRadius="10"
                onPress={() => deleteProduct()}  
                _pressed={{
                opacity: 0.5
                }} 
                bg={colors.error}
                justifyContent="center">
                <Icon as={<MaterialCommunityIcons name="delete"/>} color='white'/>
            </Pressable>
            <Pressable
                    pl="4"
                    pr="5"
                    py="2"
                    onPress={() => decrementQuantity()}  
                    _pressed={{
                        opacity: 0.5
                    }} 
                    bg={colors.error}
                    justifyContent="center">
                    <Icon as={<MaterialIcons name="exposure-minus-1"/>} color="white" />
              </Pressable>
            </HStack>
        </TouchableOpacity>
      </Animated.View>
    );
  }
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 100
    },
    text: {
      fontWeight: "bold",
      color: "white",
      fontSize: 32,
    },
    underlayRight: {
      flex: 1,
      justifyContent: "flex-start",
    },
  });
  
  export default UnderLayRightGroceryList