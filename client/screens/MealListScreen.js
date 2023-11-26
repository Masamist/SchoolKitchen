import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

// Components
import Header from '../components/ui/header';
import Categories from '../components/ui/categories'
import MealCol from '../components/mealCol'
import BasketIcon from '../components/ui/basketIcon'

// // ServerSide
// import { getAllMeals } from '../api'

export default function MealListScreen() {
  const navigation = useNavigation()
  //const route = useRoute()
  const [categorizedMeals, setCategorizedMeal] = useState([])
  //const [Meals, setMeals] = useState()
  const { params: {
    selectedCategory, 
    allMeals
  }} = useRoute()
  
  /////////////////Error!!!!!!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    const categorized = allMeals.filter(meal => meal.category._ref == selectedCategory)
    setCategorizedMeal(categorized)
  }, [])
  // setCategorizedMeal(categorized)
  //console.log("allMeals",allMeals)
  //console.log("selectedCategory", selectedCategory)
  //console.log("categorizedMeals",categorizedMeals)
  return (
  <ScrollView>
    <View className="pl-3">
      <Header />
      <BasketIcon />
    
      {/* <BagIcon /> */}
      <Categories />

      <View className="pt-7">
        {
          categorizedMeals?.map(meal=>{
            return (
              <>
                <MealCol 
                  key={meal._id}
                  id={meal._id}
                  title={meal.name}
                  description={meal.description}
                  price={meal.price}
                  mealimage={meal.mealimage}
                />
                <View>
                  <Separator />
                </View>
                
              </>   
            )
          })
        }
      </View>
    </View>
  </ScrollView>
  )
}

const seperatorStyles = {
  height: 2,
  width: '100%',
  backgroundColor: '#A8BC3A',
  marginTop: 30,
  marginBottom: 50,
}

const Separator = () => <View style={seperatorStyles} />
