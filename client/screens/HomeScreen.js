import { View, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// Component
import Header from '../components/ui/header'
import BasketIcon from '../components/ui/basketIcon'
import Categories from '../components/ui/categories'
import SelectDays from '../components/selectDays'
import FeaturedRow from '../components/featuredRow'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import setMeal from '../store/redux/mealSlice'

// ServerSide
import { getNewMeals, getAllMeals } from '../api/mealApi'


export default function HomeScreen() {
  const navigation = useNavigation()
  const [allMeals, setAllMeals ] = useState([])
  //Redux
  //const dispatch = useDispatch()
  const [newMeals, setNewMeals] = useState([])

  useEffect(() => {
    try{
      getAllMeals()
      .then(data => {
      setAllMeals(data)
      // // /dispatch(setMeal(data))
      })
      getNewMeals()
      .then(data => {
        setNewMeals(data)
      })
    }catch(err){
      console.log(err)
    }
  }, [])
  // // set Reducer
  // // setMeal(allMeals)
  // if(allMeals){
  //   dispatch(setMeal(allMeals))
  // }

  //const newMeals = allMeals.reverse().slice(0, 4)
  //const popularMeals = allMeals.slice(0, 3)
  // const favoriteMealIds = useSelector((state) => state.favorites.ids)
  // const favoriteMeals = allMeals.filter(meal => meal.id == favoriteMealIds)
  //const favoriteMeals = allMeals.slice(0, 3)

  const handleCategoryChange = (id, catName) => {
    navigation.navigate('MealList', {
      selectedCategoryId: id,
      selectedCategoryName: catName,
      allMeals: allMeals
    })  
  }

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

        <Categories
          handleCategoryChange={handleCategoryChange} />

        {/* featured Meal List*/}
        <View className="mt-5">
          <FeaturedRow
            title="New Meals"
            meals={newMeals}
          />
          <FeaturedRow
            title="Popular Meals"
            meals={newMeals}
          />
          <FeaturedRow
            title="Your Favorites"
            meals={newMeals}
          />
        </View>

      </ScrollView>  
    </SafeAreaView>
  )
}
