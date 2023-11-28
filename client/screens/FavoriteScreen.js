import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

// Component
import MealList from '../components/mealList';

// Redux
import { useSelector } from 'react-redux'


export default function FavoriteScreen() {
  const navigation = useNavigation()

  const { params: {
    allMeals
  }} = useRoute()
  
  const [favoriteMeals, setFavoriteMeals] = useState([])
 
  useEffect(() => {
      try{
        const favoriteMealIds = useSelector((state) => state.favorites.ids)
        const result = allMeals.filter(meal => meal.id == favoriteMealIds)
        setFavoriteMeals(result)
      }catch(error){
        console.log(error)
      }
  }, [])
  return (
    <MealList selectedMeals={favoriteMeals} />
  )
}

