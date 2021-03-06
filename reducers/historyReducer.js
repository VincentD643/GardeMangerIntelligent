import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'history',
  initialState: {
    items: []
  },
  reducers: {
    setHistory: (state, action) => {
      state.items = action.payload;
    },

    addHistory: (state, action) => {
        const newData = [...state.items]
        const prevIndex = state.items.findIndex((item) => item.product_name === action.payload.product_name)
        //make sure we dont add the same item twice to history
        if (prevIndex < 0) {
          const newProduct = {
            ...action.payload,
            quantity: 1
          }
          //A new product is added to the top of the history list
          state.items = [newProduct, ...newData]
        }
        //if item already exists, bump it to the top of the history
        else{
          newData.splice(prevIndex, 1)
          //move it to the top of the history
          newData.splice(0, 0, action.payload)
          state.items = newData
        }
    },

    editHistory: (state, action) => {
      state.items = state.items.map(item => {
        if (item.key === action.payload.key) {
          return action.payload;
        }
        return item;
      })
    },

    removeHistory: (state, action) => {
      const newData = [...state.items]
      const prevIndex = state.items.findIndex((item) => item.key === action.payload.key)
      newData.splice(prevIndex, 1)
      state.items = newData
    }
  },
});

// Actions
export const { setHistory, addHistory, editHistory, removeHistory } = slice.actions

export default slice.reducer