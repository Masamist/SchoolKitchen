import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

export default function ProceedButton({children, onPress}) {
  return (
    <View>
      <Pressable 
        style={{backgroundColor: "#A8BC3A"}} 
        onPress={onPress}
        className="p-3 rounded-full shadow-md">
          <Text className="text-white text-center font-bold text-lg">{children}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})