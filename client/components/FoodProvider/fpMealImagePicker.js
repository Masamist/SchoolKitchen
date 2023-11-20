import React, { useState } from 'react'
import { Button, Image, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'


export default function FpMealImagePicker({onImageValueChange}) {
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 320, height: 200 }} />}
    </View>
  )
}