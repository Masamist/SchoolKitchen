import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

// Component
import Categories from '../../components/categories'
import FpMealRow from '../../components/FoodProvider/fPmealRow'
import BasketIcon from '../../components/basketIcon'

// // ServerSide
// import { getAllMeals } from '../api'

export default function MealListScreen() {
  const navigation = useNavigation()
  //const route = useRoute()
  const [categorizedMeals, setCategorizedMeal] = useState([])
  //const [Meals, setMeals] = useState()
  const { params: {
    allMeals
  }} = useRoute()
  
  return (
  <>
    <BasketIcon />
    <ScrollView >
      {/* <BagIcon /> */}
      <Categories />
      {
        allMeals?.map(meal=>{
          return (
            <FpMealRow 
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
    </ScrollView>
  </>
  )
}

const styles = StyleSheet.create({})