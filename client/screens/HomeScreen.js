import { View, ScrollView } from 'react-native'
//import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState, useContext, useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import CategoryContext from '../store/context/categoryContext'

// Component
import Header from '../components/ui/header'
import BasketIcon from '../components/ui/basketIcon'
import Categories from '../components/ui/categories'
import SelectDaysBtnRow from '../components/selectDaysBtnRow'
import FeaturedRow from '../components/featuredRow'

// ServerSide
import { getNewMeals } from '../api/mealApi'

export default function HomeScreen() {
  const navigation = useNavigation()
  const { setActiveCategory } = useContext(CategoryContext)
  const [newMeals, setNewMeals] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions(Header({ 
      navigation: navigation, 
      title: 'Home'
    }))
    // Reset category context in redux
    setActiveCategory(null)
  }, [])

  useEffect(() => {
    try{
      getNewMeals()
      .then(data => {
        setNewMeals(data)
      })
    }catch(err){
      console.log(err)
    }
  }, [])

  //const newMeals = allMeals.reverse().slice(0, 4)
  //const popularMeals = allMeals.slice(0, 3)
  // const favoriteMealIds = useSelector((state) => state.favorites.ids)
  // const favoriteMeals = allMeals.filter(meal => meal.id == favoriteMealIds)
  //const favoriteMeals = allMeals.slice(0, 3)

  const handleCategoryChange = (catId, catName) => {
    setActiveCategory(catId)
    navigation.navigate('MealList', {
      selectedCategoryName: catName
    })  
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Shopping Basket */}
      <BasketIcon />

      <ScrollView showsVerticalScrollIndicator={false}> 
        {/* Selecting Dates */}
        <SelectDaysBtnRow />

        <Categories handleCategoryChange={handleCategoryChange} />

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
    </View>
  )
}
