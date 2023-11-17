import { SafeAreaView,ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MealInputGroup from '../../components/FoodProvider/mealInputGroup'
import { createMeal } from '../../api/mealApi'


export default function MealForm() {
	const navigation = useNavigation()
	//FOR THE Form SUBMIT BUTTON:
  const handleFormSubmit = async (formData) => {
    await createMeal(formData)
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <MealInputGroup onSubmit={ handleFormSubmit } />
      </ScrollView>    
    </SafeAreaView>
  )
}