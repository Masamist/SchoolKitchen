import { View, Text, TouchableOpacity } from 'react-native'

// UI
import { Minus, Plus } from "react-native-feather"
import { useTheme } from 'react-native-paper'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItemsById } from '../../../store/redux/basketSlice'

export default function ItemAddSubBtns({id, title, price, mealimage}) {
  const dispatch = useDispatch()
  const theme = useTheme()

  const basketItems = useSelector(state=> selectBasketItemsById(state, id));
  //const [bagItems, setBagItems] = useState([])
  const handleIncrease = ()=>{
    dispatch(addToBasket({id, title, price, mealimage}));
    //setBagItems({id, title, price, mealimage, quantity})
  }
  const handleDecrease = ()=>{
    dispatch(removeFromBasket({id}))
  }

  return (
    <View className="flex-row justify-end" style={{ width: '100%'}}>
      <TouchableOpacity 
        onPress={handleDecrease} 
        disabled={!basketItems.length} 
        className="p-1 rounded-full" 
        style={{ backgroundColor: theme.colors.secondary}}
        //style={{backgroundColor: themeColors.bgColor(1)}}
        >
        <Minus strokeWidth={2} height={20} width={20} stroke="white" />
      </TouchableOpacity>
      <Text className="px-3 text-lg">
        {basketItems.length}
      </Text>
      <TouchableOpacity 
        onPress={handleIncrease} 
        className="p-1 rounded-full" 
        style={{backgroundColor:theme.colors.primary}}
        >
        <Plus strokeWidth={2} height={20} width={20} stroke="white" />
      </TouchableOpacity>
    </View>
  )
}