import { View, SafeAreaView, Text, Pressable, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// Component
import BasketIcon from '../components/basketIcon'
import Categories from '../components/categories'
import FeaturedRow from '../components/featuredRow'

// ServerSide
import { getAllMeals } from '../api/mealApi'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { Navigation } from 'react-native-feather'

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
    <SafeAreaView className="bg-white" >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingBottom: 50
        }}
      > 
        <Pressable onPress={()=> FIREBASE_AUTH.signOut()}>
          <Text className="font-semibold text-yellow-500"> Sign Out</Text>
        </Pressable>
        <Pressable onPress={()=> navigation.navigate('Dashboard')}>
          <Text className="font-semibold text-yellow-500">  / Food Provider Page /</Text>
        </Pressable>
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
