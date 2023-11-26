import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import { Edit } from "react-native-feather"
import AntDesign from '@expo/vector-icons/AntDesign'
import NoImage from '../../components/ui/noImage'
import { useNavigation } from '@react-navigation/native'


// ServerSide
import { urlFor } from '../../sanity'

export default function FpMealCard({ id, title, price, description, mealimage }) {
  const navigation = useNavigation()
  const imageSize = { width: 80, height: 80 }

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(' ') + '...';
      return truncatedText;
    }
    return text;
  }

  return (
    <View className="border flex-row relative rounded-lg shadow-lg py-1 mr-3">
      <View>
        {
          mealimage ? 
            <Image style={ imageSize } className="rounded-md" source={{ uri: urlFor(mealimage).url()}} />
            : <NoImage imageStlye={ imageSize } />
        }
      </View>
      

      <View className="pl-5" style={{ flexShrink: 1 }}>
        <View className="flex-row w-full justify-between">
          <View>
            <Text className="text-lg text-amber-950">{title}</Text>
          </View>
          <View className="pr-3">
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Meal', { id, title, description, price, mealimage })
              }}>
              <Edit strokeWidth={2} height={20} width={20} stroke="#777777" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="flex-row items-center space-x-1">
            <Text className="text-s">
                <Text className="text-gray-500">$ {price}</Text>
                {
                  description ? <Text className="text-gray-500 leading-snug">{truncateText(description, 12)}</Text>
                    : <Text>No description</Text>
                }
            </Text>
        </View>
        
            {/* <TouchableOpacity 
              onPress={null} 
              className="p-1 rounded-full bg-green-500" 
              //style={{backgroundColor: themeColors.bgColor(1)}}
              >
              <AntDesign name='delete' strokeWidth={2} height={20} width={20} stroke="white" />
              <Text>Delete</Text>
            </TouchableOpacity>    */}
          
        </View>    
    </View>
  );
}
