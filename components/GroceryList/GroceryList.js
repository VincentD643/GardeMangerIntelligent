import React, {useCallback, useRef} from "react";
import {
    Heading,
    HStack,
    Icon,
    Pressable,
    Spacer,
    View,
    Box,
    Menu,
    Divider,
    Fab, Button
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useSelector, useDispatch } from 'react-redux';
import DraggableFlatList from "react-native-draggable-flatlist";
import RowItemGroceryList from "../DraggableSwipeListGroceryList/RowItemGroceryList"
import { setItems, removeAllItems } from "../../reducers/groceryListReducer";
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
            <Box position="relative" h={100} w="100%">
                <Menu
                    closeOnSelect={true}
                    w="160"
                    trigger={(triggerProps) => {
                        return (
                            <Button {...triggerProps} style={styles.menuButton}>
                                {<Icon color="white" as={<MaterialCommunityIcons name="plus"/>} size="sm"/>}
                            </Button>
                        )
                    }}
                >
                    {/*TODO : Adapter le code pour permettre l'ajout dans la liste d'épicerie.*/}
                    {/*<Menu.Item value="Roboto"*/}
                    {/*           onPress={() => navigation.navigate('BarcodeScannerCamera', {scanType: "completeScan"})}>Scan*/}
                    {/*    complet</Menu.Item>*/}
                    {/*<Divider/>*/}
                    {/*<Menu.Item value="Roboto"*/}
                    {/*           onPress={() => navigation.navigate('BarcodeScannerCamera', {scanType: "fastScan"})}>Scan*/}
                    {/*    rapide</Menu.Item>*/}
                    {/*<Divider/>*/}
                    {/*<Menu.Item value="Roboto" onPress={() => navigation.navigate('ProductForm')}>Ajout produit*/}
                    {/*    manuel</Menu.Item>*/}
                    {/*<Divider/>*/}
                    <Menu.Item value="Arial" onPress={() => dispatch(removeAllItems())}>Vider la liste d'épicerie</Menu.Item>
                </Menu>
            </Box>
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