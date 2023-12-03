import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

export default function SelectDayBtn({ link, title, color, onPress }) {
  
  return (
    <View className="flex-row justify-between pt-2 pr-3 pb-7">
      <TouchableOpacity onPress={onPress}>
        <Shadow distance={5} startColor={'#ebebeb'} offset={[2, 5]}>
          <View className="flex items-center py-4" style={[{ width: 120, borderRadius: 10}, color]} >
            <Image source={link} 
              style={{width: 53, height: 53, resizeMode: 'stretch'}} />
            <Text className="text-lg text-center text-amber-950 pt-1"  style={{lineHeight: 24}}>{title.replace('\\n', '\n' )}</Text>
          </View>
        </Shadow>
      </TouchableOpacity> 
    </View>  
  )
}