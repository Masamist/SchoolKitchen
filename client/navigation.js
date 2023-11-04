import * as React from 'react'
import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MealListScreen from './screens/MealListScreen'
import MealScreen from './screens/MealScreen'
import ShoppingBasket from './screens/ShoppingBasketScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator()

//const ParentStack = createNativeStackNavigator()

// function ParentLayout(){
//   <ParentStack.Navigator>
//     <ParentStack.Screen name="Home" component={HomeScreen} />
//     <ParentStack.Screen name="MealList" component={MealListScreen} />
//     <ParentStack.Screen name="Meal" options={{ presentation: 'modal', headerShown: false }} component={MealScreen} />
//     <ParentStack.Screen name="ShoppingBasket" options={{ presentation: 'modal', headerShown: false }}  component={ShoppingBasket} />
//   </ParentStack.Navigator>
// }

export default function Navigation() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
  })
  }
  , [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          //<Stack.Screen name="Parent" component={ParentLayout} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          
          ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />    
        )}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MealList" component={MealListScreen} />
        <Stack.Screen name="Meal" options={{ presentation: 'modal', headerShown: false }} component={MealScreen} />
        <Stack.Screen name="ShoppingBasket" options={{ presentation: 'modal', headerShown: false }}  component={ShoppingBasket} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}