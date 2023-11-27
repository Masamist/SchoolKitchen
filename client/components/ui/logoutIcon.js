import { Pressable } from 'react-native'
import { useLogout } from '../../hooks/useLogout'
import { MaterialIcons } from '@expo/vector-icons'

export default function logoutIcon() {
  const { logout, isPending } = useLogout()
  return (
    <Pressable onPress={logout}>
      <MaterialIcons name="logout" size={30} color="#777777" />
    </Pressable>
  )
}