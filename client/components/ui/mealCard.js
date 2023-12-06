import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Button } from 'react-native'
import NoImage from './noImage'
import { Shadow } from 'react-native-shadow-2'
import Modal from "react-native-modal"
import MealDetailModal from '../mealDetailModal'

// ServerSide
import { urlFor } from '../../sanity'

export default function MealCard({ id, title, price, description, allergies, limit, mealimage }) {
  const imageSize = { width: 150, height: 150 }
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={toggleModal}>
      
        <View className="mr-4 bg-white rounded-3xl shadow-lg">
        <Shadow distance={6} startColor={'#ebebeb'} offset={[0, 3]}>
        {/* <View style={{shadowColor: themeColors.bgColor(0.2), shadowRadius: 7}} className="mr-6 bg-white rounded-3xl shadow-lg"> */}
          {
            mealimage? 
              <Image style={ imageSize }  
                className="rounded-md" 
                source={{ uri: urlFor(mealimage).url()}} />
              : <NoImage imageStlye={ imageSize } />
          }
          </Shadow> 
          <View className="pt-1 pb-4">
            <Text className="text-base text-amber-950">{title}</Text>
            <Text className="text-gray-500 font-semibold text-base">$ {price}</Text>
          </View>
        </View>
        
      </TouchableWithoutFeedback>

      <Modal isVisible={isModalVisible}>
        <MealDetailModal
          id={id}
          title={title}
          price={price}
          description={description}
          allergies={allergies}
          limit={limit}
          mealimage={mealimage}
          //category={category}
          toggleModal={toggleModal} 
          />
      </Modal>
    </>
  );
}