import { StyleSheet, ScrollView, View, Pressable, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

// Component & Icon
import Categories from '../../components/ui/categories'
import FpMealRow from '../../components/FoodProvider/fpMealRow'
import FpMealCard from '../../components/FoodProvider/fpMealCard'
import { AntDesign } from '@expo/vector-icons';

// ServerSide
import { getAllMeals } from '../../api/mealApi'

export default function MealListScreen() {
  const navigation = useNavigation()
  const [allMeals, setAllMeals ] = useState([])
  useEffect(() => {
    getAllMeals().then(data => {
      setAllMeals(data)
    })
  }, [])
  //const route = useRoute()
  return (
    <ScrollView >
      <View className="pl-3 mt-5">
        {/* categories */}
        <Categories allMeals={allMeals} />

        <View className="flex-row justify-between w-full mt-8">
          <View>
            <Text className="text-lg text-amber-950 pl-1">All Meals</Text>
          </View>

          <View className="flex-row justify-center pr-5">
            <Text className="text-amber-950 pr-2 pt-2">Add Meal</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('MealForm')}
              className="items-right"
            >
              <AntDesign name="pluscircle" size={32} color="#A8BC3A" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="pt-3">
          {
            allMeals?.map(meal=>{
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
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})