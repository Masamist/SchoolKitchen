import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import NoImage from '../components/ui/noImage'
import { Shadow } from 'react-native-shadow-2'

// ServerSide
import { urlFor } from '../sanity'

export default function MealCard({ id, title, price, description, mealimage }) {
  const navigation = useNavigation()
  const imageSize = { width: 180, height: 180 }
  return (
    <>
      <TouchableWithoutFeedback onPress={()=>{
        navigation.navigate('Meal', { id, title, description, price, mealimage })
      }}>
      
        <View className="mr-4 bg-white rounded-3xl shadow-lg">
        <Shadow distance={6} startColor={'#ebebeb'} offset={[0, 3]}>
        {/* <View style={{shadowColor: themeColors.bgColor(0.2), shadowRadius: 7}} className="mr-6 bg-white rounded-3xl shadow-lg"> */}
          {
            mealimage ? <Image style={ imageSize }  className="rounded-md" source={{ uri: urlFor(mealimage).url()}} />
              : <NoImage imageStlye={ imageSize } />
          }
          </Shadow> 
          <View className="pt-1 pb-4">
            <Text className="text-lg pt-1 text-amber-950">{title}</Text>
            <Text className="text-gray-500 font-semibold text-lg">$ {price}</Text>    
          </View>
        </View>
        
      </TouchableWithoutFeedback>
    </>
  );
}

// const NoImage = () => {
//   return (
//     <View 
//       style={{ width: 180, height: 180}} 
//       className="bg-stone-300 rounded-md border-stone-600 justify-center items-center"
//     >
//       <Feather name="image" size={24} color="gray" />
//       <Text className="text-lg text-gray-500 pt-1">No Image</Text>
//     </View>
//   )
// }
