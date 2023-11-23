import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { selectBasketItems, selectBasketTotal } from '../../slices/basketSlice'
import { ShoppingBag } from "react-native-feather"
//import { selectMeal } from '../slices/mealSlice';
import { themeColors } from '../../theme';

export default function BasketIcon() {
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
    const navigation = useNavigation();
    if(!basketItems.length) return null;
  return (
    <View className="absolute bottom-5 w-full z-50">
        <TouchableOpacity 
          style={{backgroundColor: "#A8BC3A"}}
          // style={{backgroundColor: themeColors.bgColor(1)}}
          onPress={()=> navigation.navigate('ShoppingBag')} 
          className="flex-row justify-between items-center mx-5 rounded-full p-2 py-2 shadow-lg">
            <View className="px-2 rounded-full">
              <Text className="font-extrabold text-white text-lg">{basketItems.length}</Text>
            </View>
            <ShoppingBag width={35} height={35} stroke="#FFFFFF" />
            <Text className="flex-1 text-center font-semibold text-white text-xl">Go to Shopping Bag</Text>
            
            <View className="p-3 rounded-full bg-orange-200">
              <Text className="font-bold text-yellow-800 text-lg">{basketTotal}</Text>
            </View>
        
        </TouchableOpacity>
      
    </View>
  )
}