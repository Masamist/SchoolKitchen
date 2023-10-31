import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// ServerSide
import { urlFor } from '../sanity'

export default function MealCard({ id, title, price, description, mealimage }) {
  const navigation = useNavigation()
  return (
    <>
      <TouchableWithoutFeedback onPress={()=>{
        navigation.navigate('Meal', { id, title, description, price, mealimage })
      }}>
        <View className="mr-6 bg-white rounded-3xl shadow-lg">
        {/* <View style={{shadowColor: themeColors.bgColor(0.2), shadowRadius: 7}} className="mr-6 bg-white rounded-3xl shadow-lg"> */}
          <Image  className="h-40 w-40 rounded-md" source={{ uri: urlFor(mealimage).url()}} />
          
          <View className="px-3 pb-4 space-y-2">
          
            <Text className="text-lg font-bold pt-2">{title}</Text>
            <View className="flex-row items-center space-x-1">
                <Text className="text-xs">
                    <Text className="text-gray-500">{price}</Text>
                    
                </Text>
            </View>
          </View>
        </View>    
      </TouchableWithoutFeedback>
    </>
  );
}
