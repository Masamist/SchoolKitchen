import { StyleSheet, ScrollView, View, Pressable, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// Components & UI
import Categories from '../../components/ui/categories'
import FpMealCard from '../../components/FoodProvider/fpMealCard'
import { AntDesign } from '@expo/vector-icons'


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
              onPress={() => navigation.navigate('CreateMeal')}
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
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})