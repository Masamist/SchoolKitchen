import * as React from 'react'
import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesContextProvider from './store/context/favorites-context';

// Auth
import { User, onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from './firebaseConfig'

// Screens
import HomeScreen from './screens/HomeScreen'
import MealListScreen from './screens/MealListScreen'
import MealScreen from './screens/MealScreen'
import ShoppingBasket from './screens/ShoppingBasketScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import DashboardScreen from './screens/foodProvider/DashboardScreen'
import MenuListScreen from './screens/foodProvider/MenuListScreen'
import MealFormScreen from './screens/foodProvider/MealFormScreen'

const ParentStack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()

// function AuthStack(){
//   return(
//     <Stack.Navigator>
//       <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   )
// }

// const ParentStack = () => {
//  //const authCtx = useContext(AuthContext);
//   <ParentStack.Navigator>
//     <ParentStack.Screen name="Home" component={HomeScreen} />
//     <ParentStack.Screen name="MealList" component={MealListScreen} />
//     <ParentStack.Screen name="Meal" options={{ presentation: 'modal', headerShown: false }} component={MealScreen} />
//     <ParentStack.Screen name="ShoppingBasket" options={{ presentation: 'modal', headerShown: false }}  component={ShoppingBasket} />
//   </ParentStack.Navigator>
// }

export default function Navigation() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // const authContext = useMemo(() => {
  //   return {
  //     signIn: () => {
  //       setIsLoading(false)
  //       setUserToken
  //     }
  //   }
  // })
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
  })
  }
  , [])
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName='Login'> */}
        {user ? (
          //<Stack.Screen name="Parent" component={ParentLayout} options={{ headerShown: false }} />
          //<FavoritesContextProvider>
            <ParentStack.Navigator initialRouteName='Home'>
              <ParentStack.Screen name="Home" component={HomeScreen} />
              <ParentStack.Screen name="MealList" component={MealListScreen} />
              <ParentStack.Screen name="Meal" options={{ presentation: 'modal', headerShown: false }} component={MealScreen} />
              <ParentStack.Screen name="ShoppingBasket" options={{ presentation: 'modal', headerShown: false }}  component={ShoppingBasket} />
              <ParentStack.Screen name="Dashboard" component={DashboardScreen} />
              <ParentStack.Screen name="MenuList" component={MenuListScreen} />
              <ParentStack.Screen name="MealForm" component={MealFormScreen} />
            </ParentStack.Navigator>
          //</FavoritesContextProvider>        
        ) : (
          <AuthStack.Navigator initialRouteName='Login'>
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />    
            <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />   
          </AuthStack.Navigator>
        )}
       
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}  />
        
        <Stack.Screen name="MealList" component={MealListScreen} />
        <Stack.Screen name="Meal" options={{ presentation: 'modal', headerShown: false }} component={MealScreen} />
        <Stack.Screen name="ShoppingBasket" options={{ presentation: 'modal', headerShown: false }}  component={ShoppingBasket} /> */}
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  )
}