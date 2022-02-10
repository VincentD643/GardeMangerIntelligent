import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'groceryList',
    initialState: {
        products: [],
        containers: []
    },
    reducers: {
        addProduct: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        editProduct: (state, action) => {
            state.products = state.products.map(product => {
                if (product.id === action.payload.id) {
                    return action.payload;
                }
                return product;
            })
        },
        //we make a temp object in case another action access the state at the same time
        removeProduct: (state, action) => {
            state.products = action.payload
        },
        addContainer: (state, action) => {
            state.containers = [...state.containers, action.payload]
        },
        removeContainer: (state, action) => {
            const next = [...state.containers]
            state.containers = next.filter(container => container != action.payload)
        },
    },
});

// Actions
export const { addProduct, editProduct, removeProduct, addContainer, removeContainer } = slice.actions

export default slice.reducer