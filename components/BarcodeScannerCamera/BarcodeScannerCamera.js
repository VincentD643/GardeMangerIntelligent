import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, Platform } from 'react-native';
import { Icon } from "native-base";
import { Camera } from 'expo-camera';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { v4 as uuidv4 } from 'uuid';
import { setItems } from '../../reducers/gardeMangerReducer';
import {addHistory, setHistory} from '../../reducers/historyReducer';
import { addItem } from "../../reducers/gardeMangerReducer";
import { expirationByProductType } from '../../helpers/expirationHelper';

export default function BarcodeScannerCamera({navigation, route}) {
  const barcodesScanned = new Set()
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isScanned, setIsScanned] = useState(false)
  const dispatch = useDispatch()
  const scanType = route?.params?.scanType;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const importData = (properties, jsonData) => {
      try{
          let type = properties.type
          if (type === "GardeManger") {
            jsonData.pop()
            dispatch(setItems(jsonData))
            navigation.navigate('GardeManger')
          } else if (type === "GroceryList") {
            //dispatch
            navigation.navigate('GroceryList')
          } else {
            dispatch(setHistory(jsonData))
            navigation.navigate('History')
          }
      } catch (e) {
        console.log("Not a data import")
      }
  }

  const scanProduct = async (data) => {
    setIsScanned(true)
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
    // let expirationDate = null;
    // const categories = [...response?.data?.product?.categories, ...response?.data?.product?.categories_hierarchy]
    // for (let i = 0; i < categories.length; i++) {
    //   expirationDate = expirationByProductType(categories[i])
    //   if (expirationDate != null) {
    //     break;
    //   }
    // }

    let product = {
      product_name: response.data.product.product_name,
      product_url: response.data.product.image_thumb_url,
      nutriments: response.data.product.nutriments
    }

    // if (expirationDate != null) {
    //   product = {...product, expiration_date: expirationDate}
    // }

    if (scanType === "completeScan") {
      navigation.navigate('ProductForm', {
        product,
      })
    } else {
      let formData = {
        ...product,
        key: uuidv4(),
        quantity: 1,
        isContainer: false,
        isHidden: false,
      }
      if (Platform.OS === "android") {
        ToastAndroid.show(`Le produit: ${product.product_name} a ??t?? ajout??.`, 1);
      }
      dispatch(addItem({...formData, key: uuidv4(), isContainer: false, isHidden: false}))
      dispatch(addHistory({...formData, key: uuidv4(), isContainer: false, isHidden: false}))
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsScanned(false)
  }

  const handleBarCodeScanned = async (data) => {
    try {
      let jsonData = JSON.parse(JSON.parse(data))
      const properties = jsonData[jsonData.length - 1]
      if (properties?.isImport) {
        importData(properties, jsonData)
      }
    } catch (e) {
      console.log("not a data import")
      if (!isScanned) {
        await scanProduct(data)
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Demande de permission pour acc??der ?? la cam??ra</Text>;
  }
  if (hasPermission === false) {
    return <Text>Pas d'acc??s ?? la cam??ra</Text>;
  }

  return (
      <View style={styles.container}>
        <Camera
            style={styles.camera}
            type={type}
            onBarCodeScanned={async (...args) => {
              const data = args[0].data;
              const result = JSON.stringify(data);
              handleBarCodeScanned(result)
            }
              //</View>navigation.navigate('your_next_screen',{result});
            }
            barCodeScannerSettings={{
              barCodeTypes: ['qr'],
            }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {navigation.navigate('GardeManger')}}>
              <Icon as={MaterialCommunityIcons} name="close-circle" size={24} />
            </TouchableOpacity>
          </View>
        </Camera>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingLeft: 30
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});