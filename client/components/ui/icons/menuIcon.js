import { Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons';

export default function MenuIcon() {
  return (
    <Pressable>
      <Feather name="menu" size={50} color="black" />
    </Pressable>
  )
}