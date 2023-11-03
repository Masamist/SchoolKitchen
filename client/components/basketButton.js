import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function BasketButton() {
  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity 
        style={{backgroundColor: "green"}} 
        onPress={()=> navigation.navigate('ShoppingBasket')} 
        className="p-3 rounded-full">
          <Text className="text-white text-center font-bold text-lg">Go To Shopping Bag</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})