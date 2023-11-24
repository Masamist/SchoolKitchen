import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import { ArrowLeft } from "react-native-feather"
import { AntDesign } from '@expo/vector-icons';
import NoImage from './ui/noImage'
import BasketIcon from './ui/basketIcon'

// ServerSide
import { urlFor } from '../sanity';

export default function mealDetailModal({id, title, price, description, mealimage, toggleModal}) {

  const imageSize = { width: '100%', height: 300 }

  return (
    <View style={{ flex: 1 }} className="bg-white rounded-lg px-5">
      <View className="relative">
        <View className="pt-8 h-20">
          <Text>Date: dummy 020373467</Text>
        </View>
        
        <View className="flex-col items-center">
          {/* Need to fix here */}
          {mealimage ? <Image className="w-full h-60 align-center rounded-lg" source={{ uri: urlFor(mealimage).url() }} /> 
          : <NoImage imageStlye={ imageSize } /> }
        </View>
        {/* GoBack Button */}
        <TouchableOpacity 
          onPress={toggleModal}
          className="absolute top-4 right-0">
            {/* <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} /> */}
          <AntDesign name="close" size={24} color="#715533" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center rounded-3xl mt-4">
        <View className="flex-colum">
          <View className="pl-1">
            <Text className="text-2xl text-amber-900">{title}</Text>
            {
              description ? <Text className="text-gray-700 text-lg leading-snug">{description}</Text>
                : <Text>No description</Text>
            }
            
            <Text className="text-xl text-amber-900 pt-5">Allergy Info</Text>
            <Text className="text-sm text-gray-700 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit </Text>
            <Text className="text-2xl text-gray-700 pt-5">${price}</Text>
            <TouchableOpacity className="py-4">
              <Text className="text-2xl text-gray-500 text-center">Continue Ordering</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
      <BasketIcon />
    </View>
  )
}