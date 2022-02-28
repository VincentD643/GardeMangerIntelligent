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
      let newData = [...state.items]
      const prevIndex = state.items.findIndex((item) => item.isContainer ? item.container_name === action.payload.container_name : item.product_name === action.payload.product_name )
      //make sure we dont add the same item twice to gardeManger, just increase quantity
      console.log(prevIndex)
      if (prevIndex >= 0) {
        newData[prevIndex].quantity =  newData[prevIndex].quantity + 1
        state.items = [...newData]
      } else {
        state.items = [...newData, action.payload]
      }
    },

    reduceQuantity: (state, action) => {
      let newData = [...state.items]
      const prevIndex = state.items.findIndex((item) => item.key === action.payload.key)
      //reduce the quantity if current qty > 0
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
    },

    searchGardeManger: (state, action) => {
      let newData = [...state.items]
      for(let i = 0; i < newData.length;i++){
        if (!newData[i]?.product_name?.toLowerCase().includes(action.payload.toLowerCase())) {
          newData[i].isHidden = true
        } else {
          newData[i].isHidden = false
        }
      }
      state.items = newData
    },

    resetSearch: (state, action) => {
      let newData = [...state.items]
      for(let i = 0; i < newData.length;i++){
        newData[i].isHidden = false
        if (newData[i].isClosed) {
          newData[i].isClosed = !newData[i].isClosed
        }
      }
      state.items = newData 
    }
  },
});

// Actions
export const { setItems, addItem, editItem, removeItem, closeOpenContainer, reduceQuantity, searchGardeManger, resetSearch } = slice.actions

export default slice.reducer