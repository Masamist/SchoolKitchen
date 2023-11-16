import { View, Text, TextInput, TouchableOpacity, Pressable, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
//import Snackbar from 'react-native-snackbar'
import { UseSelector } from 'react-redux/es/hooks/useSelector'


// ServerSide
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { FIREBASE_DB } from '../../firebaseConfig'
import { addDoc } from 'firebase/firestore'
import tripRef from '../../firebaseConfig'

import { User } from 'firebase/auth'
//const {user} = useSelector(state=>state.user)


export default function DashboardScreen() {
  const navigation = useNavigation()
  
  const [place, setPlace] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAppTrip = async() => {
    if(place && country){
      // good to go
      console.log()
      setLoading(true)
      let doc = await addDoc(FIREBASE_DB, tripRef, {
        Place: place,
        Country: country
        //userId: User.uid
      })
      setLoading(false)
      if(doc && doc.id){
        navigation.goBack()
      }
    }else{
      // show error
      // Snackbar.show({
      //   text: 'Place and country are required!',
        // backgroundColor: 'red',
        // duration: Snackbar.LENGTH_LONG,
      //})
    }
  }

  return (
    <SafeAreaView className="bg-white" >
      <View>
      
      {
        loading? (
          <>
            <StatusBar barStyle="dark-content" /> 
          </>
        )
        :(
          <>
          <View>
            <Pressable onPress={()=> FIREBASE_AUTH.signOut()}>
              <Text className="font-semibold text-yellow-500"> Sign Out</Text>
            </Pressable>
            <Text>Schedule Here</Text>

            <Pressable onPress={() => navigation.navigate('MenuList')}>
              <Text className="font-semibold text-yellow-400">Meal Data</Text>
            </Pressable>
            
            <View className="flex justify-between h-full mx-4">
              <View>
                <View className="relative mt-5">
                  <View className="absolute top-0 left-0 z-10">
                    {/* // Back button here */}
                  </View>
                  <Text className="text-xl front-bold text-center">DashBoard</Text>
                </View>
                <View className="flex-row justify-center my-3 mt-5">
                  {/* <Image className="h-7 w-5" source={require('../../assets/images')} /> */}
                </View>
                <View className="space-y-2 mx-2">
                  <Text className="text-lg font-bold">Where on Earth?</Text>
                  <TextInput value={place} onChangeText={value=> setPlace(value)}
                    className="p4 bg-white rounded-full mb-3" />
                  <Text className="text-lg font-bold">Which country?</Text>
                  <TextInput value={country} onChangeText={value=> setCountry(value)}
                    className="p4 bg-white rounded-full mb-3" />

                </View>
                <View>
                  <TouchableOpacity onPress={handleAppTrip} style={{backgroundColor: "green"}}
                    className="my-6 rounded-full">
                      <Text className="text-centertext-white text-lg font-bold">Add Trip</Text>
                    </TouchableOpacity>
                </View>
              </View>

            </View>
            </View>
          </>
        )
      }
      </View>
  </SafeAreaView>
  )
}