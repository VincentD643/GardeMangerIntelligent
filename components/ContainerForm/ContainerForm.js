import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { 
    VStack, 
    Center,
    FormControl, 
    Input, 
    Button, 
    Heading, 
} from "native-base";
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { addItem } from "../../reducers/gardeMangerReducer";
import StyledContainerFormView from "./styled";

const ContainerForm = ({ navigation }) => {
    
    //container name
    const [name, setName] = useState(undefined);
    //container name errors
    const [errors, setErrors] = useState({});

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
            container_name: name,
        }
        validate() ? dispatch(addItem({...formData, key: uuidv4(), isContainer: true, isClosed: false})) : console.log('Validation Failed');
        navigation.navigate('GardeManger')
    };
    

    //Components to display the product name input field
    const nameInput = () => {
        console.log("name", name)
        return (
            <FormControl isRequired isInvalid={'name' in errors}>
                <FormControl.Label _text={{bold: true}}>Container Name</FormControl.Label>
                <Input
                value={name}
                placeholder="Produits Laitiers"
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

    return (
      <StyledContainerFormView>
        <Center>
            <Heading>
                Add a divider
            </Heading>
        </Center>
         <VStack width="90%" mx="3">
            {nameInput()}
            <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                Submit
            </Button>
            </VStack>
      </StyledContainerFormView>
    )
};

export default ContainerForm;