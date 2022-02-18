import React from "react";
import {
  Heading,
  Center,
  View,
  Text
} from "native-base"
import {
  StyleSheet,
  Dimensions
} from "react-native";
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';

const windowH = Dimensions.get('window').height;

const QRCodeScreen = ({ navigation, route }) => {
    let items = []
    const type = route?.params?.type;
    if (type == "GardeManger") {
      // we want to deep copy for modifying array
      items = JSON.parse(JSON.stringify(useSelector((state) => state.gardeMangerReducer.items)))
      items.push({type: "GardeManger", isImport: true})
    } else if (type === "GroceryList") {
        //listeepicerie
    } else {
      items = JSON.parse(JSON.stringify(useSelector((state) => state.historyReducer.items)))
      items.push({type: "History", isImport: true})
    }
    const qrData = JSON.stringify(items)
  
    return (
      <View style={styles.container}>
        <Center style={styles.qr}>
          <Heading>
          {type}
          </Heading>
          <QRCode
            size={300}
            value={qrData}
          />
          <Text style={styles.warningText}>Warning ! Previous data will be overwritten.</Text>
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
  }
});


export default QRCodeScreen;