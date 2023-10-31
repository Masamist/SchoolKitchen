import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'


// Component
import Categories from '../components/categories'
import MealRow from '../components/mealRow'
import ShoppingBagButton from '../components/shoppingBagButton'

// ServerSide
import { getAllMeals } from '../api'

export default function MealListScreen() {
 
  const route = useRoute()
  const [allMeals, setAllMeals ] = useState([])
  const [categorizedMeals, setCategorizedMeal] = useState([])

  useEffect(() => {
    getAllMeals().then(data => {
      setAllMeals(data)
    })
  }, [])

  const selectedCategory = route.params;
  const categorized = allMeals.filter(meal => meal._id == selectedCategory)
  setCategorizedMeal(categorized)
  //console.log("selectedCategory",selectedCategory)
  console.log("categorizedMeals",categorizedMeals)

  return (
  <>
    <ScrollView >
      <Categories />
      {
        categorizedMeals?.map(meal=>{
          console.log(meal.mealimage)
          return (
            <>
            <MealRow 
                key={meal.id}
                id={meal.id}
                title={meal.name}
                description={meal.description}
                price={meal.price}
                mealimage={meal.mealimage}
              />
            </>
              
              
          )
        })
      }
      <ShoppingBagButton />
    </ScrollView>
  </>
  )
}

const styles = StyleSheet.create({})