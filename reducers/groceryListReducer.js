import { createSlice } from '@reduxjs/toolkit'
import {addHistory} from "./historyReducer";
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
            // Update history
            addHistory(item)
        },
        
        reduceQuantity: (state, action) => {
            let newData = [...state.items]
            const prevIndex = state.items.findIndex((item) => item.key === action.payload.key)
            //make sure we dont add the same item twice to groceryList, just increase quantity
            if (prevIndex >= 0 && newData[prevIndex].quantity > 0) {
                newData[prevIndex].quantity =  newData[prevIndex].quantity - 1
                state.items = [...newData]

                // Update history
                addHistory(item)
            }
        },

        editItem: (state, action) => {
            state.items = state.items.map(item => {
                if (item.key === action.payload.key) {
                    return action.payload;
                }
                // Update history
                addHistory(item)

                return item;
            })
        },

        removeItem: (state, action) => {
            const newData = [...state.items]
            const prevIndex = state.items.findIndex((item) => item.key === action.payload.key)
            newData.splice(prevIndex, 1)
            state.items = newData

            // Update history
            addHistory(item)
        },
    },
});

// Actions
export const { setItems, addItem, editItem, removeItem, reduceQuantity } = slice.actions

export default slice.reducer