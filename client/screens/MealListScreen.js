import { View, FlatList, Text, ScrollView } from 'react-native'
import { useEffect, useState, useContext, useLayoutEffect, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import CategoryContext from '../store/context/categoryContext'
import { useMeals } from '../store/context/mealContext'
// Components
import Header from '../components/ui/header'
import Categories from '../components/ui/categories'
import BasketIcon from '../components/ui/basketIcon'
import MealCol from '../components/mealCol'
import SelectDaysBtnRow from '../components/selectDaysBtnRow'

export default function MealListScreen() {
  const navigation = useNavigation()
  const [selectedMeals, setSelectedMeals] = useState([])
  const { activeCategory, setActiveCategory } = useContext(CategoryContext)
  const { meals } = useMeals()

  useMemo(() => {
    const result = meals.filter(meal => meal.category._ref == activeCategory)
    setSelectedMeals(result)
  }, [activeCategory])

  // const selectMealsByCategory = async() => {
  //   const result = await meals.filter(meal => meal.category._ref == activeCategory)
  //   setSelectedMeals(result)
  // }
  
  useLayoutEffect(() => {
    navigation.setOptions(Header({ 
      navigation: navigation, 
    }))
  }, [])

  const handleCategoryChange = (catId, catName) => {
     setActiveCategory(catId)
    navigation.navigate('MealList', {
      selectedCategoryName: catName,
    })
  }

  return (
    <View style={{ flex: 1 }} className="pt-3 pl-1">
      <BasketIcon />

      <ScrollView showsVerticalScrollIndicator={false}> 
      <SelectDaysBtnRow />
      <Categories handleCategoryChange={handleCategoryChange} />

      { selectedMeals.length?
        selectedMeals.map(item => {
        return (
          <>
           <MealCol
            key={item.id}
            id={item._id}
            title={item.name}
            price={item.price}
            description={item.description}
            allergis={item.allergis}
            limit={item.limit}
            mealimage={item.mealimage}
            category={item.category}
          />
          </>
        )
      }) 
        : <Text className="text-lg"> There is no meal in this category.</Text>
      }
      </ScrollView>
    </View>
  )
}


