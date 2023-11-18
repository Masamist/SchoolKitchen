import { useState } from 'react'
import sanityClient, { fpClient } from '../sanity'
import uuid from 'react-native-uuid'
import * as FileSystem from 'expo-file-system'
import base64 from 'base-64'
import { blobToBase64String } from 'blob-util'

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

// const handleImageSelection = async (selectedImageUri) => {
//   const base64String = await readImageAsBase64(selectedImageUri);
//   if (base64String) {
//     // Do something with the base64 string, e.g., upload to a server
//     console.log('Base64 String:', base64String);
//   }
// }

// const convertImageToBase64 = async (uri) => {
//   try {
//     const base64 = await FileSystem.readAsStringAsync(uri, {
//       encoding: FileSystem.EncodingType.Base64,
//     })
//     return base64
//   } catch (error) {
//     console.error('Error reading image as base64:', error);
//     return null;
//   }
// }

// const uploadMealImage = async(uri) => {
//   try{

//     const base64 = await convertImageToBase64(uri)
//         // Now you can use the base64 string for your Sanity upload
//         //console.log('Base64 String:', base64)
//     await fpClient.assets
//     .upload('image', base64)
//     .then(imageAsset => {    
//       console.log("Passed imageAsset_id? :", imageAsset._id)
//       setImgUploadId(imageAsset._id)
//     })
//   }catch(error){
//     console.log("Error Uploading image to Sanity: " , error)
//   }
// }

export const createMeal = async(formData) => {
  //console.log(formData.image)
  console.log("Check point")
  try{

      // Use the FileSystem module to read the image file
      //const fileInfo = await FileSystem.getInfoAsync(formData.image)
      const fileData = await FileSystem.readAsStringAsync(formData.image, {
        encoding: FileSystem.EncodingType.Base64,
        //encoding: 'base64'
      })/////////////////////////////////////////////////////////////////////
      const base64String = base64.encode(fileData)

      //var base64Encoded = blobToBase64String(fileData)
 
      const response = await fpClient
        .assets.upload('image', { source: base64String })
        .then((asset) => {
      console.log("asset uploaded", asset._id)
      
      return fpClient.create({
        _id: uuid.v4(),
        _type: "meal",
        name: formData.title,
        price: +formData.price,
        description: formData.description,
        allergis: formData.allergies ? formData.allergies.split("\n") : undefined,
        mealImage: {
          _type: "image",
          asset: {
            _type: 'reference',
            _ref: asset._id ? asset._id : undefined
          }
        }  ,
        // mealImage: formData.image || undefined,
        category: formData.category ? {
          _type: "reference",
          _ref: formData.category
        } : undefined,
      })
    })
    console.log('Document created:', response);
      ///////////////////////////////////////////////////////////////////////////////
      //otherwise send the todo to our api
      // await fpClient.assets
      //   //.upload('mealimage', createReadStream(filePath), {
      //     .upload('mealimage', filePath, {
      //     filename: RNFetchBlob.fs.stat(filePath)
      //   })
      //   .then(stat => {
      //     setAssetId(stat._id)
      //     console.log("Set state asset id: ", assetId)// await fpClient.assets
    //   await fpClient.assets
    //   .upload('image', formData.image, {
    //   filename: formData.image.split('/').pop()
    // })

    //Did not work
      // const fileContent = await FileSystem.readAsStringAsync(formData.image, {
      //   encoding: FileSystem.EncodingType.Base64,
      // })
      // const buffer = Uint8Array.from(atob(fileContent), (c) => c.charCodeAt(0)).buffer
      

      // const imageData = await fetch(formData.image)
      // const buffer = await imageData.arrayBuffer()
      // const uploadedImage = await fpClient.assets.upload('image', new Uint8Array(buffer), {
      //   filename: 'food-image.png',
      // })

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

      //console.log("mealAPI.js:", formData.category)
    //   fpClient.create(
    //     {
    //       _id: uuid.v4(),
    //       _type: "meal",
    //       name: formData.title,
    //       price: +formData.price,
    //       description: formData.description,
    //       allergis: formData.allergies ? formData.allergies.split("\n") : undefined,
    //       mealImage: imgUploadId ? {
    //         _type: "image",
    //         asset: {
    //           _type: 'reference',
    //           _ref: imgUploadId
    //         }
    //       }  : undefined,
    //       // mealImage: formData.image || undefined,
    //       category: formData.category ? {
    //         _type: "reference",
    //         _ref: formData.category
    //       } : undefined,
    //     })
    // }

    
  } catch(err) {
    console.log("Error creating doc", err)
  }
}