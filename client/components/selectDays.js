import { View, Text, Image } from 'react-native'
import React from 'react'
import SelectDayBtn from './ui/selectDayBtn'

export default function SelectDays() {
  return (
    <View className="pt-1">
      <Text className="text-lg text-amber-950 pl-1">Select when the order is required...</Text>
      <View className="flex-row justify-between pr-4">
        <SelectDayBtn link={require('../assets/images/singleDayIcon.png')} title="Single\nDay" color={[{backgroundColor:"#D3DD9C"}]} />
        <SelectDayBtn link={require('../assets/images/multiDayIcon.png')} title="Multiple\nDays" color={[{backgroundColor:"#F8E4A5"}]} />
        <SelectDayBtn link={require('../assets/images/monthlyIcon.png')} title="Monthly\nOrder" color={[{backgroundColor:"#D5CCC2"}]} />
      </View>
    </View>
    
    
  )
}