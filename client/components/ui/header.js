import { View, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ShoppingBag } from "react-native-feather"
import { Heart } from "react-native-feather"
import { Menu } from "react-native-feather"
import LogoutIcon from "./logoutIcon"

// ServerSide
import { FIREBASE_AUTH } from '../../firebaseConfig'

export default function Header() {
  const navigation = useNavigation()
  return (
    <View className="flex-row-reverse space-x-5 rounded-3xl mt-1 mb-5 mx-5">
      <Pressable onPress={()=> navigation.navigate('Dashboard')}>
        <Menu width={30} height={30} stroke="#777777" color="#ffffff" />
      </Pressable>
      <LogoutIcon />
      
      <Pressable onPress={()=> navigation.navigate('Home')}>
        <ShoppingBag width={30} height={30} stroke="#777777" fill="#ffffff" />
      </Pressable>

      <Pressable onPress={()=> navigation.navigate('Home')}>
        <Heart width={30} height={30} stroke="#777777" color="#ffffff" />
      </Pressable>

      <Pressable onPress={()=> navigation.navigate('Dashboard')}>
        <Text className="font-semibold text-yellow-500">  / Food Provider Page /</Text>
      </Pressable>
    
    </View>
  )
}