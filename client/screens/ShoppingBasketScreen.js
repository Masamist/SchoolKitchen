import { useState, useMemo, useLayoutEffect } from 'react';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../store/redux/basketSlice';
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

// Components & UI
import Header from '../components/ui/header'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme'
import NoImage from '../components/ui/noImage'

// ServerSide
import { urlFor } from '../sanity'

export default function ShoppingBasket() {
    const [groupedItems, setGroupedItems] = useState([])
    const basketItems = useSelector(selectBasketItems)
    const basketTotal = useSelector(selectBasketTotal)
    const imageSize = 10

    const dispatch = useDispatch()
    const navigation = useNavigation()

    useLayoutEffect(() => {
      navigation.setOptions(Header({ 
        navigation: navigation, 
        title: 'Shopping Bag'
      }))
    }, [navigation])

    useMemo(() => {
        const gItems = basketItems.reduce((group, item)=>{
            if(group[item.id]){
              group[item.id].push(item);
            }else{
              group[item.id] = [item];
            }
            return group;
          },{})
        setGroupedItems(gItems);
        // console.log('items: ',gItems);
       
    }, [basketItems])

  return (
    <View className="flex-1">

    {/* top button */}
    <View className="relative py-4 shadow-sm">
      <TouchableOpacity 
          style={{backgroundColor: themeColors.bgColor(1)}} 
          onPress={navigation.goBack} 
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
      <Icon.ArrowLeft strokeWidth={3} stroke="white" />
      </TouchableOpacity>
      <View>
          <Text className="text-center font-bold text-xl">Your cart</Text>
          <Text className="text-center text-gray-500">Kids Name</Text>
      </View>
    </View>

    {/* dishes */}
    <ScrollView 
    showsVerticalScrollIndicator={false}
     className="bg-white pt-5 pr-7"
     contentContainerStyle={{
      paddingBottom: 50
     }}
      >
        {
          Object.entries(groupedItems).map(([key, items])=>{
            return (
              <View key={key} 
              className="flex-row items-center space-x-3 py-2 bg-white rounded-3xl mb-3 shadow-md">
                <Text style={{color: themeColors.text}} className="font-bold">{items.length} x </Text>
                { items[0]?.mealimage
                ?<Image source={{ uri: urlFor(items[0]?.mealimage).url() }} style={ imageSize } className="h-14 w-14 rounded-full" />
                :<NoImage imageStlye={ imageSize } /> }
                {/* { console.log(items[0]?.mealimage)} */}
                <Text className="flex-1 font-bold text-gray-700">{items[0]?.title}</Text>
                <Text className="font-semibold text-base">${items[0]?.price}</Text>
                <TouchableOpacity 
                  className="p-1 rounded-full" 
                  style={{backgroundColor: themeColors.bgColor(1)}} 
                  onPress={()=> dispatch(removeFromBasket({id: items[0]?.id}))}>
                  <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
   {/* totals */}
    <View style={{backgroundColor: themeColors.bgColor(0.2)}} className=" p-6 px-8 rounded-t-3xl space-y-4">
          <View className="flex-row justify-between">
              <Text className="text-gray-700">Subtotal</Text>
              <Text className="text-gray-700">${basketTotal}</Text>
          </View>
          <View className="flex-row justify-between">
              <Text className="text-gray-700">Tax</Text>
              {/* <Text className="text-gray-700">${deliveryFee}</Text> */}
          </View>
          <View className="flex-row justify-between">
              <Text className="font-extrabold">Order Total</Text>
              <Text className="font-extrabold">${basketTotal}</Text>
          </View>
          <View>
              <TouchableOpacity 
              style={{backgroundColor: themeColors.bgColor(1)}} 
              onPress={()=> navigation.navigate('PreparingOrder')} 
              className="p-3 rounded-full">
                  <Text className="text-white text-center font-bold text-lg">Place Order</Text>
              </TouchableOpacity>
          </View>
     </View>
  </View>
  );
}
