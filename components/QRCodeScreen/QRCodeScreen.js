import React, { useState } from 'react';
import {
  Heading,
  Center,
  View,
  Text,
  Pressable,
  Icon,
  HStack
} from "native-base"
import {
  StyleSheet,
  Dimensions,
  ToastAndroid,
  Platform
} from "react-native";
import { useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import QRCode from 'react-native-qrcode-svg';

const windowH = Dimensions.get('window').height;

const copyToClipboard = (items) => {
  let groceryListString = "";
  for (let i = 0; i < items.length; i++){
    groceryListString = groceryListString.concat(items[i]?.product_name ? "\u2022 " + items[i].product_name  : items[i].container_name + "\n")
    if (!items[i]?.isContainer) {
      groceryListString = groceryListString.concat(" : " + items[i].quantity + "\n")
    }
  }
  Clipboard.setString(groceryListString);
  if (Platform.OS === "android") {
    ToastAndroid.show('Liste Copier dans le presse-papier.', ToastAndroid.SHORT);
  }
  
};


const QRCodeScreen = ({ navigation, route }) => {
    let items = []
    const type = route?.params?.type;
    let itemsState;
    if (type == "GardeManger") {
      // we want to deep copy for modifying array
      itemsState = useSelector((state) => state.gardeMangerReducer.items)
      items = JSON.parse(JSON.stringify(itemsState))
      items.push({type: "GardeManger", isImport: true})
    } else if (type === "GroceryList") {
      itemsState = useSelector((state) => state.groceryListReducer.items)
      items = JSON.parse(JSON.stringify(itemsState))
      items.push({type: "GardeManger", isImport: true})
    } else {
      itemsState = useSelector((state) => state.historyReducer.items)
      items = JSON.parse(JSON.stringify(itemsState))
      items.push({type: "History", isImport: true})
    }
    const qrData = JSON.stringify(items)
  
    return (
      <View style={styles.container}>
        <Center style={styles.qr}>
          <HStack>
            <Heading>
            {type}
            </Heading>
            <Pressable 
                onPress={() => copyToClipboard(itemsState)}
                style={styles.copyContent}
                _pressed={{
                    opacity: 0.5
                  }} >
              <Icon style={styles.containerIcon} size="sm" as={<MaterialCommunityIcons name={"content-copy"}/>} color="black" />
              </Pressable>
          </HStack>
         
          <QRCode
            size={300}
            value={qrData}
          />
          <Text style={styles.warningText}>Attention ! Les données importées seront écrasées.</Text>
        </Center>
      </View>
        
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  qr: {
    top: windowH/5
  },
  warningText: {
    top: 10
  },
  copyContent: {
    paddingLeft: 10
  }
});


export default QRCodeScreen;