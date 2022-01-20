import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'gardeManger',
  initialState: {
    products: [],
    containers: []
  },
  reducers: {
    addProduct: (state, action) => {
        state.products = [...state.products, action.payload]
    },
    //we make a temp object in case another action access the state at the same time
    removeProduct: (state, action) => {
        const next = [...state.products]
        state.products = next.filter(product => product != action.payload)
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
export const { addProduct, removeProduct, addContainer, removeContainer } = slice.actions

export default slice.reducer