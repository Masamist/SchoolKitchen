import 'react-native-gesture-handler'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
//import FavoritesContextProvider from './store/context/favorites-context';

// Backend
//import { User, onAuthStateChanged } from 'firebase/auth'
import { useAuthContext } from './hooks/useAuthContext'
//import { FIREBASE_AUTH, FIREBASE_DB } from './firebaseConfig'

// Screens
import HomeScreen from './screens/HomeScreen'
import MealListScreen from './screens/MealListScreen'
import MealScreen from './screens/MealScreen'
import FavoriteScreen from './screens/FavoriteScreen'
import ShoppingBasket from './screens/ShoppingBasketScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import DashboardScreen from './screens/foodProvider/DashboardScreen'
import MenuListScreen from './screens/foodProvider/MenuListScreen'
import CreateMealScreen from './screens/foodProvider/CreateMealScreen'
import UpdateMealScreen from './screens/foodProvider/UpdateMealScreen'
import RegisterScreen from './screens/RegisterScreen'
//import { ImageBackground } from 'react-native';

const Drawer = createDrawerNavigator()
const AuthStack = createNativeStackNavigator()
const ParentStack = createNativeStackNavigator()
const FpStack = createNativeStackNavigator()

function ParentRoot() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Favorite" options={{ title: "Favorite Meal" }} component={FavoriteScreen} />
      <Drawer.Screen name="Shopping Basket" options={{ presentation: 'modal'}}  component={ShoppingBasket} />       
      {/* <Drawer.Screen name="Register" options={{ title: "Register Form" }} component={RegisterScreen} initialParams={ user } />   */}
      <Drawer.Screen name="Food Provider" component={FoodProviderRoot} options={{headerShown:false}} />
    </Drawer.Navigator>
  )
}
function ParentNavigator(){
  return (
    <ParentStack.Navigator>
    <ParentStack.Screen name="ParentRoot" component={ParentRoot} options={{headerShown:false}} />
    <ParentStack.Screen name="MealList" 
      options={({ route }) => {
        const catName = route.params.selectedCategoryName
          return { title: catName + " List" }
        }} 
      component={MealListScreen} />
    <ParentStack.Screen name="Register" options={{ title: "Register Form" }} component={RegisterScreen} />
    </ParentStack.Navigator>
  )
}

function FoodProviderRoot(){
  return (
    <FpStack.Navigator>
      <FpStack.Screen name="Dashboard" options={{ title: "Dashboard" }} component={DashboardScreen} />
      <FpStack.Screen name="MenuList" options={{ title: "Categorized Menu" }}  component={MenuListScreen} />
      <FpStack.Screen name="CreateMeal" options={{ title: "Create Meal Form" }} component={CreateMealScreen} />
      <FpStack.Screen name="UpdateMeal" options={{ title: "Update Meal Form" }} component={UpdateMealScreen} />
   </FpStack.Navigator>
  )
}

export default function Navigation() {
  const { user, authIsReady } = useAuthContext()
 
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName='Login'> */}
      {authIsReady && <>
        {user ? (
          //<Stack.Screen name="Parent" component={ParentLayout} options={{ headerShown: false }} />
          //<FavoritesContextProvider>
          <ParentNavigator />
            // <Drawer.Navigator initialRouteName='Home' screenOptions={{
            //   headerStyle: { backgroundColor: '#ffffff'},
            //   contentStyle: { backgroundColor: '#ffffff'}
            // }}>
            //   <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            //   <Drawer.Screen name="MealList" 
            //   options={({ route }) => {
            //     const catName = route.params.selectedCategoryName
            //     return {
            //       title: catName + " List",
            //     }
            //   }} 
            //   component={MealListScreen} />
            //   <Drawer.Screen name="MenuList" options={{ title: "Categorized Menu" }}  component={MenuListScreen} />
            //   <Drawer.Screen name="Meal" options={{ presentation: 'modal', headerShown: false }} component={MealScreen} />
            //   <Drawer.Screen name="Favorite" options={{ title: "Favorite Meal" }} component={FavoriteScreen} />
            //   <Drawer.Screen name="ShoppingBasket" options={{ presentation: 'modal', headerShown: false }}  component={ShoppingBasket} />
            //   <Drawer.Screen name="Dashboard" options={{ title: "Dashboard" }} component={DashboardScreen} />
            //   <Drawer.Screen name="CreateMeal" options={{ title: "Create Meal Form" }} component={CreateMealScreen} />
            //   <Drawer.Screen name="UpdateMeal" options={{ title: "Update Meal Form" }} component={UpdateMealScreen} />
            //   <Drawer.Screen name="Register" options={{ title: "Register Form" }} component={RegisterScreen} initialParams={ user } />  
              
            // </Drawer.Navigator>
          //</FavoritesContextProvider>        
        ) : (
          <AuthStack.Navigator initialRouteName='Login'>
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />          
          </AuthStack.Navigator>
        )}
       
      </>}
    </NavigationContainer>
    
  )
}