import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeft } from "react-native-feather"
import BasketButton from '../components/basketButton'

// ServerSide
import { urlFor } from '../sanity';

export default function MealScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { title, description, price, mealimage } = route.params

  return (
    <>
      {/* GoBack Button */}
      <View className="relative">
        <Image className="w-full h-72" source={{ uri: urlFor(mealimage).url() }} />
        <TouchableOpacity 
            onPress={()=> navigation.goBack()} 
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
            {/* <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} /> */}
            <ArrowLeft strokeWidth={3} className='text-gray-400' />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center rounded-3xl mb-3 mx-2">
        <View className="flex-colum">
          <View className="pl-2">
            <Text className="text-xl">{title} </Text>
            <Text className="text-gray-700">{description}</Text>
            <Text className="text-sm text-gray-700">${price}</Text>
          </View>
        </View>
      </View>
      <BasketButton />
    </>
  )
}

const styles = StyleSheet.create({})