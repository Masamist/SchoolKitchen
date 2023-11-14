import { View, Text, Pressable, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

// ServerSide
import { FIREBASE_AUTH } from '../../firebaseConfig'

export default function DashboardScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="bg-white" >
      <StatusBar barStyle="dark-content" />
      <View>
      <Pressable onPress={()=> FIREBASE_AUTH.signOut()}>
        <Text className="font-semibold text-yellow-500"> Sign Out</Text>
      </Pressable>
      <Text>Schedule Here</Text>

      <Pressable onPress={() => navigation.navigate('MenuList')}>
        <Text className="font-semibold text-yellow-400">Meal Data</Text>
      </Pressable>
    </View>
  </SafeAreaView>
  )
}