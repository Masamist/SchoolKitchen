import { configureStore } from '@reduxjs/toolkit'
import mealSlice from './slices/mealSlice'

export const store = configureStore({
  reducer: {
    meal: mealSlice,
  },
})