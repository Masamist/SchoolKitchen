import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
//import { categories } from '../constants';


// Sanity & Redux
import { getCategories } from '../api'
import { urlFor } from '../sanity'


export default function componentName() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([])
  const navigation = useNavigation()
useEffect(() => {
  getCategories().then(data => {
    //console.log('Got Data', data[0].name)
    setCategories(data)
  })
}, [])

  return (
    <View className="mt-4 mb-4">
      <ScrollView
          // className="p-4"
          horizontal
          showsHorizontalScrollIndicator={false}
          className="overflow-visible"
          contentContainerStyle={{
            paddingHorizontal: 15
          }}
      >
          {
            categories?.map(category => {
              let isActive = category._id==activeCategory;
              let btnClass = isActive? ' bg-gray-400': ' bg-gray-200';
              let textClass = isActive? ' font-semibold text-gray-800': ' text-gray-500';
              return(
                <View key={category._id} className="flex justify-center items-center mr-6">
                  <TouchableOpacity 
                    onPress={()=> {
                      setActiveCategory(category._id),
                      navigation.navigate('MealList', category._id)
                    }}
                    className={"p-2 rounded-full"+ btnClass}>
                    <Image 
                      style={{width: 50, height: 50}} 
                      source={{ uri: urlFor(category.image).url() }} 
                    />
                  </TouchableOpacity>
                  <Text className={"pt-1 text-sm "+ textClass}>{category.name}</Text>
                </View> 
              )
            })
          }
        
      </ScrollView>
     </View>
  )
}
