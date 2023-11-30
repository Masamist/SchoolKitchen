import { useEffect, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMeals } from '../store/context/mealContext'
// Component
//import MealList from '../components/mealList';
import MealCol from '../components/mealCol'
// Redux
import { useSelector } from 'react-redux'

export default function FavoriteScreen() {
  //const navigation = useNavigation()
  const { meals } = useMeals()
  const [favoriteMeals, setFavoriteMeals] = useState([])
  const favoriteMealIds = useSelector((state) => state.favorites.ids)

  const selectMealsByFavorite = async() => {
    const result = await meals.filter(meal => meal._id == favoriteMealIds)
    setFavoriteMeals(result)
  }
  console.log(favoriteMealIds)
  console.log(favoriteMeals)
  useEffect(() => {
    try{
      selectMealsByFavorite()
    }catch(error){
      console.log(error)
    }
  }, [])

  return (
    <View className="pl-3">
      { favoriteMeals ? (
        <FlatList 
          data={favoriteMeals}
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
      ) : (
      <Text>No Favourite Meal are saved</Text>
      )
      }
    </View>
    
  )
}

