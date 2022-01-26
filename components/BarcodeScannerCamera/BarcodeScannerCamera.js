import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios'

export default function BarcodeScannerCamera({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isScanned, setIsScanned] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const handleBarCodeScanned = async (data) => {
    //do the request here
    //following code is untested but it should probably work
    let response = null

    if (!isScanned) {
      response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
      setIsScanned(true)
      const product = {
        product_name: response.data.product.product_name,
        product_url: response.data.product.image_thumb_url,
        nutriments: response.data.product.nutriments
      }
      navigation.navigate('ProductForm', {
        product,
      })
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