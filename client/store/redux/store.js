import { configureStore } from "@reduxjs/toolkit"
//import mealSlice from './mealSlice'
import basketSlice from './basketSlice'
import favoriteSlice from './favoriteSlice'

export const store = configureStore({
  reducer: {
    //meal: mealSlice,
    basket: basketSlice,
    favorites: favoriteSlice,
  },
})