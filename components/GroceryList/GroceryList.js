import React, {useCallback, useRef} from "react";
import {
    Heading,
    HStack,
    Icon,
    Pressable,
    Spacer,
    View
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useSelector, useDispatch } from 'react-redux';
import DraggableFlatList from "react-native-draggable-flatlist";
import RowItemGroceryList from "../DraggableSwipeListGroceryList/RowItemGroceryList"
import { setItems } from "../../reducers/groceryListReducer";
import {Platform, StyleSheet, UIManager} from "react-native";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const GroceryList = ({navigation}) => {
    const dispatch = useDispatch()
    const itemRefs = useRef(new Map());
    const items = useSelector((state) => state.groceryListReducer.items)

    const renderItem = useCallback((params) => {
        const RowItemProps = {
            ...params,
            navigation
        }
        return <RowItemGroceryList {...RowItemProps} itemRefs={itemRefs} />;
    }, []);

    return (
        <View style={styles.container}>
            <DraggableFlatList
                ListHeaderComponent={() => {
                    return (
                        <HStack style={styles.header}>
                            <Heading p="4" pb="3" size="lg">
                                Liste d'épicerie
                            </Heading>
                            <Spacer />
                            <Pressable
                                onPress={() => navigation.navigate('QRCodeScreen', {
                                    type: "GroceryList",
                                })}
                                style={styles.shareButton}
                                _pressed={{
                                    opacity: 0.5
                                }} >
                                <Icon style={styles.containerIcon} size="sm" as={<MaterialCommunityIcons name={"share"}/>} color="black" />
                            </Pressable>
                        </HStack>

                    )
                }}
                keyExtractor={(item) => item.key}
                data={items}
                renderItem={renderItem}
                onDragEnd={({ data }) => dispatch(setItems(data))}
                activationDistance={20}
            />
            {/*TODO : Adapt the navigation for the gocery list*/}
            {/*<Box position="relative" h={100} w="100%">*/}
            {/*    <Menu*/}
            {/*        closeOnSelect={true}*/}
            {/*        w="160"*/}
            {/*        trigger={(triggerProps) => {*/}
            {/*            return (*/}
            {/*                <Fab*/}
            {/*                    {...triggerProps}*/}
            {/*                    position="absolute"*/}
            {/*                    bottom={70}*/}
            {/*                    size="sm"*/}
            {/*                    icon={<Icon color="white" as={<MaterialCommunityIcons name="plus" />} size="sm" />}*/}
            {/*                />*/}
            {/*            )*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Menu.Item value="Roboto" onPress={() => navigation.navigate('BarcodeScannerCamera')}>Scan Product</Menu.Item>*/}
            {/*        <Divider/>*/}
            {/*        <Menu.Item value="Roboto" onPress={() => navigation.navigate('ProductForm')}>Add Product Manually</Menu.Item>*/}
            {/*        <Divider/>*/}
            {/*        <Menu.Item value="Arial" onPress={() => navigation.navigate('ContainerForm')}>Add Divider</Menu.Item>*/}
            {/*    </Menu>*/}
            {/*</Box>*/}
        </View>
    )
};

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        header: {
            paddingRight: 15,
        },
        shareButton: {
            top: 20,
        }

    });

export default GroceryList;