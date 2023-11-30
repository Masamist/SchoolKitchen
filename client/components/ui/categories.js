import React, { useEffect, useState, useContext } from 'react'
import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import CategoryContext from '../../store/context/categoryContext'
import { Shadow } from 'react-native-shadow-2'

// Sanity & Redux
import { getCategories } from '../../api/mealApi'
import { urlFor } from '../../sanity'

export default function Categories({handleCategoryChange}) {
  const { activeCategory, selectCategory } = useContext(CategoryContext)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
    })
    //setMeals(allMeals)
  }, [activeCategory])

  const handleOnPress = (id, catName) => {
    handleCategoryChange(id, catName)
    selectCategory(id)
  }

  return (
    <View className="mt-4 mb-5">
      <Text className="text-lg pb-2 text-amber-950">Meal Categories</Text>
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
              <View key={category._id} className="flex justify-center items-center mr-7 pl-1">
                <Pressable onPress={() => handleOnPress(category._id, category.name)}>
                <Shadow distance={5} startColor={'#ebebeb'} offset={[2, 5]}>
                  <View className={"p-3 shadow-md"+ btnClass} style={{borderRadius: 50}} >
                      <Image 
                          style={{width: 42, height: 42}} 
                          source={{ uri: urlFor(category.image).url() }}
                        />
                  </View>
                </Shadow>
                  
                  <Text className={"pt-2 text-center text-sm "+ textClass}>{category.name}</Text>
                </Pressable>
                
              </View> 
            )
          })
        }     
      </ScrollView>
    </View>
  )
}
