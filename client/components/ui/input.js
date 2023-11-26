import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function input({label, textInputConfig}) {
  return (
    <View className="mx-5 my-2">
      <Text className="text-amber-950 pb-1">{label}</Text>
      <TextInput 
        className="border border-gray-500 p-2 rounded-lg text-lg" 
        {...textInputConfig}
      />
    </View>
  )
}