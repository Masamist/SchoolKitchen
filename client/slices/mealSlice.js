import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  meal: {
    id: null,
    title: null,
    price:null,
    description:null,
    allergis:null,
    limit:null,
    mealimage:null,
    category:null,
  }
}

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    setMeal: (state, action) => {
      state.meal = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMeal } = mealSlice.actions

export const selectMeal = state=> state.meal.meal;

export default mealSlice.reducer