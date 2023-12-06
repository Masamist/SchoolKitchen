import { View, Text, Pressable, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

// ServerSide
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { useLogout } from '../../hooks/useLogout'

export default function DashboardScreen() {
  const navigation = useNavigation()
  const { logout, isPending } = useLogout()

  return (
    <SafeAreaView className="bg-white" >
      <StatusBar barStyle="dark-content" />
      <View>
      <Text>Schedule Here</Text>

      <Pressable onPress={() => navigation.navigate('MenuList')}>
        <Text className="font-semibold text-yellow-400">Meal Data</Text>
      </Pressable>
    </View>
  </SafeAreaView>
  )
}