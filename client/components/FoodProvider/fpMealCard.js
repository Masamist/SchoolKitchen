import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Modal from "react-native-modal"

// Components & UI
import { Edit } from "react-native-feather"
import NoImage from '../../components/ui/noImage'
import MealDetailModal from '../mealDetailModal'

// ServerSide
import { urlFor } from '../../sanity'

export default function FpMealCard({ id, title, price, description, allergies, limit, mealimage, category }) {
  const navigation = useNavigation()
  const imageSize = { width: 100, height: 100 }
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(' ') + '...';
      return truncatedText;
    }
    return text;
  }

  return (
    <>
      <View 
        style={{ height: 103 }}
        className="border border-amber-900  flex-row relative rounded
          shadow-lg mr-3 mb-3 bg-white"
        >
        <Pressable onPress={toggleModal}>
          {
            mealimage ? 
              <Image 
                style={ imageSize } 
                className="rounded-l" 
                source={{ uri: urlFor(mealimage).url()}} />
              : <NoImage imageStlye={ imageSize } />
          }
        </Pressable>
        

        <View className="pl-3" style={{ flexShrink: 1 }}>
          <View className="flex-row w-full justify-between">
            <Pressable onPress={toggleModal}>
              <Text className="text-lg text-amber-950 pt-1">{title}</Text>
            </Pressable>

            <View className="pr-3 pt-2">
              <TouchableOpacity onPress={()=>{
                  navigation.navigate('UpdateMeal', { 
                    id,
                    title,
                    price,
                    description,
                    allergies,
                    limit,
                    mealimage,
                    category
                   })
                }}>
                <Edit strokeWidth={2} height={20} width={20} stroke="#777777" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex-col">
            <Text className="text-gray-500 font-semibold">$ {price}</Text>
            {
              description ? <Text className="text-gray-500 leading-snug">{truncateText(description, 10)}</Text>
                : <Text>No description</Text>
            }
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
      <Modal isVisible={isModalVisible}>
        <MealDetailModal
          id={id}
          title={title}
          price={price}
          description={description} 
          mealimage={mealimage}
          toggleModal={toggleModal} 
          />
      </Modal>
    </>
  )
}
