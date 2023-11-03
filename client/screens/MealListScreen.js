import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

// Component
import Categories from '../components/categories'
import MealRow from '../components/mealRow'
import BasketIcon from '../components/basketIcon'
import BasketButton from '../components/basketButton'
//import BagIcon from '../components/bagIcon'

// // ServerSide
// import { getAllMeals } from '../api'

export default function MealListScreen() {
  //const navigation = useNavigation()
  //const route = useRoute()
  const [categorizedMeals, setCategorizedMeal] = useState([])
  //const [Meals, setMeals] = useState()
  const { params: {
    selectedCategory, 
    allMeals
  }} = useRoute()
  
  /////////////////Error!!!!!!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    const categorized = allMeals.filter(meal => meal.category._ref == selectedCategory)
    setCategorizedMeal(categorized)
    //setMeals(allMeals)
    //console.log("categorized",categorized)
  }, [])
  // const categorized = allMeals.filter(meal => meal._id == selectedCategory)
  // setCategorizedMeal(categorized)
  //console.log("allMeals",allMeals)
  //console.log("selectedCategory",selectedCategory)
  //console.log("categorizedMeals",categorizedMeals)

  return (
  <>
    <BasketIcon />
    <ScrollView >
      {/* <BagIcon /> */}
      <Categories />
      {
        categorizedMeals?.map(meal=>{
          return (
            <MealRow 
              key={meal._id}
              id={meal._id}
              title={meal.name}
              description={meal.description}
              price={meal.price}
              mealimage={meal.mealimage}
            />     
          )
        })
      }
      {/* <BasketButton /> */}
    </ScrollView>
  </>
  )
}

const styles = StyleSheet.create({})