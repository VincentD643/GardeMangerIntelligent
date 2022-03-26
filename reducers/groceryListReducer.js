import { createSlice } from '@reduxjs/toolkit'
import {addItem as gardeMangerAddItem} from "./gardeMangerReducer";
import {useDispatch} from "react-redux";
// Slice
const slice = createSlice({
    name: 'groceryList',
    initialState: {
        items: []
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },

        addItem: (state, action) => {
            let newData = [...state.items]
            const prevIndex = state.items.findIndex((item) => item.key === action.payload.key)
            //make sure we dont add the same item twice to groceryList, just increase quantity
            if (prevIndex >= 0) {
                newData[prevIndex].quantity =  newData[prevIndex].quantity + 1
                state.items = [...newData]
            } else {
                const newProduct = {
                    ...action.payload,
                    quantity: 1
                }
                state.items = [...newData, newProduct]
            }
        },
        
        reduceQuantity: (state, action) => {
            let newData = [...state.items]
            const prevIndex = state.items.findIndex((item) => item.key === action.payload.key)
            //make sure we dont add the same item twice to groceryList, just increase quantity
            if (prevIndex >= 0 && newData[prevIndex].quantity > 0) {
                newData[prevIndex].quantity =  newData[prevIndex].quantity - 1
                state.items = [...newData]
            }
        },

        editItem: (state, action) => {
            state.items = state.items.map(item => {
                if (item.key === action.payload.key) {
                    return action.payload;
                }
                return item;
            })
        },

        removeAllItems: (state, action) => {
            state.items = [];
        },

        removeItem: (state, action) => {
            const newData = [...state.items]
            const prevIndex = state.items.findIndex((item) => item.key === action.payload.key)
            newData.splice(prevIndex, 1)
            state.items = newData
        },

        AddAllItemsToGardeManger: (state, action) =>{
            const newData = [...state.items];
            newData.forEach(item => gardeMangerAddItem(item));
        }
    },
});

// Actions
export const { setItems, addItem, editItem, removeItem, reduceQuantity, removeAllItems, AddAllItemsToGardeManger } = slice.actions

export default slice.reducer