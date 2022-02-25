import { createSlice } from '@reduxjs/toolkit'
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
            state.items = [...state.items, action.payload]
        },

        editItem: (state, action) => {
            state.items = state.items.map(item => {
                if (item.key === action.payload.key) {
                    return action.payload;
                }
                return item;
            })
        },

        removeItem: (state, action) => {
            const newData = [...state.items]
            const prevIndex = state.items.findIndex((item) => item.key === action.payload.key)
            newData.splice(prevIndex, 1)
            state.items = newData
        },
    },
});

// Actions
export const { setItems, addItem, editItem, removeItem } = slice.actions

export default slice.reducer