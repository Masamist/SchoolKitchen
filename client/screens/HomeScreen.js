import { View, Text, Pressable, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// Component
import Header from '../components/ui/header'
import BasketIcon from '../components/ui/basketIcon'
import Categories from '../components/ui/categories'
import SelectDays from '../components/selectDays'
import FeaturedRow from '../components/featuredRow'

// ServerSide
import { getAllMeals } from '../api/mealApi'


export default function HomeScreen() {
  const navigation = useNavigation()
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
    <SafeAreaView>   
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingBottom: 80
        }}
        className="pl-3"
      > 
        <Header />

        {/* Shopping Basket */}
        <BasketIcon />

        {/* Selecting Dates */}
        <SelectDays />

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
