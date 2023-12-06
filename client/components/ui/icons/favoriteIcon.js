import { Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../../../store/redux/favoriteSlice'

export default function favoriteIcon({mealId}) {
  
  //Redux
  const dispatch = useDispatch()
  const theme = useTheme()
  const favoriteMealIds = useSelector((state) => state.favorites.ids)
  const mealFavorite = favoriteMealIds.includes(mealId)

  const changeFavoriteStatusHandler = () => {
    if(mealFavorite) {
      dispatch(removeFavorite({id: mealId}))
    }else{
      dispatch(addFavorite({id: mealId}))
    }
  }

  return (
    <Pressable onPress={changeFavoriteStatusHandler}>
      <AntDesign name={ mealFavorite? "heart": "hearto"} size={24} color={theme.colors.secondary} />
    </Pressable>
  )
}