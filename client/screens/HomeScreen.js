import React from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native'
//import { useNavigation } from '@react-navigation/native'

// Component
import Categories from '../components/categories'
import FeaturedRow from '../components/featuredRow'

export default function HomeScreen() {

  
  

  return (
    <SafeAreaView className="bg-white" >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            paddingBottom: 50
        }}
      >      
        {/* categories */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('MealList')}
        ></TouchableOpacity> */}
        <Categories />
        
        

        {/* featured */}
        <View className="mt-5">
          <Text>New Meals</Text>
            <FeaturedRow />

        </View>
          
        
      </ScrollView>  
    </SafeAreaView>
  )
}
