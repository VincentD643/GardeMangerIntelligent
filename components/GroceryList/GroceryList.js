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
    Button,
    Text
} from "native-base"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useSelector, useDispatch } from 'react-redux';
import DraggableFlatList from "react-native-draggable-flatlist";
import RowItemGroceryList from "../DraggableSwipeListGroceryList/RowItemGroceryList"
import { setItems, removeAllItems } from "../../reducers/groceryListReducer";
import { addGroceryListProducts } from "../../reducers/gardeMangerReducer"
import {Platform, StyleSheet, UIManager, Dimensions} from "react-native";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const windowH = Dimensions.get('window').height;
const windowW = Dimensions.get('window').width;

const GroceryList = ({navigation}) => {
    const dispatch = useDispatch()
    const itemRefs = useRef(new Map());
    const items = useSelector((state) => state.groceryListReducer.items)

    const addAllItemsToGardeManger = () => {
        dispatch(addGroceryListProducts(items))
        dispatch(removeAllItems())
    }

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
                            <Heading p="4" pb="3" size="lg">Liste d'épicerie </Heading>
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
            {items.length === 0 &&
            <View style={styles.helperText}>
                <Text>La liste d'épicerie est vide.</Text>
            </View>}
            <Box position="absolute" h={windowH} w={windowW}>
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
                    <Menu.Item value="Arial" onPress={() => addAllItemsToGardeManger()}>Ajouter tous les produits</Menu.Item>
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
    },
    helperText: {
        flex: 1,
        paddingTop: windowH / 3,
        paddingLeft: windowW / 3.5
    },
    menuButton: {
        position: "absolute",
        borderRadius: 40,
        bottom:windowH/6,
        left:windowW-(windowW/4),
        width: 60,
        height: 60,
    }

});

export default GroceryList;