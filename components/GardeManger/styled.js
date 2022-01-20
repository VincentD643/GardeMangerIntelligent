import styled from "styled-components"
import { Box, View } from "native-base"

const StyledGardeManger = styled(Box)`
    background-color: white;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex: 1;
`

const HiddenItemView = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
`

export { StyledGardeManger, HiddenItemView }