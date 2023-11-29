import { ScrollView, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import CategoryContext from '../store/context/categoryContext'

// Components
import Header from '../components/ui/header'
import Categories from '../components/ui/categories'
import MealList from '../components/mealList'
import BasketIcon from '../components/ui/basketIcon'


export default function MealListScreen() {
  const navigation = useNavigation()
  const [selectedMeals, setSelectedMeals] = useState([])
  const { activeCategory } = useContext(CategoryContext)

  const { params: {
    selectedCategoryId, 
    allMeals
  }} = useRoute()
  useEffect(() => {
    try{
      const result = allMeals.filter(meal => meal.category._ref == selectedCategoryId)
      setSelectedMeals(result)

    }catch(err){
      console.log(err)
    }
  }, [activeCategory])

  const handleCategoryChange = (id, catName) => {
    navigation.navigate('MealList', {
      selectedCategoryId: id,
      selectedCategoryName: catName,
      allMeals: allMeals
    })  
  }

  return (
    <ScrollView>
      <View className="pl-3">
        <Header />
        <BasketIcon />
      
        {/* <BagIcon /> */}
        <Categories handleCategoryChange={handleCategoryChange} />
        <MealList selectedMeals={selectedMeals} />
        {/* <MealList selectedMeals={selectedCategoryMeal} onpress={handleCategoryChange} /> */}
      </View>
    </ScrollView>
  )
}

