import { View, ScrollView } from 'react-native'
//import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState, useContext, useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import CategoryContext from '../store/context/categoryContext'

// Component
import Header from '../components/ui/header'
import BasketIcon from '../components/ui/basketIcon'
import Categories from '../components/ui/categories'
import SelectDays from '../components/selectDays'
import FeaturedRow from '../components/featuredRow'

// ServerSide
import { getNewMeals } from '../api/mealApi'

export default function HomeScreen() {
  const navigation = useNavigation()
  const { selectCategory } = useContext(CategoryContext)
  const [newMeals, setNewMeals] = useState([])

  // Reset category context in redux
  selectCategory(null)

  useLayoutEffect(() => {
    navigation.setOptions(Header({ 
      navigation: navigation, 
      title: 'Home'
    }))
  }, [navigation])

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

  const handleCategoryChange = (id, catName) => {
    navigation.navigate('MealList', {
      selectedCategoryId: id,
      selectedCategoryName: catName,
    })  
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="px-3"> 
      {/* <Header /> */}

      {/* Shopping Basket */}
      <BasketIcon />

      {/* Selecting Dates */}
      <SelectDays />

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
  )
}
