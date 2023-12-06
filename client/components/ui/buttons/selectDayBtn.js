import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

export default function SelectDayBtn({ link, title, color, onPress }) {
  
  
  return (
    <View style={{ width: '30%'}}>
      <TouchableOpacity onPress={onPress}>
        <Shadow distance={5} startColor={'#ebebeb'} offset={[2, 5]}>
          <View 
            className="flex-col items-center py-3" 
            style={[{ width: 110, borderRadius: 10}, color]} >
            <Image source={link} 
              style={{width: 48, height: 48, resizeMode: 'stretch'}} />
            <Text 
              className="text-lg text-center text-amber-950 pt-1"  
              style={{lineHeight: 24}}>
                {title.replace('\\n', '\n' )}
            </Text>
          </View>
        </Shadow>
      </TouchableOpacity> 
    </View>  
  )
}