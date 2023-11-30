import { View, Button, Pressable } from 'react-native'

// Icons
import { ShoppingBag } from "react-native-feather"
import { Heart } from "react-native-feather"
import { Menu } from "react-native-feather"
import LogoutIcon from "./logoutIcon"

export default function Header({navigation, title, onPressShopping, onPressFavorite}) {
  const iconSize = 27
  return {
    headerTitle: title,
    headerRight: () => {
      return (
        <View className="flex-row mr-3">
          <View>
            <LogoutIcon />
          </View>
          
          <Pressable onPress={()=> onPressShopping}>
            <ShoppingBag width={iconSize} height={iconSize} stroke="#777777" fill="#ffffff" />
          </Pressable>

          <Pressable onPress={()=> onPressFavorite} className="px-4">
            <Heart width={iconSize} height={iconSize} stroke="#777777" color="#ffffff" />
          </Pressable>

          <Pressable onPress={()=> navigation.openDrawer()}>
            <Menu width={iconSize} height={iconSize} stroke="#777777" fill="#ffffff" />
          </Pressable>   
        </View>
      )
    }
  }
}