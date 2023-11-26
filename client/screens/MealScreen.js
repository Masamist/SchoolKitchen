import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeft } from "react-native-feather"
import NoImage from '../components/ui/noImage'
import BasketIcon from '../components/ui/basketIcon'
//import { themeColors } from '../theme'

// ServerSide
import { urlFor } from '../sanity';

export default function MealScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { title, description, price, mealimage } = route.params
  const imageSize = { width: '100%', height: 300 }
  return (
    <>
      {/* GoBack Button */}
      <View className="relative">
        {/* Need to fix here */}
        {mealimage ? <Image className="w-full h-72" source={{ uri: urlFor(mealimage).url() }} /> 
        : <NoImage imageStlye={ imageSize } /> }
        
        <TouchableOpacity 
          onPress={()=> navigation.goBack()} 
          className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
            {/* <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} /> */}
          <ArrowLeft strokeWidth={3} className='text-gray-400' />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center rounded-3xl mx-3 mt-4">
        <View className="flex-colum">
          <View className="pl-2">
            <Text className="text-2xl text-amber-900">{title} </Text>
            {
              description ? <Text className="text-gray-700 text-lg">{description}</Text>
                : <Text>No description</Text>
            }
            
            <Text className="text-2xl text-gray-700">${price}</Text>
            <TouchableOpacity className="py-6">
              <Text className="text-2xl text-gray-500 text-center">Continue Ordering</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
      <BasketIcon />
    </>
  )
}

const styles = StyleSheet.create({})