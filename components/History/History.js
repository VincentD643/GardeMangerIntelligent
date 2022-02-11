import React, { useRef, useCallback } from "react";
import {
  Icon,
  Heading,
  Box,
  Fab,
  Divider,
  Menu,
  View,
  HStack,
  Spacer,
  Pressable
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Platform,
  UIManager,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import RowItemHistory from "../DraggableSwipeListHistory/RowItemHistory";
import { setHistory } from "../../reducers/historyReducer";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}



const GardeManger = ({ navigation }) => {
  const dispatch = useDispatch();
  const itemRefs = useRef(new Map());
  const items = useSelector((state) => state.historyReducer.items)
  
  const renderItem = useCallback((params) => {
    const RowItemProps = {
      ...params,
      navigation,
      isHistory: true
    }
    return <RowItemHistory {...RowItemProps} itemRefs={itemRefs} />;
  }, []);

  
  return (
    <View style={styles.container}>
    <DraggableFlatList
      ListHeaderComponent={() => {
        return (
          <HStack style={styles.header}>
            <Heading p="4" pb="3" size="lg">
            History
            </Heading>
            <Spacer />
            <Pressable 
              onPress={() => navigation.navigate('QRCodeScreen', {
                type: "History",
              })}
              style={styles.shareButton}
              _pressed={{
                  opacity: 0.5
                }} >
            <Icon style={styles.containerIcon} size="sm" as={<MaterialCommunityIcons name={"share"}/>} color="black" />
            </Pressable>
          </HStack>
          
        )
      }}
      keyExtractor={(item) => item.key}
      data={items}
      renderItem={renderItem}
      onDragEnd={({ data }) => dispatch(setHistory(data))}
      activationDistance={20}
    />
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingRight: 15,
  },
  shareButton: {
    top: 20,
  }
  
});

export default GardeManger;