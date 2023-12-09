import React, { useEffect, useState, useContext } from 'react'
import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import CategoryContext from '../../store/context/categoryContext'
import { Shadow } from 'react-native-shadow-2'

// Sanity & Redux
import { getCategories } from '../../api/mealApi'
import { urlFor } from '../../sanity'

export default function Categories({handleCategoryChange}) {
  const { activeCategory } = useContext(CategoryContext)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
    })
  }, [])

  const handleOnPress = (catId, catName) => {
    //setActiveCategory(catId)
    handleCategoryChange(catId, catName)
  }

  return (
    <View className="mb-11 ml-3">
      <Text className="text-lg pb-1 text-amber-950">Meal Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
      >
        {
          categories?.map(category => {
            let isActive = category._id==activeCategory
            let btnClass = isActive? ' bg-amber-200': ' bg-amber-100'
            let textClass = isActive? ' font-semibold text-gray-700': ' text-gray-500'
            return(
              <View key={category._id} className="flex justify-center items-center mr-5">
                <Pressable onPress={() => handleOnPress(category._id, category.name)}>
                <Shadow distance={5} startColor={'#ebebeb'} offset={[2, 5]}>
                  <View className={"p-3 shadow-md"+ btnClass} style={{borderRadius: 50}} >
                      <Image 
                          style={{width: 40, height: 40}} 
                          source={{ uri: urlFor(category.image).url() }}
                        />
                  </View>
                </Shadow>
                  <Text className={"pt-2 text-center text-xs"+ textClass}>{category.name}</Text>
                </Pressable>
              </View> 
            )
          })
        }     
      </ScrollView>
    </View>
  )
}
