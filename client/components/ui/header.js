import { View, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { ShoppingBag } from "react-native-feather"
import { Heart } from "react-native-feather"
import { Menu } from "react-native-feather"

// ServerSide
import { FIREBASE_AUTH } from '../../firebaseConfig'

export default function Header() {
  const navigation = useNavigation()
  return (
    <View className="flex-row-reverse space-x-5 rounded-3xl my-5 mx-5">
      <Pressable onPress={()=> navigation.navigate('Dashboard')}>
        <Menu width={30} height={30} stroke="#777777" color="#ffffff" />
      </Pressable>
      <Pressable onPress={()=> FIREBASE_AUTH.signOut()}>
        <MaterialIcons name="logout" size={30} color="#777777" />
      </Pressable>
      
      <Pressable onPress={()=> navigation.navigate('home')}>
        <ShoppingBag width={30} height={30} stroke="#777777" fill="#ffffff" />
      </Pressable>

      <Pressable onPress={()=> navigation.navigate('home')}>
        <Heart width={30} height={30} stroke="#777777" color="#ffffff" />
      </Pressable>

      <Pressable onPress={()=> navigation.navigate('Dashboard')}>
        <Text className="font-semibold text-yellow-500">  / Food Provider Page /</Text>
      </Pressable>

      
    </View>
  )
}