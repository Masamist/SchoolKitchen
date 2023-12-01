import { View, FlatList } from 'react-native'
import { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import CategoryContext from '../store/context/categoryContext'
import { useMeals } from '../store/context/mealContext'
// Components
import Header from '../components/ui/header'
import Categories from '../components/ui/categories'
import BasketIcon from '../components/ui/basketIcon'
import MealCol from '../components/mealCol'


export default function MealListScreen() {
  const navigation = useNavigation()
  const [selectedMeals, setSelectedMeals] = useState([])
  const { activeCategory } = useContext(CategoryContext)
  const { meals } = useMeals()

  const { params: { selectedCategoryId }} = useRoute()

  useLayoutEffect(() => {
    navigation.setOptions(Header({ 
      navigation, 
      onPressShopping: () => navigation.navigate('Home'),
      onPressFavorite: () => navigation.navigate('Favorite')
    }))
  }, [navigation])

  const selectMealsByCategory = async() => {
    const result = await meals.filter(meal => meal.category._ref == selectedCategoryId)
    setSelectedMeals(result)
  }

  useEffect(() => {
    try{
      selectMealsByCategory()
    }catch(err){
      console.log(err)
    }
  }, [activeCategory])

  const handleCategoryChange = (id, catName) => {
    navigation.navigate('MealList', {
      selectedCategoryId: id,
      selectedCategoryName: catName,
    })
  }

  return (
    <View style={{ flex: 1 }} className="pl-3">
      <BasketIcon />
      {/* <BagIcon /> */}
      <Categories handleCategoryChange={handleCategoryChange} />
      <FlatList 
        data={selectedMeals}
        keyExtractor={(item) => item._id} 
        renderItem={( {item} ) => (
          <MealCol
            id={item._id}
            title={item.name}
            price={item.price}
            description={item.description}
            allergis={item.allergis}
            limit={item.limit}
            mealimage={item.mealimage}
            category={item.category}
          />
      )} />
    </View>
  )
}


