import { Pressable, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons';

export default function MenuIcon({onPress}) {
  return (
    <Pressable onPress={onPress}>
      <Feather 
        name="menu" size={50} color="gray"
        styles={({pressed}) => pressed && styles.pressed} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  }
})