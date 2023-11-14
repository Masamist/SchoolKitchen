import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import { Edit } from "react-native-feather"
import { useNavigation } from '@react-navigation/native'


// ServerSide
import { urlFor } from '../../sanity'

export default function FpMealCard({ id, title, price, description, mealimage }) {
  const navigation = useNavigation()
  return (
    <>
      <TouchableWithoutFeedback onPress={()=>{
        navigation.navigate('Meal', { id, title, description, price, mealimage })
      }}>
        <View className="mr-6 bg-white rounded-3xl shadow-lg">
        {/* <View style={{shadowColor: themeColors.bgColor(0.2), shadowRadius: 7}} className="mr-6 bg-white rounded-3xl shadow-lg"> */}
          <Image  className="h-20 w-20 rounded-md" source={{ uri: urlFor(mealimage).url()}} />
          
          <View className="px-3 pb-4 space-y-2">
          
            <Text className="text-lg font-bold pt-2">{title}</Text>
            <View className="flex-row items-center space-x-1">
                <Text className="text-s">
                    <Text className="text-gray-500">$ {price}</Text>
                    
                </Text>
            </View>
            <TouchableOpacity 
              onPress={null} 
              className="p-1 rounded-full bg-green-500" 
              //style={{backgroundColor: themeColors.bgColor(1)}}
              >
              <Edit strokeWidth={2} height={20} width={20} stroke="white" />
              <Text>Edit</Text>
          </TouchableOpacity>   
          </View>
        </View>    
      </TouchableWithoutFeedback>
    </>
  );
}
