import { View, Text, Pressable, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import CategoryContext from '../../store/context/categoryContext'
import { useTheme } from 'react-native-paper'


export default function DashboardScreen() {
  const navigation = useNavigation()
  const theme = useTheme()
  const { setActiveCategory } = useContext(CategoryContext)

  const handleScreenChange = () => {
    navigation.navigate('MenuList', {
      selectedCategoryName: "All Meal List"
    })  
  }

  useEffect(() => {
    setActiveCategory(undefined)
  })


  return (
    <SafeAreaView>
      <View className="flex items-center justify-center">
        <Text className="text-lg pb-5">Order List with Calender Here</Text>

        <Pressable
          style={{ backgroundColor: theme.colors.secondary}}
          className="px-5 py-2 rounded-full"
          onPress={() => handleScreenChange()}>
          <Text className="font-semibold text-white">Meal List</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}