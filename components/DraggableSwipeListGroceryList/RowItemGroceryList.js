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
  Dimensions
} from "react-native";
import SwipeableItem from "react-native-swipeable-item";
import { ScaleDecorator} from "react-native-draggable-flatlist";
import UnderLayLeftGroceryList from "./UnderLayLeftGroceryList"
import UnderLayRightGroceryList from "./UnderLayRightGroceryList"
const chicken = require('../../assets/chicken.png');
const windowW = Dimensions.get('window').width;

const RowItemGroceryList = ({ item, drag, itemRefs, navigation }) => {
    const formatDate = (date) => {
      const newDate = new Date(date)
      return `${newDate.getDate()}/${newDate.getMonth() +
        1}/${newDate.getFullYear()}`;
    };

    if (!item.isContainer && item.isHidden) {
      return null
    }

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
        renderUnderlayLeft={() => !item.isContainer && <UnderLayLeftGroceryList item={item} />}
        renderUnderlayRight={() => <UnderLayRightGroceryList item={item} />}
        snapPointsLeft={[120]}
        snapPointsRight={[120]}
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
                    Date d'expiration: {formatDate(item.expiration_date)}
                  </Text> : <Text>Pas d'expiration</Text>}
                </VStack>
                <Spacer />
                <Text fontSize="xs" color="coolGray.800"  _dark={{ color: 'warmGray.50' }}>
                  Qté: {item.quantity}
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
    container: {
      width: windowW,
      height: 50,

      padding: 15
    },
    containerIcon: {
      alignSelf: 'flex-end',
    },
    containerTitle: {
      color: 'black',
    },
    productName: {
      maxWidth: windowW / 2
    }
  });
  

  export default RowItemGroceryList