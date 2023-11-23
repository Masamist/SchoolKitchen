import { View, Text, TouchableOpacity} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function RegisterScreen() {
  const navigation = useNavigation()
  return (
    <View>
      <Text>RegisterScreen</Text>
      <TouchableOpacity 
        onPress={()=> navigation.navigate("Home")} 
        className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
          {/* <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} /> */}
        <Text>Home</Text>
      </TouchableOpacity>
    </View> 
  )
}