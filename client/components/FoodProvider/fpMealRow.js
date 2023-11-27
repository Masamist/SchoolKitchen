import React, { useState } from 'react'
import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Components & UI
import { Edit } from "react-native-feather"
import { Shadow } from 'react-native-shadow-2'

// ServerSide
import { urlFor } from '../../sanity'

export default function FpMealRow(id, title, description, price, mealimage) {
  const navigation = useNavigation()
  return (
  <Shadow distance={6} startColor={'#ebebeb'} offset={[0, 3]}>
    <View className="flex-row items-center rounded-3xl mb-3 mx-2">
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => 
            navigation.navigate('Meal', { 
              id, 
              title, 
              description, 
              price, 
              mealimage
            })
          }
        >          
          <View className="pl-2">
            { mealimage && <Image source={{ uri: urlFor(mealimage).url() }} className="h-14 w-14" /> }
          </View>
        </TouchableOpacity>

      <View className="pl-2 bg-white">
        <Text className="text-xl">{title}</Text>
        <Text className="text-gray-700">{description?description:""}</Text>
        <Text className="text-sm text-gray-700">${price}</Text>

        <View className="flex-row items-end">
          <TouchableOpacity 
              onPress={null} 
              className="p-1 rounded-full bg-orange-500" 
              //style={{backgroundColor: themeColors.bgColor(1)}}
              >
              <Edit strokeWidth={2} height={20} width={20} stroke="white" />
            <Text>Edit</Text>
          </TouchableOpacity>        
        </View>


        </View>
      </View>
    </View>
  </Shadow>
  );
}
