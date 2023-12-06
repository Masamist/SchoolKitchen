import { Text, View, Image, TouchableOpacity } from 'react-native'
// Component
import BasketIcon from './ui/basketIcon'
import ItemAddSubBtns from './ui/buttons/itemAddSubBtns'
import { AntDesign } from '@expo/vector-icons'
import NoImage from './ui/noImage'
import { useTheme } from 'react-native-paper'
// ServerSide
import { urlFor } from '../sanity';

export default function mealDetailModal({id, title, price, description, allergies, limit, mealimage, category, toggleModal}) {
  const theme = useTheme()
  const imageSize = { width: '100%', height: 300 }

  return (
    <View style={{ flex: 1 }} className="bg-white rounded-lg pr-2" >
      <View className="ml-5 mr-3">
        <View className="relative">
          {/* <View className="pt-8 h-20">
            <Text>Date: dummy 020373467</Text>
          </View> */}
          
          <View className="flex-col items-center pt-5">
            {/* Need to fix here */}
            {mealimage ? <Image className="w-full h-60 align-center rounded-lg" source={{ uri: urlFor(mealimage).url() }} /> 
            : <NoImage imageStlye={ imageSize } /> }
          </View>
          {/* GoBack Button */}
          <TouchableOpacity 
            onPress={toggleModal}
            className="absolute top-6 right-1 p-1 bg-white rounded-full">
              {/* <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} /> */}
            <AntDesign name="close" size={24} color={theme.colors.secondary} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center rounded-3xl mt-4">
          <View className="flex-colum">
            <View className="pl-1">
              <Text className="text-2xl text-amber-900">{title}</Text>
              {
                description ? <Text className="text-gray-700 text-base leading-snug">{description}</Text>
                  : <Text>No description</Text>
              }
              
              <Text className="text-xl text-amber-900 pt-4">Allergy Info</Text>
              {allergies ? <Text className="text-sm text-gray-700 ">{allergies}</Text> 
              :<Text className="text-sm text-gray-700 ">"None"</Text> }
              
              <Text className="text-2xl text-gray-700 pt-5">${price}</Text>

              <ItemAddSubBtns id={id} title={title} price={price} mealimage={mealimage} />
            </View>

            <TouchableOpacity className="pt-5" onPress={toggleModal}>
              <Text className="text-lg text-gray-500 text-center">Continue Ordering</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <BasketIcon />
    </View>
  )
}