import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Minus, Plus } from "react-native-feather"
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsById } from '../slices/basketSlice';
import { themeColors } from '../theme';


import NoImage from './ui/noImage'
import { Shadow } from 'react-native-shadow-2'

// ServerSide
import { urlFor } from '../sanity'

export default function MealCol({ id, title, description, price, mealimage }) {
  const  dispatch = useDispatch();
  const basketItems = useSelector(state=> selectBasketItemsById(state, id));
  const navigation = useNavigation()
  const [bagItems, setBagItems] = useState([])
  const imageSize = { width: 130, height: 130 }
  ///////Check inside the bag
  //console.log(bagItems)
  const handleIncrease = ()=>{
    dispatch(addToBasket({id, title, price, mealimage}));
    //setBagItems({id, title, price, mealimage, quantity})
  }
  const handleDecrease = ()=>{
    dispatch(removeFromBasket({id}))
  }
  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(' ') + '...';
      return truncatedText;
    }
    return text;
  };
  //console.log(mealimage)
  return (
    <View className="flex-row mb-3 mr-3">
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
        <View>
          <Shadow distance={6} startColor={'#ebebeb'} offset={[0, 3]}>
            { mealimage
              ?<Image source={{ uri: urlFor(mealimage).url() }} style={ imageSize } className="rounded-md" />
              :<NoImage imageStlye={ imageSize } /> }
          </Shadow>
        </View>
      </TouchableOpacity>

      <View className="pl-5" style={{ flexShrink: 1 }}>
        <Text className="text-lg text-amber-950">{title}</Text>
        <Text className="text-gray-700 pt-1">{truncateText(description, 12)}</Text>
        <Text className="text-lg text-gray-700 pt-1">$ {price}</Text>

        <View className="flex-row justify-end" style={{ width: '100%'}}>
          <TouchableOpacity 
            onPress={handleDecrease} 
            disabled={!basketItems.length} 
            className="p-1 rounded-full bg-orange-300" 
            //style={{backgroundColor: themeColors.bgColor(1)}}
            >
            <Minus strokeWidth={2} height={20} width={20} stroke="white" />
          </TouchableOpacity>
          <Text className="px-3 text-lg">
            {basketItems.length}
          </Text>
          <TouchableOpacity 
            onPress={handleIncrease} 
            className="p-1 rounded-full" 
            style={{backgroundColor: themeColors.bgColor(1)}}
            >
            <Plus strokeWidth={2} height={20} width={20} stroke="white" />
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
}
