import { useEffect, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMeals } from '../store/context/mealContext'
// Component
import MealCol from '../components/mealCol'
// Redux
import { useSelector } from 'react-redux'

export default function FavoriteScreen() {
  const navigation = useNavigation()
  const { meals } = useMeals()
  const [favoriteMeals, setFavoriteMeals] = useState([])

  const favoriteMealIds = useSelector((state) => state.favorites.ids)


  // const fetchFavoriteId = async() => {
  //   const favMealIds = await useSelector((state) => state.favorites.ids)
  //   return favMealIds
  // }

  const selectMealsByFavorite = async(favoriteMealIds) => {
    const result = await meals.filter(meal => meal._id == favoriteMealIds)
    setFavoriteMeals(result)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('openDrawer', (e) => {
      // Prevent default behavior
      e.preventDefault();
  
      try{
        const favoriteMealIds = useSelector((state) => state.favorites.ids)
        selectMealsByFavorite(favoriteMealIds)
      }catch(error){
        console.log(error)
      }
      // ...
    });
  
    return unsubscribe;
  }, [navigation, selectMealsByFavorite]);

  // useEffect(() => {
  //   try{
  //     selectMealsByFavorite(favoriteMealIds)
  //   }catch(error){
  //     console.log(error)
  //   }
  // }, [favoriteMealIds])

  console.log(favoriteMeals)

  //////////////////////////////////////////Error///////////////////////////////
  return (
    <View className="pl-3">
      { !favoriteMeals ? (
        <Text>No Favourite Meal are saved</Text>
        ) : (
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
        )
      }
    </View>   
  )
}

