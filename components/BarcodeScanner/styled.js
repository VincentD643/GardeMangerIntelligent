import styled from "styled-components"
import { View } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"

const StyledBarcodeView = styled(View)`
    background-color: white;
    align-items: center;
    justify-content: center;
`
const StyledSafeAreaView = styled(SafeAreaView)`
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
`
export { StyledBarcodeView, StyledSafeAreaView} 