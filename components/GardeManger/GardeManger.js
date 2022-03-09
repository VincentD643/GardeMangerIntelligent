import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  Icon,
  Heading,
  Box,
  Fab,
  Divider,
  Menu,
  View,
  HStack,
  Spacer,
  Pressable,
  Text,
  Input
} from "native-base"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Platform,
  UIManager,
  Dimensions
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

import RowItem from "../DraggableSwipeList/RowItem";
import { setItems, searchGardeManger, resetSearch } from "../../reducers/gardeMangerReducer";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const windowH = Dimensions.get('window').height;
const windowW = Dimensions.get('window').width;

const GardeManger = ({ navigation }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const itemRefs = useRef(new Map());
  const items = useSelector((state) => state.gardeMangerReducer.items)
  
  useEffect(() => {
    if (isSearchActive) {
      dispatch(searchGardeManger(search))
    } else {
      dispatch(resetSearch())
    }
  }, [search, isSearchActive]);

  const renderItem = useCallback((params) => {
    const RowItemProps = {
      ...params,
      navigation
    }
    return <RowItem {...RowItemProps} itemRefs={itemRefs} />;
  }, []);

  return (
    <View style={styles.container}>
       {isSearchActive &&  
        <Input
          variant="underlined"
          style={styles.searchField}
          p="4" pb="3" size="lg"
          value={search}
          placeholder="Search"
          onChangeText={value => setSearch(value)}
        />
       }
      <DraggableFlatList
        ListHeaderComponent={() => {
          return (
            <HStack style={styles.header}>
              <Heading p="4" pb="3" size="lg">Garde Manger </Heading> 
              <Spacer />
              <Pressable 
                onPress={() => setIsSearchActive(!isSearchActive)}
                style={styles.shareButton}
                _pressed={{
                    opacity: 0.5
                  }} >
              <Icon style={styles.containerIcon} size="sm" as={<MaterialIcons name={"search"}/>} color="black" />
              </Pressable>
              <Pressable 
                onPress={() => navigation.navigate('QRCodeScreen', {
                  type: "GardeManger",
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
          <Text>Le Garde Manger est vide, importer ou ajouter des produits.</Text>
        </View>}
      <Box position="relative" h={100} w="100%">
        <Menu
            closeOnSelect={true}
            w="160"
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
              <Menu.Item value="Roboto" onPress={() => navigation.navigate('BarcodeScannerCamera', { scanType: "completeScan"})}>Scan complet</Menu.Item>
              <Divider/>
              <Menu.Item value="Roboto" onPress={() => navigation.navigate('BarcodeScannerCamera', { scanType: "fastScan"})}>Scan rapide</Menu.Item>
              <Divider/>
              <Menu.Item value="Roboto" onPress={() => navigation.navigate('ProductForm')}>Ajout produit manuel</Menu.Item>
              <Divider/>
              <Menu.Item value="Arial" onPress={() => navigation.navigate('ContainerForm')}>Ajout de séparateur</Menu.Item>
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
        paddingLeft: 30
    },
    searchField: {
        paddingLeft: 30,
        width: windowW
    },
    menuButton: {
        position: "relative",
        borderRadius: 40,
        left: windowW - 100,
        width: 60,
        height: 60,
    }

});

export default GardeManger;