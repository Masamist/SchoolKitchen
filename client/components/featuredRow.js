import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MealCard from './ui/mealCard'


export default function FeaturedRow({title, meals}) {
  return (
    <>
    { meals&&<MealsAvailable title={title} meals={meals} />}
    </>  
  )
}

const MealsAvailable = ({title, meals}) => {
  return(
    <View className="pl-3">
      <View className="flex-row justify-between w-full">
        <View>
          <Text className="text-lg text-amber-950 pl-1">{title}</Text>
        </View>
        <Pressable>
          <Text className="text-sm text-amber-500 pr-3">See All</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        //contentContainerStyle={{ paddingHorizontal:15 }}
        className="overflow-visible py-1"
      >
        {
          meals.map(meal => {
          return (
              <MealCard    
                id={meal._id}
                key={meal._id}
                title={meal.name}
                price={meal.price}
                description={meal.description}
                allergies={meal.allergies}
                limit={meal.limit}
                mealimage={meal.mealimage}
                category={meal.category}
              />    
              )
          })
        }   
      </ScrollView>    
    </View>
  )
}