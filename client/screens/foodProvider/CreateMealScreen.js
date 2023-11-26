import { useState } from 'react'
import { SafeAreaView,ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MealInputGroup from '../../components/FoodProvider/mealInputGroup'
import { createMeal } from '../../api/mealApi'


export default function CreateMealScreen() {
	const navigation = useNavigation()
  const [mealData, setMealData] = useState({
    title:"",
    price: "",
    description: "",
    allergies: "",
    limit: "",
    mealimage: "",
  })
	//FOR THE Form SUBMIT BUTTON:
  const handleFormSubmit = async (formData) => {
    await createMeal(formData)
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