import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Linking } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import 'react-native-reanimated'
import { Container, Checkbox, VStack, Text, Center, Flex } from "native-base";
import { setCameraPermission, setMicrophonePermission } from "../../reducers/permissionsReducer"
import { StyledBarcodePermissionsView, StyledHeadingPrimaryText, StyledHeadingAppName } from "./styled";
import BarcodeScannerCamera from '../BarcodeScannerCamera';


const BarcodeScannerPermissions = ({ navigation }) => {
    const cameraPermissionStatus = useSelector((state) => state.permissionsReducer.camera)
    const microphonePermissionStatus = useSelector((state) => state.permissionsReducer.microphone)
    console.log("Cam permission ", cameraPermissionStatus)
    const dispatch = useDispatch()
    
    const requestMicrophonePermission = useCallback(async () => {
        console.log('Requesting microphone permission...');
        const permission = await Camera.requestMicrophonePermission();
        console.log(`Microphone permission status: ${permission}`);
        
        if (permission === "denied") await Linking.openSettings();
        dispatch(setMicrophonePermission(permission))
      }, []);

    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...');
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);
    
        if (permission === "denied") await Linking.openSettings();
        dispatch(setCameraPermission(permission));
    }, []); 

    useEffect(() => {
        console.log("Cam permission ", cameraPermissionStatus)
        if (cameraPermissionStatus === "authorized" && microphonePermissionStatus === "authorized"){
            navigation.navigate('BarcodeScannerCamera');
        }
    }, [cameraPermissionStatus, microphonePermissionStatus, navigation]);

    return (
        <StyledBarcodePermissionsView>
            <Container>
                <Center flex={1}>
                    <VStack space={3} mb={3}>
                        <StyledHeadingPrimaryText pt={4}>
                            To scan products please allow camera and microphone access to  
                            <StyledHeadingAppName>
                            &nbsp;Garde Manger Intelligent.
                            </StyledHeadingAppName>
                        </StyledHeadingPrimaryText>
                        <Flex align="center" justify="flex-start">
                            <Checkbox isChecked={cameraPermissionStatus === "authorized"} onChange={requestCameraPermission}>
                                <Text>Camera</Text>
                            </Checkbox>
                            <Checkbox isChecked={microphonePermissionStatus === "authorized"} onChange={requestMicrophonePermission}>
                                <Text>Microphone</Text>
                            </Checkbox>
                        </Flex>
                    </VStack>
                </Center>
            </Container>
        </StyledBarcodePermissionsView> 
  );
};


export default BarcodeScannerPermissions;