import { View, Text, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

// ServerSide
import { getAllMeals } from '../../api'

export default function DashboardScreen() {
  const navigation = useNavigation()
  const [allMeals, setAllMeals ] = useState([])
  useEffect(() => {
    getAllMeals().then(data => {
      setAllMeals(data)
    })
  }, [])

  return (
    <View>
    <Text>Schedule Here</Text>
    <Pressable onPress={() => navigation.navigate('MenuList', {allMeals})}>
      <Text className="font-semibold text-yellow-400">Meal Data</Text>
    </Pressable>
  </View>
  )
}