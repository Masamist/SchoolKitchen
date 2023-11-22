import { View, TouchableOpacity, Image } from 'react-native'
// Icons
import { FontAwesome5 } from '@expo/vector-icons'

export default function SocialLogins() {
  return (
    <View className="flex-row justify-center space-x-12">
      <TouchableOpacity className="p-2 bg-white rounded-2xl">
        <Image source={require('../../assets/images/google-logo.png')} className="w-10 h-10" />
      </TouchableOpacity>
      <TouchableOpacity className="p-2 bg-white rounded-2xl">
        <FontAwesome5 name="apple" size={42} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity className="p-2 bg-white rounded-2xl">
        <FontAwesome5 name="facebook" size={40} color="#1877F2" />
      </TouchableOpacity>
    </View>
  )
}