import { View, Button, Pressable } from 'react-native'

// Icons
import { ShoppingBag } from "react-native-feather"
import { Heart } from "react-native-feather"
import { Menu } from "react-native-feather"
import LogoutIcon from "./icons/logoutIcon"

export default function Header({navigation, title, onPressShopping, onPressFavorite}) {
  const iconSize = 27
  const stroke='#777777'
  const iconFill ='#ffffff'
  return {
    headerTitle: title,
    headerRight: () => {
      return (
        <View className="flex-row mr-4">
          {/* <View>
            <LogoutIcon />
          </View> */}

          <Pressable onPress={()=> navigation.navigate('Favorite')} className="px-5">
            <Heart width={iconSize} height={iconSize} stroke={stroke} color={iconFill} />
          </Pressable>

          <Pressable onPress={()=> navigation.navigate('ShoppingBasket')}>
            <ShoppingBag width={iconSize} height={iconSize} stroke={stroke} fill={iconFill} />
          </Pressable>

          {/* <Pressable onPress={()=> navigation.openDrawer()}>
            <Menu width={iconSize} height={iconSize} stroke={stroke} fill={iconFill} />
          </Pressable>    */}
        </View>
      )
    }
  }
}