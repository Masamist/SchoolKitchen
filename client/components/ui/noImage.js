
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function NoImage({imageStlye}) {
  return (
    <View 
      style={[imageStlye]}
      className="bg-stone-300 rounded-md border-stone-600 justify-center items-center"
    >
      <Feather name="image" size={24} color="gray" />
      <Text className="text-lg text-gray-500 pt-1">No Image</Text>
    </View>
  )
}