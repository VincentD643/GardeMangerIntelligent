import React from "react";
import {
  Icon,
  Pressable,
} from "native-base"
import {
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useDispatch } from 'react-redux';
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {useSwipeableItemParams } from "react-native-swipeable-item";
import { MaterialCommunityIcons } from "@expo/vector-icons"

const UnderlayLeft = ({ item }) => {
    const dispatch = useDispatch();
    const { it, percentOpen } = useSwipeableItemParams();
    const animStyle = useAnimatedStyle(
      () => ({
        opacity: percentOpen.value,
      }),
      [percentOpen]
    );
    return (
        <Animated.View
          style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
        >
          <TouchableOpacity>
            <Pressable
                  pl="4"
                  pr="5"
                  py="2"
                  borderRightRadius="10"
                  onPress={() => console.log("add to liste epicerie")}  
                  _pressed={{
                    opacity: 0.5
                  }} 
                  bg={colors.green}
                  justifyContent="center">
                  <Icon as={<MaterialCommunityIcons name="playlist-plus"/>} color="white" />
            </Pressable>
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