import { ScrollView, View, Pressable, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState, useLayoutEffect, useContext, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import CategoryContext from '../../store/context/categoryContext'
import { useMeals } from '../../store/context/mealContext'

// Components & UI
import Header from '../../components/ui/header'
import Categories from '../../components/ui/categories'
import FpMealCard from '../../components/FoodProvider/fpMealCard'
import { AntDesign } from '@expo/vector-icons'

// // ServerSide
// import { getAllMeals } from '../../api/mealApi'

export default function MealListScreen() {
  const navigation = useNavigation()
  const { activeCategory, setActiveCategory } = useContext(CategoryContext)
  const { meals } = useMeals()
  const [selectedMeals, setSelectedMeals] = useState([])

  // const [allMeals, setAllMeals ] = useState([])

  useEffect(() => {
    setSelectedMeals(meals)
  }, [])

  ////////////////////////////////////////////////Error////////////////
  // useMemo(() => {
  //   const result = meals.filter(meal => meal.category._ref == activeCategory)
  //   setSelectedMeals(result)
  // }, [activeCategory])

  useLayoutEffect(() => {
    navigation.setOptions(Header({ 
      navigation: navigation, 
      title: 'All Meal List'
    }))
    // Reset category context in redux
    setActiveCategory(null)
  }, [])

  const handleCategoryChange = (catId, catName) => {
    setActiveCategory(catId)
   navigation.navigate('MenuList', {
     selectedCategoryName: catName,
   })
 }

  return (
    <View style={{ flex: 1 }} className="pt-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories handleCategoryChange={handleCategoryChange} />

        <View className="flex-row justify-between w-full mt-4 pl-3">
          <View>
            <Text className="text-lg text-amber-950">All Meals</Text>
          </View>

          <View className="flex-row justify-center pr-3">
            <Text className="text-amber-950 pr-2 pt-2">Add Meal</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('CreateMeal')}
              className="items-right"
            >
              <AntDesign name="pluscircle" size={32} color="#A8BC3A" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="pt-3 pl-3">
          {
            selectedMeals?.map(meal=>{
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
      </ScrollView>
    </View>
  )
}