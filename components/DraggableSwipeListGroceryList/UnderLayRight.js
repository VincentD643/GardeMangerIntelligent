import React from "react";
import {
    Icon,
    Heading,
    Box,
    Text,
    Pressable,
    HStack,
    Avatar,
    VStack,
    Spacer,
    Fab,
    Divider,
    Menu,
    Center
  } from "native-base"
import {
    TouchableOpacity,
    StyleSheet
  } from "react-native";
import { useDispatch } from 'react-redux';
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {useSwipeableItemParams } from "react-native-swipeable-item";
import { removeItem } from "../../reducers/groceryListReducer";
import { closeOpenContainer } from "../../reducers/groceryListReducer";
import { addHistory } from "../../reducers/historyReducer";

const  UnderlayRight = ({ item }) => {
    const dispatch = useDispatch()
    const { close } = useSwipeableItemParams()
    const { it, percentOpen } = useSwipeableItemParams();
    const animStyle = useAnimatedStyle(
      () => ({
        opacity: percentOpen.value,
      }),
      [percentOpen]
    );

    const deleteProduct = () => {
        close();
        if (item.isContainer && item.isClosed) {
            dispatch(closeOpenContainer(item))
        }
        if (!item.isContainer) {
          dispatch(addHistory(item))
        }
        dispatch(removeItem(item))
    };

    return (
      <Animated.View style={[styles.row, styles.underlayRight, animStyle]}>
        <TouchableOpacity onPressOut={close}>
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