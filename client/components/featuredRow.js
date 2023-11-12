import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MealCard from '../components/mealCard'


export default function FeaturedRow({title, meals}) {
  return (
    <View>
      <View className="flex-col justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
        </View>
        
        <Pressable>
          <Text style={{color: 'orange'}} className="font-semibold">See All</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal:15,
        }}
        className="overflow-visible py-5"
       >
        {
          meals?.map(meal => {
          // /console.log(meal)
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