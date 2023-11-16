import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'

// Auth
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../firebaseConfig'
import authenticateSanity from '../authenticateSanity'

export default function LoginScreen() {

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword]=useState('')
  const [loading, setLoading] = useState(false)
  const auth = FIREBASE_AUTH

  const login = async() => {
    setLoading(true)
    // await signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   })
    //   .finally(()=> setLoading(false))
    // }
    try{
      const response = await signInWithEmailAndPassword(auth, email, password)
      console.log(response)
      const user = response.user;
      const token = await user.getIdToken()
      authenticateSanity(token)
    } catch (error) {
      console.log(error)
      alert('Signin failed:' + error.message)
    } finally {
      setLoading
    }
  }

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          {/* <Image source={require('../assets/images/login.png')} 
          style={{width: 200, height: 200}} /> */}
        </View>
      </SafeAreaView>

      {/* //////////////////Error///////////////////////////// */}
      
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
        <KeyboardAwareScrollView behavior='padding'>
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Email"
              autoCapitalize='none'
              onChangeText={(text) => setEmail(text)}
              value={email.toString()} 
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize='none'
              onChangeText={(text) => setPassword(text)}
              value={password.toString()} 
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            { loading ? <ActivityIndicator size="large" color="#000ff" /> 
              : <>
                <TouchableOpacity 
                  className="py-3 bg-yellow-400 rounded-xl"
                  onPress={login}
                >
                  <Text className="text-xl font-bold text-center text-gray-700">
                    Login
                  </Text>
                </TouchableOpacity>   
              </>
             }
                     
          </View>
        </KeyboardAwareScrollView>

        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            {/* <Image source={require('../assets/icons/google.png')} className="w-10 h-10" /> */}
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            {/* <Image source={require('../assets/icons/apple.png')} className="w-10 h-10" /> */}
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            {/* <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10" /> */}
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">
                Don't have an account?
            </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                <Text className="font-semibold text-yellow-500"> Sign Up</Text>
            </TouchableOpacity>
        </View> 
      </View>

    </View>  
  )
}