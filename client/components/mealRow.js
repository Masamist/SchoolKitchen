import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Minus, Plus } from "react-native-feather"
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsById } from '../slices/basketSlice';
import { themeColors } from '../theme';

// ServerSide
import { urlFor } from '../sanity'

export default function MealRow({ id, title, description, price, mealimage }) {
  const  dispatch = useDispatch();
  const basketItems = useSelector(state=> selectBasketItemsById(state, id));
  const navigation = useNavigation()
  const [bagItems, setBagItems] = useState([])
  ///////Check inside the bag
  //console.log(bagItems)
  const handleIncrease = ()=>{
    dispatch(addToBasket({id, title, price, mealimage}));
    //setBagItems({id, title, price, mealimage, quantity})
}
  const handleDecrease = ()=>{
    dispatch(removeFromBasket({id}))
}
  //console.log(mealimage)
  return (
    <>
      <View className="flex-row items-center rounded-3xl mb-3 mx-2">
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => 
              navigation.navigate('Meal', { 
                id, 
                title, 
                description, 
                price, 
                mealimage })
            }
          >          
            <View className="pl-2">
              { mealimage && <Image source={{ uri: urlFor(mealimage).url() }} className="h-14 w-14" /> }
            </View>
          </TouchableOpacity>

        <View className="pl-2">
          <Text className="text-xl">{title}</Text>
          <Text className="text-gray-700">{description}</Text>
          <Text className="text-sm text-gray-700">${price}</Text>

          <View className="flex-row items-end">
            <TouchableOpacity 
                onPress={handleDecrease} 
                disabled={!basketItems.length} 
                className="p-1 rounded-full bg-orange-500" 
                //style={{backgroundColor: themeColors.bgColor(1)}}
                >
                <Minus strokeWidth={2} height={20} width={20} stroke="white" />
            </TouchableOpacity>
            <Text className="px-3">
              {basketItems.length}
            </Text>
            <TouchableOpacity 
              onPress={handleIncrease} 
              className="p-1 rounded-full bg-green-500" 
              //style={{backgroundColor: themeColors.bgColor(1)}}
              >
              <Plus strokeWidth={2} height={20} width={20} stroke="white" />
            </TouchableOpacity>
          
          </View>


          </View>
        </View>
      </View>
    </>
  );
}
