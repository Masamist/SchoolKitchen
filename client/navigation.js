import * as React from 'react'
import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import FavoritesContextProvider from './store/context/favorites-context';

// Backend
//import { User, onAuthStateChanged } from 'firebase/auth'
import { useAuthContext } from './hooks/useAuthContext'
//import { FIREBASE_AUTH, FIREBASE_DB } from './firebaseConfig'

// Screens
import HomeScreen from './screens/HomeScreen'
import MealListScreen from './screens/MealListScreen'
import MealScreen from './screens/MealScreen'
import ShoppingBasket from './screens/ShoppingBasketScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import DashboardScreen from './screens/foodProvider/DashboardScreen'
import MenuListScreen from './screens/foodProvider/MenuListScreen'
import CreateMealScreen from './screens/foodProvider/CreateMealScreen'
import UpdateMealScreen from './screens/foodProvider/UpdateMealScreen'
import RegisterScreen from './screens/RegisterScreen'
//import { ImageBackground } from 'react-native';

const ParentStack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()

export default function Navigation() {
  //const [user, setUser] = useState(null)
  const { user, authIsReady } = useAuthContext()
  //const [isLoading, setIsLoading] = useState(true)
  // const authContext = useMemo(() => {
  //   return {
  //     signIn: () => {
  //       setIsLoading(false)
  //       setUserToken
  //     }
  //   }
  // })
  
  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     setUser(user)
  // })
  // }
  // , [])
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName='Login'> */}
      {authIsReady && <>
        {user ? (
          //<Stack.Screen name="Parent" component={ParentLayout} options={{ headerShown: false }} />
          //<FavoritesContextProvider>
            <ParentStack.Navigator initialRouteName='Home' screenOptions={{
              headerStyle: { backgroundColor: '#ffffff'},
              contentStyle: { backgroundColor: '#ffffff'}
            }}>
              <ParentStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <ParentStack.Screen name="MealList" 
              options={({ route }) => {
                const catName = route.params.selectedCategoryName
                return {
                  title: catName + " List",
                }
              }} 
              component={MealListScreen} />
              <ParentStack.Screen name="MenuList" options={{ title: "Categorized Menu" }}  component={MenuListScreen} />
              <ParentStack.Screen name="Meal" options={{ presentation: 'modal', headerShown: false }} component={MealScreen} />
              <ParentStack.Screen name="ShoppingBasket" options={{ presentation: 'modal', headerShown: false }}  component={ShoppingBasket} />
              <ParentStack.Screen name="Dashboard" options={{ title: "Dashboard" }} component={DashboardScreen} />
              <ParentStack.Screen name="CreateMeal" options={{ title: "Create Meal Form" }} component={CreateMealScreen} />
              <ParentStack.Screen name="UpdateMeal" options={{ title: "Update Meal Form" }} component={UpdateMealScreen} />
              <ParentStack.Screen name="Register" options={{ title: "Register Form" }} component={RegisterScreen} initialParams={ user } />  
              
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

      </>}
    </NavigationContainer>
    
  )
}