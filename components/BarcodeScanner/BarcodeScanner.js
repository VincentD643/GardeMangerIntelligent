import React, {useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'

import 'react-native-reanimated'
import { Text } from "native-base"
import {
    useCameraDevices,
    useFrameProcessor,
  } from 'react-native-vision-camera';
import { cameraPermissions } from "../../reducers/permissionsReducer"
import { StyledBarcodeView, StyledSafeAreaView } from "./styled";


const BarcodeScanner = () => {
    const cameraPermission = useSelector((state) => state.camera)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const newCameraPermission = await Camera.requestCameraPermission()
            dispatch(cameraPermissions(newCameraPermission.status === "authorized"))
        })
      }, [])

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        //const isHotdog = detectIsHotdog(frame, sensitivity)
        //console.log(isHotdog ? "Hotdog!" : "Not Hotdog.")
    }, [])

    const device = null
    if (cameraPermission === true){
        const devices = useCameraDevices()
        device = devices.back
    }
    
    if (device == null) {
        return  <Text>error</Text>
    } 
  

    const cameraProps = {
        style: StyleSheet.absoluteFill,
        device: device,
        isActive: true,
        frameProcessor
    }
    return (
        <>
            <StatusBar backgroundColor={Theme.Color.White} barStyle="dark-content" />
                <StyledBarcodeView>
                <StyledSafeAreaView>
                    {device != null && hasPermission && (
                    <Camera {...cameraProps}/>
                    )}
                </StyledSafeAreaView>
            </StyledBarcodeView>
        </>
    );
};


export default BarcodeScanner;