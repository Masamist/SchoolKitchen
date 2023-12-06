import { useEffect, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMeals } from '../store/context/mealContext'
// Component
import MealCol from '../components/mealCol'
// Redux
import { useSelector } from 'react-redux'
import { selectFavoriteIds } from '../store/redux/favoriteSlice'

export default function FavoriteScreen() {
  const navigation = useNavigation()
  const { meals } = useMeals()
  const [favoriteMeals, setFavoriteMeals] = useState([])
  const favoriteMealIds = useSelector(selectFavoriteIds)

  //const favIds = useSelector((state) => state.favorites.ids)

  const selectMealsByFavorite = () => {
    //const favoriteMealIds = useSelector((state) => state.favorites.ids)
    //GetFavIds()
    const result = meals.filter(obj => favoriteMealIds.includes(obj._id))
    setFavoriteMeals(result)
  }

  useEffect(()=> {
    try{
      selectMealsByFavorite()
      // const result = meals.filter(obj => favIds.includes(obj.id))
      // console.log("result",result)
      // setFavoriteMeals(result)
    }catch(err){
      console.log(err)
    }
  }, [favoriteMealIds])
  

  

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('state', () => {
  //     // Prevent default behavior
  
  //     try{
  //       selectMealsByFavorite()
  //     }catch(error){
  //       console.log(error)
  //     }
  //     // ...
  //   });
  
  //   return unsubscribe;
  // }, [navigation, selectMealsByFavorite]);

  //////////////////////////////////////////Error///////////////////////////////
  return (
    <View className="pl-1 pt-5">
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

