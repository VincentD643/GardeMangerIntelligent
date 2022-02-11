import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'gardeManger',
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

    closeOpenContainer: (state, action) => {
      let firstIndex, lastIndex
      firstIndex = state.items.findIndex((item) => item.key === action.payload.key)
      let tempArray = state.items.slice(firstIndex + 1);
      lastIndex = tempArray.findIndex((item) => item.isContainer === true)
      if (lastIndex === -1) {
        lastIndex = state.items.length - 1
      }
      let newData = [...state.items]
      let isClosed = action.payload.isClosed
      for (let i = firstIndex; i <= lastIndex; i++) {
        if (!newData[i].isContainer) {
          newData[i] = {
            ...newData[i],
            isHidden: !isClosed
          }
        } else {
          newData[i] = {
            ...newData[i],
            isClosed: !isClosed
          }
        }
      }
      state.items = newData
    }
  },
});

// Actions
export const { setItems, addItem, editItem, removeItem, closeOpenContainer } = slice.actions

export default slice.reducer