import sanityClient from '../sanity';
import { writeClient } from '../sanity';
import uuid from 'react-native-uuid';
let sanityQuery = (query, params)=> sanityClient.fetch(query, params);

export const getAllMeals = ()=>{
  return sanityQuery(`
    *[_type == 'meal']
  `);
}

// export const getNewMeals = ()=>{
//     return sanityQuery(`
//         *[_type == 'meal'] | order(_createdAt desc){
//             ...,
//         }[0...6]
        
//     `);
//   }

export const getCategories = ()=>{
  return sanityQuery(`
    *[_type == 'category']
  `);
}

export const createMeal = async(formData) => {
  try{
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
          _type: "reference",
          _ref: formData.category
        } : undefined,
      }
      console.log("mealAPI.js category", formData.category)
      await writeClient.create(data)
    }
  } catch(err) {
    console.log("Error creating doc", err)
  }
  
}

// export const createMeal = async(formData) => {
//   try{
//     if (formData.length == 0) {
//       setErrMessage("Todo text and due date must be filled out.");
//     } else {
//       //otherwise send the todo to our api
//       // (we'll make this next!)
//       const data = {
//         _id: uuid.v4(),
//         _type: "meal",
//         name: formData.title,
//         price: +formData.price,
//         description: formData.description,
//         allergis: formData.allergies ? formData.allergies.split("\n") : undefined,
//         mealImage: formData.image || undefined,
//         category: formData.category ? {
//           _type: "reference",
//           name: "ID",
//           to: [formData.category],
//         } : undefined,
//       }
//       console.log("mealAPI.js category", formData.category)
//       await writeClient.create(data)
//     }
//   } catch(err) {
//     console.log("Error creating doc", err)
//   }
  
// }
