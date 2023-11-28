import { useState } from 'react'
import sanityClient, { fpClient } from '../sanity'
import uuid from 'react-native-uuid'
import * as FileSystem from 'expo-file-system'
import base64 from 'base-64'
import { base64StringToBlob } from 'blob-util'
//import { getExtension, getImageDimensions } from '@sanity/asset-utils'
//import { ReactNativeBlobUtil } from 'react-native-blob-util'

//import { RNFetchBlob } from 'react-native-fetch-blob' // Cannot use for expo projects
//import {createReadStream} from 'react-native-fs'
//import { DocumentDirectoryPath, writeFile } from 'react-native-fs'
//import { fileURLToPath } from 'url'

let sanityQuery = (query, params)=> sanityClient.fetch(query, params);

export const getAllMeals = ()=>{
  return sanityQuery(`
    *[_type == 'meal']
  `);
}



export const getNewMeals = ()=>{
    return sanityQuery(`
        *[_type == 'meal'] | order(_createdAt){
            ...,
        }[0...6]      
    `);
  }

export const getCategories = ()=>{
  return sanityQuery(`
    *[_type == 'category']
  `);
}

// const readImageAsBase64 = async (imageUri) => {
//   try {
//     const base64String = await FileSystem.readAsStringAsync(imageUri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });
//     return base64String;
//   } catch (error) {
//     console.error('Error reading image as base64:', error);
//     return null;
//   }
// }


export const createMeal = async(formData) => {
  //console.log(formData.image)
  console.log("Check point 1: create new doc")
  try{
      const response = await fpClient.create({
        _id: uuid.v4(),
        _type: "meal",
        name: formData.title,
        price: +formData.price,
        description: formData.description,
        allergis: formData.allergies ? formData.allergies.split("\n") : undefined,
        limit: +formData.limit,
        // mealImage: {
        //   _type: "image"
        //   // asset: {
        //   //   _type: 'reference',
        //   //   _ref: null
        //   // }
        // },
        mealImage: undefined,
        //mealImage: formData.image || undefined,
        category: formData.category ? {
          _type: "reference",
          _ref: formData.category
        } : undefined,
      })  
    console.log('Document created:', response);
    



    if(formData.image){
      console.log("check point 2: upload image file")
      
      // Validation
      // const filetype = getExtension(formData.image)
      // if (filetype !== 'jpg' && filetype !== 'png') {
      //   return 'Image must be a JPG or PNG'

      //////////////////////////////////////////////////////////////////////////
      ////////////////////come back here hor image asset upload/////////////////
        // console.log("Filedata",fileData)
        // console.log("fileName",fileName)
      //const blob = base64StringToBlob(fileData, 'image')
      // //const fileData = await ReactNativeBlobUtil.fs.readStream(
      //   formData.image,
      //   'base64',
      //   4095).then((ifstream) => {
      //     ifsteram
      //   })
      // await fpClient.assets
      // .upload('image', fileData, {
      //   filename: "fileName"
      // })

           //Use the FileSystem module to read the image file
      const fileName = formData.image.split('/').pop()
      let base64 = null
      let options = { encoding: FileSystem.EncodingType.Base64 }
      await FileSystem.readAsStringAsync(formData.image, options).then(data => {
          base64 = 'data:image/jpg;base64' + data;
          //resolve(base64); // are you sure you want to resolve the data and not the base64 string?
        }).catch(err => {
          console.log("​getFile -> err", err);
          reject(err) ;
        })

      // const fileData = await FileSystem.readAsStringAsync(formData.image, {
      //   encoding: FileSystem.EncodingType.Base64,
      // }) 

      await fpClient.assets
      .upload('image', base64, {
        filename: "fileName"
      })
      .then(imageAsset => {    
        console.log("Passed imageAsset_id? :", imageAsset._id)
        return fpClient
        .patch(response._id)
        .set({
          mealImage: {
            _type: 'image',
            asset: {
              _type: "reference",
              _ref: imageAsset._id
            }
          }
        })
      .commit()
      })
    }
  } catch(err) {
    console.log("Error creating doc", err)
  }

  

    //Did not work
      // const fileContent = await FileSystem.readAsStringAsync(formData.image, {
      //   encoding: FileSystem.EncodingType.Base64,
      // })
      // const buffer = Uint8Array.from(atob(fileContent), (c) => c.charCodeAt(0)).buffer
      

      //if(!formData.image){
        // const base64 = await convertImageToBase64(formData.image)
        // // Now you can use the base64 string for your Sanity upload
        // //console.log('Base64 String:', base64)

        // await fpClient.assets
        // .upload('image', base64)
        // .then(imageAsset => {    
        //   console.log("Passed imageAsset_id? :", imageAsset._id)    
        

        // 'https://njdbmchi.api.sanity.io/v2023-10-30/assets/images/'
        //https://cdn.sanity.io/images/njdbmchi/production/abc123_0G0Pkg3JLakKCLrF1podAdE9-538x538.jpg

        // .create(
        //   {
        //     _id: uuid.v4(),
        //     _type: "meal",
        //     name: formData.title,
        //     price: +formData.price,
        //     description: formData.description,
        //     allergis: formData.allergies ? formData.allergies.split("\n") : undefined,
        //     mealImage: imageAsset._id ? {
        //       _type: "image",
        //       asset: {
        //         _type: 'reference',
        //         _ref: imageAsset._id
        //       }
        //     }  : undefined,
        //     // mealImage: formData.image || undefined,
        //     category: formData.category ? {
        //       _type: "reference",
        //       _ref: formData.category
        //     } : undefined,
        //   })
      //}

      // // This is important!!!!!!!!!!!!!!!!!
      // // If didn't add image then goes here
      // await fpClient.create(
      //   {
      //     _id: uuid.v4(),
      //     _type: "meal",
      //     name: formData.title,
      //     price: +formData.price,
      //     description: formData.description,
      //     allergis: formData.allergies ? formData.allergies.split("\n") : undefined,
      //     mealImage: undefined,
      //     // mealImage: formData.image || undefined,
      //     category: formData.category ? {
      //       _type: "reference",
      //       _ref: formData.category
      //     } : undefined,
      //   }
      // )
}

export const updateMeal = async(formData) => {
  //console.log(formData.image)
  console.log("Check point 1: update doc")
  try{
      const response = await fpClient.patch(formData.id)
        .set({
        _type: "meal",
        name: formData.title,
        price: +formData.price,
        description: formData.description,
        allergis: formData.allergies ? formData.allergies.split("\n") : undefined,
        limit: +formData.limit,
        // mealImage: {
        //   _type: "image"
        //   // asset: {
        //   //   _type: 'reference',
        //   //   _ref: null
        //   // }
        // },
        mealImage: undefined,
        //mealImage: formData.image || undefined,
        category: formData.category ? {
          _type: "reference",
          _ref: formData.category
        } : undefined,
      })
      .commit() 
    console.log('Document updated:', response);
    



    // if(formData.image){
    //   console.log("check point 2: upload image file")

    //        //Use the FileSystem module to read the image file
    //   const fileName = formData.image.split('/').pop()
    //   let base64 = null
    //   let options = { encoding: FileSystem.EncodingType.Base64 }
    //   await FileSystem.readAsStringAsync(formData.image, options).then(data => {
    //       base64 = 'data:image/jpg;base64' + data;
    //       //resolve(base64); // are you sure you want to resolve the data and not the base64 string?
    //     }).catch(err => {
    //       console.log("​getFile -> err", err);
    //       reject(err) ;
    //     })

    //   await fpClient.assets
    //   .upload('image', base64, {
    //     filename: "fileName"
    //   })
    //   .then(imageAsset => {    
    //     console.log("Passed imageAsset_id? :", imageAsset._id)
    //     return fpClient
    //     .patch(response._id)
    //     .set({
    //       mealImage: {
    //         _type: 'image',
    //         asset: {
    //           _type: "reference",
    //           _ref: imageAsset._id
    //         }
    //       }
    //     })
    //   .commit()
    //   })
    // }
  } catch(err) {
    console.log("Error creating doc", err)
  }

}
export const deleteMeal = async(dataId) => {
  await fpClient
  .delete(dataId)
  .then(() => {
    return console.log('Meal deleted')
  })
  .catch((err) => {
    console.error('Delete failed: ', err.message)
  })
}
