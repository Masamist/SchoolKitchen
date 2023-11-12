import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

// Firebase
import { FIREBASE_AUTH } from '../firebaseConfig'
//import auth from '@react-native-firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth'

// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword]=useState('')
  const [loading, setLoading] = useState(false)
  //const auth = FIREBASE_AUTH()
  const auth = FIREBASE_AUTH

  const signUp = async() => {
    setLoading(true)

    // await createUserWithEmailAndPassword(auth, fullName, email, password)
    // .then((userCredential) => {
    //   // Signed up 
    //   const user = userCredential.user;
    //   console.log(user)
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ..
    // })
    // .finally(()=> setLoading(false))

      // createUserWithEmailAndPassword(auth, email, password)
      // .then((userCredential) => {
      //   // Signed up 
      //   const user = userCredential.user;
      //   console.log(user)
      //   // ...
        
      // })
      
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   // ..
      // })
      // .finally(()=> setLoading(false))
      try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        console.log(response)
        alert('Success!')
        navigation.navigate('Home')
      } catch (error) {
        console.log(error)
        alert('Registration failed:' + error.message)
      } finally {
        setLoading(false)
      }
    }

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity 
              onPress={()=> navigation.goBack()}
              className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
              <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
            {/* <Image source={require('../assets/images/signup.png')} 
                style={{width: 165, height: 110}} /> */}
        </View>
      </SafeAreaView>

      <KeyboardAwareScrollView behavior='padding'>

        <View className="flex-1 bg-white px-8 pt-8"
          style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
                placeholder='Enter Name'
                autoCorrect={false}
            />
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
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
                value={password.toString()} 
            />
            { loading ? <ActivityIndicator size="large" color="#000ff" /> 
              : <>
                <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                onPress={signUp}
                >
                    <Text className="font-xl font-bold text-center text-gray-700">Sign Up</Text>
                </TouchableOpacity>
              </>
            }
          </View>

          <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>

          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                {/* <Image source={require('../assets/icons/google.png')} 
                    className="w-10 h-10" /> */}
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                {/* <Image source={require('../assets/icons/apple.png')} 
                    className="w-10 h-10" /> */}
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                {/* <Image source={require('../assets/icons/facebook.png')} 
                    className="w-10 h-10" /> */}
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
              <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}