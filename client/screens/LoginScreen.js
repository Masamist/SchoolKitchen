import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import SocialLogins from '../components/ui/socialLogins'


// Auth
import { signInWithEmailAndPassword } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../firebaseConfig'
import authenticateSanity from '../authenticateSanity'

export default function LoginScreen() {

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword]=useState('')
  const [loading, setLoading] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const auth = FIREBASE_AUTH

  const handleSignUpOrLogin = () => {{isSignup ? setIsSignup(false) : setIsSignup(true)}}

  const login = async() => {
    setLoading(true)
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

  const signUp = async() => {
    setLoading(true)

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
        <Text className="text-xl text-gray-700 pb-3 font-bold text-center">{isSignup? "Sign Up" : "Login"}</Text>

        
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
              <Text className="text-gray-700 mb-5">{isSignup? "" : "Forgot Password?"}</Text>
            </TouchableOpacity>
            { loading ? <ActivityIndicator size="large" color="#000ff" /> 
              : <>
                <TouchableOpacity 
                  style={isSignup? {backgroundColor: '#F2C94C'} : {backgroundColor: themeColors.bgColor(1)}}
                  className="py-3 rounded-3xl"
                  onPress={isSignup ? signUp : login}
                >
                  <Text className={isSignup? "text-xl text-center text-gray-500" : "text-xl font-bold text-center text-white"}>
                    {isSignup? "Sign Up" : "Login"}
                  </Text>
                </TouchableOpacity>   
              </>
             }
                     
          </View>
        

        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
        <SocialLogins />
        

        <View className="flex-row justify-center mt-5 mb-5">
          <Text className="text-gray-500 font-semibold">
            {isSignup? "Don't have an account?" : "Already have an account?" }
          </Text>
          {/* <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}></TouchableOpacity> */}
          {isSignup
            ?<TouchableOpacity onPress={handleSignUpOrLogin}>
              <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
            :<TouchableOpacity onPress={handleSignUpOrLogin}>
              <Text className="font-semibold text-yellow-500"> Sign Up</Text>
            </TouchableOpacity>
          }
        </View> 
        
      </View>
      </KeyboardAwareScrollView>
    </View>  
  )
}