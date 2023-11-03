import { configureStore } from '@reduxjs/toolkit'
import mealSlice from './slices/mealSlice'
import basketSlice from './slices/basketSlice'

export const store = configureStore({
  reducer: {
    meal: mealSlice,
    basket: basketSlice,
  },
})