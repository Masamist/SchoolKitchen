import { createSlice } from '@reduxjs/toolkit'

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    ids: []
  },
  reducers: {
    addFavorite: (state, action) => {
      state.ids.push(action.payload.id)
    },
    removeFavorite: (state, action) => {
      //state.ids.splice(state.ids.indexOf(action.payload.id), 1)
    const index = state.ids.indexOf(action.payload.id);
    if (index !== -1) {
      state.ids.splice(index, 1);
    } else {
      console.warn(`Attempted to remove non-existent favorite with id ${action.payload.id}`);
    }
    }
  },
})

export const addFavorite = favoriteSlice.actions.addFavorite
export const removeFavorite = favoriteSlice.actions.removeFavorite
export default favoriteSlice.reducer