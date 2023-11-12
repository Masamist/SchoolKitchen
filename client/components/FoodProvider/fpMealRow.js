import React, { useState } from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { Edit } from "react-native-feather"
import { useNavigation } from '@react-navigation/native'

// ServerSide
import { urlFor } from '../../sanity'

export default function fpMealRow() {
  const navigation = useNavigation()
  return (
    <>
      <View className="flex-row items-center rounded-3xl mb-3 mx-2">
        <View className="flex-row">
          <Pressable
            // onPress={() => 
            //   navigation.navigate('Meal', { 
            //     id, 
            //     title, 
            //     description, 
            //     price, 
            //     mealimage })
            // }
          >          
            <View className="pl-2">
              { mealimage && <Image source={{ uri: urlFor(mealimage).url() }} className="h-14 w-14" /> }
            </View>
          </Pressable>

        <View className="pl-2">
          <Text className="text-xl">{title}</Text>
          <Text className="text-gray-700">{description}</Text>
          <Text className="text-sm text-gray-700">${price}</Text>

          <View className="flex-row items-end">
            <Pressable 
                onPress={navigation.navigate('MealForm')} 
                //style={{backgroundColor: themeColors.bgColor(1)}}
                >
                <Edit strokeWidth={2} height={20} width={20} stroke="white" />
                <Text>Edit</Text>
            </Pressable>          
          </View>


          </View>
        </View>
      </View>
    </>
  );
}
