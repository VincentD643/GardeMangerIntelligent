import { createSlice } from '@reduxjs/toolkit'
import {addHistory} from "./historyReducer";
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

    /*On a besoin d'une facon de cacher des items selon certaines conditions a la place de modifier la liste
      On ajoute une propriete qui determine si l'item est caché ou non. 
      Ici, toute la logique sert a cacher les items entre les separateurs.
      On trouve l'index du premier separateur qu'on souhaite cacher et on cherche l'index du
      prochain separateur. Quand on a trouver les deux, on cache tout entre les 2 index.*/
    closeOpenContainer: (state, action) => {
      let firstIndex, lastIndex
      //on cherche le premier container
      firstIndex = state.items.findIndex((item) => item.key === action.payload.key)
      //on veut chercher le prochain container apres celui qu'on vient de trouver
      let tempArray = state.items.slice(firstIndex + 1);
      //on cherche le prochain container
      lastIndex = tempArray.findIndex((item) => item.isContainer === true)
      //si on trouve rien ca veut dire qu'on doit caché tout ce qu'il y a en bas
      if (lastIndex === -1) {
        lastIndex = state.items.length - 1
      }
      let newData = [...state.items]
      let isClosed = action.payload.isClosed
      //le last index est seulement l'index de la seconde partie de l'array items. On doit ajouter le firstIndex 
      //pour avoir le vrai last index. Si le resultat est trop grand, ca signifie qu'on fait jusqu'a la fin et on 
      //a deja donné l'index du dernier si c'est le cas. 
      lastIndex = lastIndex + firstIndex > state.items.length - 1 ? state.items.length - 1 : lastIndex + firstIndex
      //on cache les items qui sont pas des containers et on set le container a fermer ou ouvert.
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

    //On cache les items qui ne match pas les criteres, on show les items qui match.
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

    //On show tout
    resetSearch: (state, action) => {
      let newData = [...state.items]
      for(let i = 0; i < newData.length;i++){
        newData[i].isHidden = false
        if (newData[i].isClosed) {
          newData[i].isClosed = false
        }
      }
      state.items = newData 
    }
  },
});

// Actions
export const { setItems, addItem, editItem, removeItem, closeOpenContainer, reduceQuantity, searchGardeManger, resetSearch } = slice.actions

export default slice.reducer