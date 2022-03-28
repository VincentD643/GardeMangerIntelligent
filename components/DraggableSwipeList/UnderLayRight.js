import React from "react";
import {
    Icon,
    Pressable,
    HStack,
  } from "native-base"
import {
    TouchableOpacity,
    StyleSheet,
    ToastAndroid,
  } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import {useSwipeableItemParams } from "react-native-swipeable-item";
import { removeItem, reduceQuantity } from "../../reducers/gardeMangerReducer";
import { closeOpenContainer } from "../../reducers/gardeMangerReducer";
import { addHistory } from "../../reducers/historyReducer";

const  UnderlayRight = ({ item }) => {
    const dispatch = useDispatch()
    const items = useSelector((state) => state.gardeMangerReducer.items)
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
        if (!item.isContainer) {
            dispatch(addHistory(item))
        }
      if (Platform.OS === "android") {
        const newQty = item.quantity > 0 ? item.quantity - 1 : item.quantity
        ToastAndroid.show('La quantité est maintenant: ' + newQty, ToastAndroid.SHORT);
      }
    }
    
    const deleteProduct = () => {
        close();
        if (item.isContainer && item.isClosed) {
            dispatch(closeOpenContainer(item))
        }
        let containerFound = null
        if (!item.isContainer) {
          let products = JSON.parse(JSON.stringify(items))
          let index = products.findIndex(product => product.product_name === item.product_name)
          if (index >= 0) {
            let tempArray = products.splice(0, index);
            for (let i = tempArray.length - 1; i >= 0; i--){
              if (tempArray[i].isContainer) {
                containerFound = tempArray[i]
                break
              }
            }
          }
          console.log("found", containerFound)
          dispatch(addHistory({...item, containerInfo: containerFound}))
        }
        dispatch(removeItem(item))
        if (Platform.OS === "android") {
          ToastAndroid.show('Produit/Séparateur supprimé.', ToastAndroid.SHORT);
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
            {!item.isContainer && <Pressable
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
              </Pressable>}
          
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
  
  export default UnderlayRight