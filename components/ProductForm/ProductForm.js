import React, {useState} from "react";
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
} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { addProduct, editProduct } from "../../reducers/gardeMangerReducer";
import StyledHistory from "./styled";

const ProductForm = ({ navigation, route }) => {
    const product = route?.params?.product;
    const isEdit = route?.params?.isEdit ? true : false
    console.log("isEdit", isEdit)
    const [quantity, setQuantity] = useState(product?.quantity ? product.quantity :  1);
    const [name, setName] = useState(product?.product_name ? product.product_name: undefined);
    const [errors, setErrors] = useState({});
    const [isExpirationTracked, setIsExpirationTracker] = useState(product?.expiration_date ? true : false);
    const [date, setDate] = useState(
        product?.expiration_date ? new Date(product?.expiration_date) : new Date()
        );
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    
    //Validates the form 
    const validate = () => {
        if (name === undefined) {
          setErrors({
            ...errors,
            name: 'Name is required',
          });
          return false;
        } else if (name.length < 3) {
          setErrors({
            ...errors,
            name: 'Name is too short',
          });
          return false;
        }
        return true;
    };

    // Submits the form
    const onSubmit = () => {
        let formData = {
            quantity,
            product_name: name,
        }
        
        if (isExpirationTracked) {
            formData = {...formData, expiration_date: date}
        }
        if (!isEdit) {
            validate() ? dispatch(addProduct({...formData, id: uuidv4()})) : console.log('Validation Failed');
        } else {
            validate() ? dispatch(editProduct({...formData, id: product.id})) : console.log('Validation Failed');
        }
        navigation.goBack()
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
                <FormControl.Label _text={{bold: true}}>Product Name</FormControl.Label>
                <Input
                value={name}
                placeholder="Apple"
                onChangeText={(value) => setName(value)}
                />
                {'name' in errors ?
                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>Error</FormControl.ErrorMessage>:
                <FormControl.HelperText _text={{fontSize: 'xs'}}>
                Name should contain atleast 3 character.
                </FormControl.HelperText>
                }
            </FormControl>
        )
    }

     //Components to display the quantity input field
    const quantityInput = () => {
        return (
            <FormControl>
                <FormControl.Label _text={{bold: true}}>Quantity</FormControl.Label>
                <NumberInput  defaultValue="1" min="1" onChange={(value) => setQuantity(value)}>
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
            <FormControl.Label _text={{bold: true}}>Expiration Date</FormControl.Label>
            <HStack alignItems="center" space={4}>
                <Checkbox 
                    accessibilityLabel="Track expiration date ?" 
                    onChange={(value) => setIsExpirationTracker(value)} 
                    value={isExpirationTracked} 
                    defaultIsChecked={isExpirationTracked}
                />
                <Input
                    w="90%"
                    isDisabled={true}
                    value={date}
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

    return (
      <StyledHistory>
        <Center>
            <Heading>
                Add a product
            </Heading>
        </Center>
         <VStack width="90%" mx="3">
            {nameInput()}
            {quantityInput()}
            {expirationDateInput()}
            <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                Submit
            </Button>
            </VStack>
      </StyledHistory>
    )
};

  export default ProductForm;