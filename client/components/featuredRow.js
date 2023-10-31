import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MealCard from '../components/mealCard'

// ServerSide
import { getAllMeals } from '../api'


export default function FeaturedRow() {
  const [meals, setMeals] = useState([])

  const newMeals = meals.slice(0, 7)
  //console.log('newMeal:', newMeals)
  
  useEffect(() => {
    getAllMeals().then(data => {
      setMeals(data)
    })
  }, [])
  //console.log('Meal:', meals)

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal:15,
        }}
        className="overflow-visible py-5"
       >
        {
            newMeals?.map(meal => {
            console.log(meal)
            return (
                <MealCard    
                  id={meal._id}
                  key={meal._id}
                  title={meal.name}
                  price={meal.price}
                  description={meal.description}
                  mealimage={meal.mealimage}

              />    
            )
          })
        }           
       </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})