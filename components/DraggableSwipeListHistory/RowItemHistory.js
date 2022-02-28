import React from "react";
import {
  Text,
  View,
  HStack,
  VStack,
  Pressable,
  Avatar,
  Spacer,
} from "native-base"
import {
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SwipeableItem from "react-native-swipeable-item";
import { ScaleDecorator} from "react-native-draggable-flatlist";
import UnderLayLeftHistory from "./UnderLayLeftHistory"
import UnderLayRightHistory from "./UnderLayRightHistory"
const chicken = require('../../assets/chicken.png');

const RowItemHistory = ({ item, drag, itemRefs, navigation }) => {
    const formatDate = (date) => {
      const newDate = new Date(date)
      return `${newDate.getDate()}/${newDate.getMonth() +
        1}/${newDate.getFullYear()}`;
    };

    return (
      <ScaleDecorator>
        <SwipeableItem
        key={item.key}
        item={item}
        ref={(ref) => {
          if (ref && !itemRefs.current.get(item.key)) {
            itemRefs.current.set(item.key, ref);
          }
        }}
        onChange={({ open }) => {
          if (open) {
            // Close all other open items
            [...itemRefs.current.entries()].forEach(([key, ref]) => {
              if (key !== item.key && ref) ref.close();
            });
          }
        }}
        renderUnderlayLeft={() => <UnderLayLeftHistory item={item} navigation={navigation} />}
        renderUnderlayRight={() => <UnderLayRightHistory item={item} />}
        snapPointsLeft={[120]}
        snapPointsRight={[50]}
      >
        <View style={styles.row}>
          <TouchableOpacity onPressIn={drag}>
          <Pressable onPressIn={drag}>
             <HStack style={styles.item} alignItems="center" space={3} >
              <Avatar size="48px" source={item?.product_url ? { uri: item.product_url} : chicken}>NA</Avatar>
                <VStack>
                  <Text style={styles.productName} numberOfLines={1} color="coolGray.800"  _dark={{ color: 'warmGray.50' }}  bold>
                    {item.product_name}
                  </Text>
                  {item.expiration_date ? 
                  <Text>
                    Expiration Date: {formatDate(item.expiration_date)}
                  </Text> : <Text>No expiration</Text>}
                </VStack>
                <Spacer />
                <Text fontSize="xs" color="coolGray.800"  _dark={{ color: 'warmGray.50' }}>
                  Qty: {item.quantity}
                </Text>
              </HStack>
          </Pressable>
         </TouchableOpacity>
        </View>
      </SwipeableItem>
    </ScaleDecorator>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      width: 400

    },
    item: {
      height: 60,
      width: 400,
      paddingRight: 30,
      paddingLeft: 30
    },
    text: {
      fontWeight: "bold",
      color: "white",
      fontSize: 32,
    },
    underlayRight: {
      flex: 1,
      backgroundColor: "teal",
      justifyContent: "flex-start",
    },
    underlayLeft: {
      flex: 1,
      backgroundColor: "tomato",
      justifyContent: "flex-end",
    },
    productName: {
      maxWidth: windowW / 2
    }
  });
  

  export default RowItemHistory