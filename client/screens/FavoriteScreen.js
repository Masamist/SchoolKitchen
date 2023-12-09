import { useEffect, useState, useLayoutEffect } from 'react'
import { View, FlatList, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMeals } from '../store/context/mealContext'
// Component
import Header from '../components/ui/header'
import MealCol from '../components/mealCol'
// Redux
import { useSelector } from 'react-redux'
import { selectFavoriteIds } from '../store/redux/favoriteSlice'

export default function FavoriteScreen() {
  const navigation = useNavigation()
  const { meals } = useMeals()
  const favoriteMealIds = useSelector(selectFavoriteIds)
  const [favoriteMeals, setFavoriteMeals] = useState([])

  useEffect(() => {
    const result = meals.filter(obj => favoriteMealIds.includes(obj._id))
    setFavoriteMeals(result)
  }, [favoriteMealIds])

  useLayoutEffect(() => {
    navigation.setOptions(Header({ 
      navigation: navigation, 
    }))
  }, [])

  return (
    <View className="pl-3 pt-5">
      { favoriteMeals.length ? (
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
            )} 
          />
        ) : (
          <Text className="text-lg">No Favourite Meal are saved</Text>
        )
      }
    </View>   
  )
}

