import React from "react";
import {
    Avatar,
    Box,
    Center,
    Divider,
    Fab,
    Heading,
    HStack,
    Icon,
    Menu,
    Pressable,
    Spacer,
    Text,
    VStack
} from "native-base"
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeProduct } from "../../reducers/groceryListReducer";
import {StyledGroceryList, HiddenItemView} from "./styled"
import colors from "../../theme";

const SwipeList = () => {
    const navigation = useNavigation();
    const data = useSelector((state) => state.groceryListReducer.products)

    const dispatch = useDispatch()
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...data];
        const prevIndex = data.findIndex((item) => item.id === rowKey);
        newData.splice(prevIndex, 1);
        dispatch(removeProduct(newData));
    };

    const onRowDidOpen = (rowKey) => {
        console.log('This row opened', rowKey);
    };


    //place this in a generic helper when we have time
    const formatDate = (date) => {
        const newDate = new Date(date)
        return `${newDate.getDate()}/${newDate.getMonth() +
        1}/${newDate.getFullYear()}`;
    };

    // the warning for serializable is here
    const renderItem = ({ item, index }) => {
        return (
            <Box>
                <Pressable onPress={() => navigation.navigate('ProductForm', {
                    product: item,
                    isEdit: true
                })}
                           bg="white">
                    <Box
                        pl="4"
                        pr="5"
                        py="2"
                    >
                        <HStack alignItems="center" space={3}>
                            <Avatar size="48px" source={{uri: item.product_url}}>NA</Avatar>
                            <VStack>
                                <Text color="coolGray.800"  _dark={{ color: 'warmGray.50' }}  bold>
                                    {item.product_name}
                                </Text>
                                {item.expiration_date ?
                                    <Text>
                                        Expiration Date: {formatDate(item.expiration_date)}
                                    </Text> : <Text>No expiration</Text>}
                            </VStack>
                            <Spacer />
                            <Text fontSize="xs" color="coolGray.800"  _dark={{ color: 'warmGray.50' }}>
                                Qty: {item.quantity}
                            </Text>
                        </HStack>
                    </Box>
                </Pressable>
            </Box>
        )

    }



    const renderHiddenItem = (data, rowMap) => (
        <HiddenItemView>
            <Pressable
                pl="4"
                pr="5"
                py="2"
                borderLeftRadius="10"
                onPress={() => deleteRow(rowMap, data.item.id)}
                _pressed={{
                    opacity: 0.5
                }}
                bg={colors.error}
                justifyContent="center">
                <Icon as={<MaterialCommunityIcons name="delete"/>} color='white'/>
            </Pressable>
            <Pressable
                pl="4"
                pr="5"
                py="2"
                borderRightRadius="10"
                onPress={() => closeRow(rowMap, data.item.id)}
                _pressed={{
                    opacity: 0.5
                }}
                bg={colors.green}
                justifyContent="center">
                <Icon as={<MaterialCommunityIcons name="playlist-plus"/>} color="white" />
            </Pressable>
        </HiddenItemView>
    );

    return (
        <Box bg="white" width="100%" safeArea flex="1">
            {data.length > 0 ?
                <SwipeListView
                    data={data}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-75}
                    leftOpenValue={75}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={onRowDidOpen}
                />
                : <Center><Text>La liste d'épicerie est présentement vide.</Text></Center>
            }
        </Box>
    );
}

const GroceryList = ({navigation}) => {
    return (
        <StyledGroceryList safeAreaTop>
            <Heading p="4" pb="3" size="lg">
                Liste d'Epicerie
            </Heading>
            {SwipeList()}
            <Box position="relative" h={100} w="100%">
                <Menu
                    closeOnSelect={true}
                    w="160"
                    onOpen={() => console.log("opened")} //not needed but I will keep it there for future considerations
                    onClose={() => console.log("closed")} //same
                    trigger={(triggerProps) => {
                        return (
                            <Fab
                                {...triggerProps}
                                position="absolute"
                                bottom={70}
                                size="sm"
                                icon={<Icon color="white" as={<MaterialCommunityIcons name="plus" />} size="sm" />}
                            />
                        )
                    }}
                >
                    <Menu.Item value="Roboto" onPress={() => navigation.navigate('BarcodeScannerCamera')}>Scan Product</Menu.Item>
                    <Divider/>
                    <Menu.Item value="Roboto" onPress={() => navigation.navigate('ProductForm')}>Add Product Manually</Menu.Item>
                    <Divider/>
                    <Menu.Item value="Arial">Add Divider</Menu.Item>
                </Menu>
            </Box>
        </StyledGroceryList>
    )
};

export default GroceryList;