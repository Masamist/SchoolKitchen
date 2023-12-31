import { View, Text, Image, Pressable } from 'react-native'
import React, {useContext} from 'react'
import DateContext from '../../store/context/dateContext'
import { useTheme } from 'react-native-paper'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'

export default function DateSelected({date}) {
  const theme = useTheme()
  //console.log(date["date"])
  const selectedDate = moment(date["date"]).format('dddd, MMMM Do')
  const { setDate } = useContext(DateContext)

  const HandleReset = () => {
    setDate(undefined)
  }

  return (
    <View 
      className="flex-row justify-between border items-center my-2 p-3 rounded-lg relative" 
      style={{ borderColor: theme.colors.tertiary }}>
      <Image 
        source={require('../../assets/images/singleDayIcon.png')} 
        style={{width: 50, height: 50, resizeMode: 'stretch'}} />
        <View className="border-b mr-3">
          <Text className="text-base text-amber-950">Date: {selectedDate}</Text>
        </View>
        <View className="absolute top-1 right-1">
          <Pressable onPress={() => HandleReset()}>
            <AntDesign name="close" size={20} color={theme.colors.error} />
          </Pressable>
        </View>     
    </View>
  )
}
