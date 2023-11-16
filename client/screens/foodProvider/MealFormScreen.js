import { SafeAreaView,ScrollView } from 'react-native'
import uuid from 'react-native-uuid';
import React from 'react'
import MealInputGroup from '../../components/FoodProvider/mealInputGroup'
import client from '../../sanity'

export default function MealForm() {
	
	//FOR THE SUBMIT BUTTON:
  const handleFormSubmit = async (formData) => {
    //if either part of the form isn't filled out
    //set an error message and exit
    if (formData.length == 0) {
      setErrMessage("Todo text and due date must be filled out.");
    } else {
      //otherwise send the todo to our api
			// (we'll make this next!)
      const data = {
        _id: uuid.v4(),
        _type: "meal",
        name: formData.title,
        price: +formData.price,
        description: formData.description,
        allergis: formData.allergies ? formData.allergies.split("\n") : undefined,
        mealImage: formData.image || undefined,
        category: formData.category ? {
          _type: "category",
          name: "ID",
          to: [formData.category],
        } : undefined,
      };

      await client.create(data);

    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <MealInputGroup onSubmit={ handleFormSubmit } />
      </ScrollView>    
    </SafeAreaView>
  )
}