import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor:  themeColors.bgColor(1)}}>
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">
          Let's Get Started!
        </Text>

        <View>
          {/* <Image source={require("")} /> */}
        </View>

        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="py-3 bg-yellow-400 mx-7 rounded-xl">
            <Text className="text-xl font-bold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-white font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="font-semibold text-yellow-400">Log In</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}
