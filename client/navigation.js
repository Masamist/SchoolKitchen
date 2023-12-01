import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useLogout } from './hooks/useLogout'
//import FavoritesContextProvider from './store/context/favorites-context';

// Backend
import { useAuthContext } from './hooks/useAuthContext'

// Screens
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'

import HomeScreen from './screens/HomeScreen'
import MealListScreen from './screens/MealListScreen'
import FavoriteScreen from './screens/FavoriteScreen'
import ShoppingBasket from './screens/ShoppingBasketScreen'
import HelpScreen from './screens/HelpScreen';
import RegisterScreen from './screens/RegisterScreen'

import DashboardScreen from './screens/foodProvider/DashboardScreen'
import MenuListScreen from './screens/foodProvider/MenuListScreen'
import CreateMealScreen from './screens/foodProvider/CreateMealScreen'
import UpdateMealScreen from './screens/foodProvider/UpdateMealScreen';

//Icon
import { Entypo } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { ShoppingBag } from "react-native-feather"
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';

const Drawer = createDrawerNavigator()
const AuthStack = createNativeStackNavigator()
const ParentStack = createNativeStackNavigator()
const FpStack = createNativeStackNavigator()

function CustomDrawerContent(props) {
  const { logout, isPending } = useLogout()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem 
        label="Logout" 
        onPress={logout} 

        icon={({size, color}) => (
        <MaterialIcons name="logout" size={size} color={color} />
        )}
         />
    </DrawerContentScrollView>
  );
}

function ParentRoot() {

  return (
    <Drawer.Navigator   
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#A8BC3A',
          width: '90%',
          overlayColor: 'transparent',
          paddingTop: 10,
          paddingHorizontal: 10,
        },
        headerTintColor: '#777777',
        drawerActiveBackgroundColor: 'white',
        drawerActiveTintColor: '#A8BC3A',
        drawerInactiveTintColor: 'white',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{
        drawerIcon: ({color, size}) => <Entypo name="home" size={size} color={color} />
      }} />
      <Drawer.Screen name="Favorite" component={FavoriteScreen} 
        options={{ 
          title: "Favorite Meal",
          drawerIcon: ({color, size}) => <MaterialIcons name="favorite" size={size} color={color} />
         }}
        />
      <Drawer.Screen name="ShoppingBasket" component={ShoppingBasket}
        options={{
          title: "Shopping Basket",
          drawerIcon: ({color, size}) =>  <ShoppingBag size={size} color={color} />
        }}
      />       
      {/* <Drawer.Screen name="Register" options={{ title: "Register Form" }} component={RegisterScreen} initialParams={ user } />   */}
      <Drawer.Screen name="Food Provider Dashboard" component={FoodProviderRoot} 
        options={{
          title: "Food Provider",
          drawerIcon: ({color, size}) =>  <AntDesign name="setting" size={size} color={color} />
        }}
       />
      <Drawer.Screen name="Help" component={HelpScreen}
      options={{
        title: "Help",
        drawerIcon: ({color, size}) =>  <Feather name="help-circle" size={size} color={color} />
      }} />
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
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      //primary: 'rgb(168, 188, 58)',
      background:'white'
    }
  }
 
  return (
    <NavigationContainer theme={MyTheme}>
      {authIsReady && 
        <>
          {user ? (
            <ParentNavigator /> 
          ) : (
            <AuthStack.Navigator initialRouteName='Login'>
              <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />          
            </AuthStack.Navigator>
          )}
        </>
      }
    </NavigationContainer>
  )
}