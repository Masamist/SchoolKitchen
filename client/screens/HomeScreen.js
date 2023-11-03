import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
//import { useNavigation } from '@react-navigation/native'

// Component
import BasketIcon from '../components/basketIcon'
import Categories from '../components/categories'
import FeaturedRow from '../components/featuredRow'

// ServerSide
import { getAllMeals } from '../api'

export default function HomeScreen() {
  const [allMeals, setAllMeals ] = useState([])

  
  useEffect(() => {
    getAllMeals().then(data => {
      setAllMeals(data)
    })
  }, [])
  //console.log("allMeals",allMeals)
  const newMeals = allMeals.reverse().slice(0, 4)
  const popularMeal = allMeals.slice(0, 3)
  
  return (
    <SafeAreaView className="bg-white" >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingBottom: 50
        }}
      > 
        {/* Shopping Basket */}
        <BasketIcon />
        {/* categories */}
        <Categories allMeals={allMeals} />
        {/* <Categories /> */}

        {/* featured */}
        <View className="mt-5">
          <FeaturedRow
            title="New Meals"
            meals={newMeals}
          />
          <FeaturedRow
            title="Your Favorites"
            meals={newMeals}
          />
          <FeaturedRow
            title="Popular Meals"
            meals={popularMeal}
          />
        </View>

      </ScrollView>  
    </SafeAreaView>
  )
}
