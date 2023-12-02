import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'react-native-paper'


import { useLogin } from '../hooks/useLogin'
import SocialLogins from '../components/ui/socialLogins'
//import authenticateSanity from '../authenticateSanity'

export default function LoginScreen() {
  const navigation = useNavigation()
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword]=useState('')
  const { login, isPending, error } = useLogin()

  const handleLogin = () => {
    login(email, password)
  }

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView behavior='padding'>
      <SafeAreaView  className="flex">
        <View  className="flex-row justify-center mt-20 mb-10">
          <Image source={require('../assets/images/logo.png')} 
          style={{width: 200, resizeMode: 'stretch'}} />
        </View>
      </SafeAreaView>

      {/* //////////////////Login Error///////////////////////////// */}
      
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-5"
      >
        <Text className="text-xl text-gray-700 pb-3 font-bold text-center">Login</Text>

        
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput 
              className="px-5 py-3 bg-gray-200 text-gray-700 rounded-3xl"
              placeholder="Email"
              autoCapitalize='none'
              onChangeText={(text) => setEmail(text)}
              value={email.toString()} 
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput 
              className="px-5 py-3 bg-gray-200 text-gray-700 rounded-3xl"
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize='none'
              onChangeText={(text) => setPassword(text)}
              value={password.toString()} 
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            { isPending ? <ActivityIndicator size="large" color="#000ff" /> 
              : <>
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{backgroundColor: theme.colors.primary}}
                  className="py-3 rounded-3xl"
                >
                  <Text className={"text-xl font-bold text-center text-white"}>Login</Text>
                </TouchableOpacity>   
              </>
             }
            {error && <Text className="text-red">{error}</Text>}
                     
          </View>
        

        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
        <SocialLogins />
        

        <View className="flex-row justify-center mt-5 mb-5">
          <Text className="text-gray-500 font-semibold">Already have an account?</Text>
          {/* <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}></TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View> 
        
      </View>
      </KeyboardAwareScrollView>
    </View>  
  )
}