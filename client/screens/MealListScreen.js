import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'


import MealList from '../components/mealList';

// // ServerSide
// import { getAllMeals } from '../api'

export default function MealListScreen() {
  const navigation = useNavigation()
  //const route = useRoute()
  const { params: {
    selectedCategory, 
    allMeals
  }} = useRoute()
  
  const [categorizedMeals, setCategorizedMeals] = useState([])
  //const [Meals, setMeals] = useState()

  useEffect(() => {
      try{
        const result = allMeals.filter(meal => meal.category._ref == selectedCategory)
        setCategorizedMeals(result)
      }catch(error){
        console.log(error)
      }
  }, [])
  return (
    <MealList selectedMeals={categorizedMeals} />
  )
}

