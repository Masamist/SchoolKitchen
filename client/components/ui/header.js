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
    <View className="flex-row-reverse mt-1 mb-5 mx-5">

      <View>
        <LogoutIcon />
      </View>
      
      <Pressable onPress={()=> navigation.navigate('Home')}>
        <ShoppingBag width={30} height={30} stroke="#777777" fill="#ffffff" />
      </Pressable>

      <Pressable onPress={()=> navigation.navigate('Favorite')}>
        <Heart width={30} height={30} stroke="#777777" color="#ffffff" />
      </Pressable>    
    </View>
  )
}