import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { selectBasketItems, selectBasketTotal } from '../../store/redux/basketSlice'
import { ShoppingBag } from "react-native-feather"
import { Shadow } from 'react-native-shadow-2'
//import { selectMeal } from '../slices/mealSlice';


export default function BasketIcon() {
  const basketItems = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)
  const navigation = useNavigation()
    
  if(!basketItems.length) return null

  return (
    <View className="absolute bottom-2 w-full z-50">
        <TouchableOpacity 
          style={{backgroundColor: "#A8BC3A"}}
          // style={{backgroundColor: themeColors.bgColor(1)}}
          onPress={()=> navigation.navigate('ShoppingBasket')} 
          className="flex-row justify-between items-center ml-2 rounded-full p-1 shadow-lg border-4 border-white">
            <View className="relative">
            <ShoppingBag width={35} height={35} stroke="#FFFFFF" className="ml-3" />
            <View className="bg-orange-300 rounded-full w-7 h-7 top-4 left-8 absolute">
              <Text className="font-extrabold text-yellow-800 text-base text-center justify-center">{basketItems.length}</Text>
            </View>
              
            </View>
            
            
            <Text className="flex-1 text-center font-semibold text-white text-xl pl-3">Go to Shopping Bag</Text>
            
            <View className="m-1 p-2 rounded-full bg-orange-200">
              <Text className="font-semibold text-yellow-800 text-base">$ {basketTotal}</Text>
            </View>
        
        </TouchableOpacity>
      
    </View>
  )
}