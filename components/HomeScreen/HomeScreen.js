import React from "react";
import {
  IconButton,
  Icon,
  Text
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import StyledHomeScreen from "./styled";

const GroceryListScreen = ({ navigation }) => {
  const iconButtonProps = {
    onPress: () => navigation.navigate('BarcodeScannerScreen'),
    icon:<Icon as={MaterialCommunityIcons} name="plus-circle" />,
    borderRadius:"full",
    _icon:{
      color: "orange.500",
      size: "md",
    },
    _hover:{
      bg: "orange.600:alpha.20",
    },
    _pressed:{
      bg: "orange.600:alpha.20",
      _icon: {
        name: "plus",
      },
      _ios: {
        _icon: {
          size: "2xl",
        },
      },
    },
    _ios:{
      _icon: {
        size: "2xl",
      },
    }
  }
  return (
    <>
      <Text>Hello</Text>
      <IconButton {...iconButtonProps}/>
    </>
    
  );
}

const HomeScreen = () => {
    return (
      <StyledHomeScreen>
        <Text>Test</Text>
      </StyledHomeScreen>
    )
};

  export default HomeScreen;