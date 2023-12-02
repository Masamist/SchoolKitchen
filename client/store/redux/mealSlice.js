// import { createSlice } from '@reduxjs/toolkit'
// // ServerSide

// const initialState = {
//   meal: {
//     id: null,
//     title: "",
//     price:null,
//     description:"",
//     allergis:[],
//     limit:null,
//     mealimage:null,
//     category:null,
//   }
// }

// export const mealSlice = createSlice({
//   name: 'meal',
//   initialState,
//   reducers: {
//     setMeal: (state, action) => {
//       state.meal = action.payload;
//     }
//   },
// })

// // Action creators are generated for each case reducer function
// export const { setMeal } = mealSlice.actions
// export const selectMeal = state=> state.meal.meal;
// export default mealSlice.reducer