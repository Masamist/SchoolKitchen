import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable, Image, Button } from 'react-native'
import Modal from "react-native-modal"

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../store/redux/favoriteSlice'
import { addToBasket, removeFromBasket, selectBasketItemsById } from '../store/redux/basketSlice'

// Components & UI
import NoImage from './ui/noImage'
import MealDetailModal from './mealDetailModal'
import { Minus, Plus } from "react-native-feather"
import { Shadow } from 'react-native-shadow-2'
import { themeColors } from '../theme'
import { AntDesign } from '@expo/vector-icons';

// ServerSide
import { urlFor } from '../sanity'


export default function MealCol({ id, title, price, description, allergies, limit, mealimage, category}) {
  // Image size
  const imageSize = { width: 130, height: 130 }

  //Redux
  const dispatch = useDispatch()

  const mealId = id
  const favoriteMealIds = useSelector((state) => state.favorites.ids)
  const mealFavorite = favoriteMealIds.includes(mealId)
  // const [mealIsFavorite, setMealIsFavorite] = useState()

  const changeFavoriteStatusHandler = () => {
    if(mealFavorite) {
      dispatch(removeFavorite({id: mealId}))
    }else{
      dispatch(addFavorite({id: mealId}))
    }
  }

  // Meal Detail Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }

  // Shopping Bag
  ///////Check inside the bag
 // console.log(bagItems)

  const basketItems = useSelector(state=> selectBasketItemsById(state, id));
  //const [bagItems, setBagItems] = useState([])
  const handleIncrease = ()=>{
    dispatch(addToBasket({id, title, price, mealimage}));
    //setBagItems({id, title, price, mealimage, quantity})
  }
  const handleDecrease = ()=>{
    dispatch(removeFromBasket({id}))
  }

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(' ') + '...';
      return truncatedText;
    }
    return text;
  }
  //console.log(mealimage)
  return (
    <View>
      {/* Meal Detail Modal */}
      <Modal isVisible={isModalVisible}>
        <MealDetailModal
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          allergies={allergies}
          limit={limit}
          mealimage={mealimage}
          category={category}
          toggleModal={toggleModal} 
        />
      </Modal>

      {/* Meal List */}
      <View className="flex-row mb-3 mr-3">
        <View>
          <Pressable onPress={toggleModal} >  
            <Shadow distance={6} startColor={'#ebebeb'} offset={[0, 3]}>
              { mealimage
                ?<Image source={{ uri: urlFor(mealimage).url() }} style={ imageSize } className="rounded-md" />
                :<NoImage imageStlye={ imageSize } /> }
            </Shadow>
          </Pressable>
        </View>        

  
        <View className="pl-5" style={{ flexShrink: 1 }}>
          <Pressable onPress={toggleModal}>
            <Text className="text-lg text-amber-950">{title}</Text>

            { description? 
              <Text className="text-gray-700 pt-1">{truncateText(description, 8)}</Text>
              : <Text>No discription</Text>
            }
          </Pressable>

          <View className="flex-row items-end">
            <View className="pr-3 pt-1">
              <Text className="text-lg text-gray-700 pt-1">$ {price}</Text>
            </View>        
            <Pressable onPress={changeFavoriteStatusHandler}>
              <AntDesign name={ mealFavorite? "heart": "hearto"} size={24} color="orange" />
            </Pressable>
          </View>

          

          <View className="flex-row justify-end" style={{ width: '100%'}}>
            <TouchableOpacity 
              onPress={handleDecrease} 
              disabled={!basketItems.length} 
              className="p-1 rounded-full bg-orange-300" 
              //style={{backgroundColor: themeColors.bgColor(1)}}
              >
              <Minus strokeWidth={2} height={20} width={20} stroke="white" />
            </TouchableOpacity>
            <Text className="px-3 text-lg">
              {basketItems.length}
            </Text>
            <TouchableOpacity 
              onPress={handleIncrease} 
              className="p-1 rounded-full" 
              style={{backgroundColor: themeColors.bgColor(1)}}
              >
              <Plus strokeWidth={2} height={20} width={20} stroke="white" />
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
      <View className="mr-3">
        <Separator />
      </View>
    </View>
  );
}

const seperatorStyles = {
  height: 1.5,
  width: '100%',
  backgroundColor: '#A8BC3A',
  marginTop: 30,
  marginBottom: 50,
}

const Separator = () => <View style={seperatorStyles} />