import { useState } from 'react'
import { SafeAreaView,ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import MealInputGroup from '../../components/FoodProvider/mealInputGroup'
import { updateMeal } from '../../api/mealApi'
    
export default function UpdateMealScreen() {
  
  const { params: {
    id,
    title,
    price,
    description,
    allergies,
    limit,
    mealimage,
    category
    }} = useRoute()

	const navigation = useNavigation()
  const [mealData, setMealData] = useState({
    id: id,
    title: title,
    price: price,
    description: description,
    allergies: allergies,
    limit: limit,
    mealimage: mealimage,
    category: category
  })
	//Form Submit Button:
  const handleFormSubmit = async (formData) => {
    await updateMeal(formData)
    navigation.goBack()
  }



  return (
    <SafeAreaView>
      <ScrollView>
        <MealInputGroup mealData={mealData} onSubmit={ handleFormSubmit } />
      </ScrollView>    
    </SafeAreaView>
  )
}