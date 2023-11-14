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

      // await fetchTodos(); //(we'll add this later)
      // Clear all inputs after the todo is sent to Sanity
      // setUserInput("");
      // setErrMessage("");
      // setDueDate("");
    }
  }

  // const handleFormSubmit = async(formData) => {

  //   try{
  //     const response = await client
  //       .create({
  //         _type: "meal",
  //         title: formData.title,
  //         price: formData.price,
  //         discription: formData.discription,
  //         allergies: formData.allergies,
  //         image: formData.image,
  //         category: {
  //           _type: "category",
  //           _ref: formData.category,
  //         }          
  //       })
  //       .then((res) => {
  //         // console.log(`Meal wasa created, document ID is ${res._id}`)
  //         console.log(`Meal wasa created`)
  //       })
  //     .commit()
  //     console.log('Document updated:', response)
  //   } catch(error){
  //   console.log('Error updating document:', error)
  //   }
  // }
  return (
    <SafeAreaView>
      <ScrollView>
        <MealInputGroup onSubmit={ handleFormSubmit } />
      </ScrollView>    
    </SafeAreaView>
  )
}