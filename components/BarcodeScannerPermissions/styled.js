import styled from "styled-components"
import { View, Heading } from "native-base"
import colors from "../../theme"

const StyledBarcodePermissionsView = styled(View)`
    background-color: ${colors.background}
    align-items: center;
    justify-content: center;
`

const StyledHeadingPrimaryText = styled(Heading)`
    color: ${colors.text1}
`
const StyledHeadingAppName = styled(Heading)`
    color: ${colors.light}
`
export { StyledBarcodePermissionsView, StyledHeadingPrimaryText, StyledHeadingAppName } 