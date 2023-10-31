import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MealListScreen from './screens/MealListScreen'
import MealScreen from './screens/MealScreen'
import ShoppingBag from './screens/ShoppingBag';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MealList" component={MealListScreen} />
            <Stack.Screen name="Meal" options={{ presentation: 'modal', headerShown: false }} component={MealScreen} />
            <Stack.Screen name="ShoppingBag" options={{ presentation: 'modal', headerShown: false }}  component={ShoppingBag} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}