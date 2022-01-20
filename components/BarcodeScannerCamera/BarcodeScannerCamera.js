import * as React from 'react';
import { StyleSheet } from "react-native"
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';

import { useIsFocused } from "@react-navigation/native"
import { Container, Checkbox, VStack, Text, Center, Heading, Box, Stack, Flex } from "native-base";
import { StyledBarcodeCameraView  } from './styled';

const BarcodeScannerCamera = () => {
  const devices = useCameraDevices()
  const device = devices.back
  const isFocused = useIsFocused()
  if (device == null) return <Text>error</Text>
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isFocused}
    />
  )
}

export default BarcodeScannerCamera;