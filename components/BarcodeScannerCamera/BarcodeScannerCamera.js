import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setItems } from '../../reducers/gardeMangerReducer';
import { setHistory } from '../../reducers/historyReducer';
import { addItem } from "../../reducers/gardeMangerReducer";

export default function BarcodeScannerCamera({navigation}) {
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
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
    const product = {
      product_name: response.data.product.product_name,
      product_url: response.data.product.image_thumb_url,
      nutriments: response.data.product.nutriments
    }
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
      dispatch(addItem({...formData, key: uuidv4(), isContainer: false, isHidden: false}))
      navigation.navigate('GardeManger')
    }
   
  }

  const handleBarCodeScanned = async (data) => {
    if (!isScanned) {
      try {
        let jsonData = JSON.parse(JSON.parse(data))
        const properties = jsonData[jsonData.length - 1]
        if (properties?.isImport) {
          importData(properties, jsonData)
          setIsScanned(true)
        }
      } catch (e) {
        console.log("not a data import")
        scanProduct(data)
        setIsScanned(true)
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
           onPress={() => {
             setType(
               type === Camera.Constants.Type.back
                 ? Camera.Constants.Type.front
                 : Camera.Constants.Type.back
             );
           }}>
           <Text style={styles.text}> Flip </Text>
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
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});