import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { 
    VStack, 
    HStack,
    Center,
    Checkbox, 
    FormControl, 
    Input, 
    Button, 
    Heading, 
    Icon, 
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select
} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { addItem, editItem } from "../../reducers/gardeMangerReducer";
import StyledHistory from "./styled";
import {addHistory} from "../../reducers/historyReducer";
import { expirationByProductType } from "../../helpers/expirationHelper";

const ProductForm = ({ navigation, route }) => {
    
    //product
    const product = route?.params?.product;

    const isEdit = route?.params?.isEdit ? true : false
    //qty
    const [quantity, setQuantity] = useState(product?.quantity ? product.quantity :  1);
    //product name
    const [name, setName] = useState(product?.product_name ? product.product_name : undefined);
    //product name errors
    const [errors, setErrors] = useState({});
    //expiration date
    const [isExpirationTracked, setIsExpirationTracked] = useState(product?.expiration_date ? true : false);
    const [date, setDate] = useState(
        product?.expiration_date ? new Date(product?.expiration_date) : new Date()
        );
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    //image
    const [image, setImage] = useState(product?.product_url ? product.product_url: undefined);
    //nutriments
    const [nutriments, setNutriments] = useState(product?.nutriments ? product.nutriments: undefined); 

    const [productType, setProductType] = useState(undefined)

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (productType) {
            const date = expirationByProductType(productType)
            console.log("date2", date)
            setDate(date)
            setIsExpirationTracked(true)
        }
    }, [productType]);


    //Validates the form 
    const validate = () => {
        if (name === undefined) {
          setErrors({
            ...errors,
            name: 'Name est requis',
          });
          return false;
        } else if (name.length < 3) {
          setErrors({
            ...errors,
            name: 'Name est trop court',
          });
          return false;
        }
        return true;
    };

    // Submits the form
    const onSubmit = () => {
        console.log("name2", name)
        let formData = {
            quantity,
            product_name: name,
        }
        
        if (image) {
            formData = {...formData, product_url: image}
        }
        if (isExpirationTracked) {
            formData = {...formData, expiration_date: date.toString()}
        }
        
        // TODO : Wrap validate
        if (!isEdit) {
            const key = uuidv4();
            validate() ? dispatch(addItem({...formData, key: key, isContainer: false, isHidden: false, containerInfo: product?.containerInfo})) : console.log('Validation Failed');
            validate() ? dispatch(addHistory({...formData, key: key, isContainer: false, isHidden: false})) : console.log('Validation Failed');
        } else {
            validate() ? dispatch(editItem({...formData, key: product.key, isContainer: false, isHidden: false})) : console.log('Validation Failed');
            validate() ? dispatch(addHistory({...formData, key: product.key, isContainer: false, isHidden: false})) : console.log('Validation Failed');
        }

        navigation.navigate('GardeManger')
    };
    
    //Edit the state when expiration date is set 
    const onChangeExpirationDate = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
          const currentDate = selectedValue || new Date();
          setDate(currentDate);
          setMode('time');
          setShow(Platform.OS !== 'ios'); // to show time
        }
      };
    
    //allows to show/hide the datepicker
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    
    //Set the datepicker mode
    const showDatePicker = () => {
        showMode('date');
    };

    //To display in the input placeholder
    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() +
          1}/${date.getFullYear()}`;
    };

    //Components to display the product name input field
    const nameInput = () => {
        console.log("name", name)
        return (
            <FormControl isRequired isInvalid={'name' in errors}>
                <FormControl.Label _text={{bold: true}}>Nom du produit</FormControl.Label>
                <Input
                value={name}
                placeholder="Apple"
                onChangeText={(value) => setName(value)}
                />
                {'name' in errors ?
                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>Erreur</FormControl.ErrorMessage>:
                <FormControl.HelperText _text={{fontSize: 'xs'}}>
                Nom doit contenir au moins 3 caractères.
                </FormControl.HelperText>
                }
            </FormControl>
        )
    }

     //Components to display the quantity input field
    const quantityInput = () => {
        return (
            <FormControl>
                <FormControl.Label _text={{bold: true}}>Quantité</FormControl.Label>
                <NumberInput  defaultValue={quantity} min="1" onChange={(value) => setQuantity(value)}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput>
            </FormControl>
        )
    }

    //Components to display the expiration date input field
    const expirationDateInput = () => {
        return (
            <FormControl>
            <FormControl.Label _text={{bold: true}}>Date d'expiration</FormControl.Label>
            <HStack alignItems="center" space={4}>
                <Checkbox 
                    accessibilityLabel="Track expiration date ?" 
                    onChange={(value) => setIsExpirationTracked(value)} 
                    value={isExpirationTracked} 
                    defaultIsChecked={isExpirationTracked}
                    isChecked={isExpirationTracked}
                />
                <Input
                    w="90%"
                    isDisabled={true}
                    value={formatDate(date)}
                    InputRightElement={
                        <Button isDisabled={!isExpirationTracked} size="xs" rounded="none" w="1/6" h="full" onPress={showDatePicker}>
                        <Icon color="white" as={<MaterialCommunityIcons name="calendar" />} size="sm" />
                        </Button>
                    }
                    placeholder={formatDate(date)}
                />
                {show && (
                    <DateTimePicker
                    value={date}
                    minimumDate={Date.parse(new Date())}
                    display='default'
                    mode={mode}
                    onChange={onChangeExpirationDate}
                    />
                )}
            </HStack>
            
            </FormControl>
        )
    }

    const productTypeInput = () => {
        return (
            <FormControl>
            <FormControl.Label _text={{bold: true}}>Type de produit</FormControl.Label>
            <Select selectedValue={productType} accessibilityLabel="Catégorie de produit" placeholder="Catégorie de produit" 
              mt={1} onValueChange={itemValue => setProductType(itemValue)}>
                  <Select.Item label="Produits laitiers" value="Produits laitiers" />
                  <Select.Item label="Produit à base de végétaux" value="Aliments et boissons à base de végétaux" />
                  <Select.Item label="Cannes" value="Cannes" />
                  <Select.Item label="Amuses gueules" value="snacks" />
                  <Select.Item label="Tartinades et produits déjeuners" value="Petit-déjeuners" />
                  <Select.Item label="Condiments et sauces" value="Condiments" />
                  <Select.Item label="Produits congelés" value="Frozen foods" />
            </Select>
            </FormControl>
            
        )
    }

    return (
      <StyledHistory>
        <Center>
            <Heading>
                Ajouter un produit
            </Heading>
        </Center>
         <VStack width="90%" mx="3">
            {nameInput()}
            {quantityInput()}
            {expirationDateInput()}
            {productTypeInput()}
            <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                Soumettre
            </Button>
            </VStack>
      </StyledHistory>
    )
};

  export default ProductForm;