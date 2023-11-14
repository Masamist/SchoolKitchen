import { StyleSheet, ScrollView, View, Pressable, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// import { Create } from "react-native-feather"

// Component
import Categories from '../../components/categories'
import FpMealRow from '../../components/FoodProvider/fpMealRow'
import FpMealCard from '../../components/FoodProvider/fpMealCard'

// ServerSide
import { getAllMeals } from '../../api/mealApi'
import { FIREBASE_AUTH } from '../../firebaseConfig'

export default function MealListScreen() {
  const navigation = useNavigation()
  const [allMenu, setAllMenu ] = useState([])
  useEffect(() => {
    getAllMeals().then(data => {
      setAllMenu(data)
    })
  }, [])
  //const route = useRoute()
  return (
  <>
    <ScrollView >
      <Pressable onPress={()=> FIREBASE_AUTH.signOut()}>
        <Text className="font-semibold text-yellow-500"> Sign Out</Text>
      </Pressable>
      <TouchableOpacity 
        onPress={() => navigation.navigate('MealForm')} 
        className="p-1 rounded-full bg-green-500" 
        //style={{backgroundColor: themeColors.bgColor(1)}}
        >
        {/* <Create strokeWidth={2} height={20} width={20} stroke="white" /> */}
        <Text>Create</Text>
      </TouchableOpacity>   
      {/* <BagIcon /> */}
      {/* <Categories /> */}
      {
        allMenu?.map(meal=>{
          return (
            <FpMealCard 
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