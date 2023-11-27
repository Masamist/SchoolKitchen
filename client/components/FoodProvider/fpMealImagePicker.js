import React, { useState } from 'react'
import { Pressable, Image, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { AntDesign } from '@expo/vector-icons'


export default function FpMealImagePicker({onImageValueChange}) {
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      //aspect: [4, 3],
      quality: 1,
    })

    //console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      onImageValueChange(result.assets[0].uri)
    } else {
      console.log('Image picking cancelled')
    }
  }

  return (
    <View>
      <Pressable onPress={pickImage}>
       <AntDesign 
        name="plussquare" 
        size={45} 
        color="#F2C94C"
      />
      </Pressable>
      {image && <Image source={{ uri: image }} style={{ width: 320, height: 200 }} />}
    </View>
  )
}