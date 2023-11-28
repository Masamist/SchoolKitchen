import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getCategories } from '../../api/mealApi'
import Modal from "react-native-modal"
import { deleteMeal } from '../../api/mealApi'

// Components & UI
import Input from '../ui/input'
import FpMealImagePicker from './fpMealImagePicker'

// Dropdown
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Feather } from '@expo/vector-icons'

// ServerSide
import { urlFor } from '../../sanity'

export default function mealInputGroup({ mealData, onSubmit }) {

  const navigation = useNavigation()
    // For Category Dropdown componet
  const [value, setValue] =useState(null)
  const [categories, setCategories] = useState([])
  //console.log("SetCatValue: ", value)
  
  const [inputValue, setInputValue] = useState({})

  useEffect(() => {
    setInputValue({
      id: mealData.id?mealData.id:null,
      title: mealData.title? mealData.title : "",
      price: mealData.price? mealData.price.toString() : "",
      description: mealData.description? mealData.description : "",
      allergies: mealData.allergies? mealData.allergies : "",
      limit: mealData.limit? mealData.limit : "",
      image: mealData.image? mealData.image : null,
      category: mealData.category? mealData.category : null
    })
  }, [])
  

  // For image
  const [imageValue, setImageValue] = useState({})

  // For category
  const [catChecked, setCatChecked] = useState(false)

  const imageSize = { width: 100, height: 100 }

  useEffect(() => {
    setInputValue((curInputValues) => {
      //console.log('SET',imageValue)
      return {
        ...curInputValues,
          image : imageValue
      }
    })
  }, [imageValue])

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
    })
  }, [])

  const inputChangeHandler = (inputIdentifier, enteredValue) =>{
    setInputValue((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier] : enteredValue
      }
    })
  }
  //console.log("Changed?", inputValue.category)

  const handleSubmit = () => {
    onSubmit(inputValue)
  }

  const handleDelete = () => {
    deleteMeal(inputValue.id)
    navigation.navigate('MenuList')
  }

  const handleImageValue = (valueFromChild) => {
    setImageValue(valueFromChild)
  }

  
  const data = categories.map((cat) => {
    return {        
      label: cat.name,
      value: cat._id,
    }
  })

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="checkcircleo"
            size={20}
          />
        )}
      </View>
    )
  }

  // Delete Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View className="py-5">
      <Input label="Meal Name" textInputConfig={{
        autoCapitalize: 'words',
        onChangeText: inputChangeHandler.bind(this, 'title'),
        value: inputValue.title,
      }} />
      {/* <TextInput keyboardType='decimal-pad' onChangeText='inputChangeHandler' placeholder='DD-MM-yyyy' /> */}
      <Input label="Price" textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: inputChangeHandler.bind(this, 'price'),
        value: inputValue.price
      }} />
      <Input label="Description" textInputConfig={{
        multiline: true,
        // autoCorrect: false, default is true
        onChangeText: inputChangeHandler.bind(this, 'description'),
        value: inputValue.description,
      }} />
      <Input label="Allergies" textInputConfig={{
        multiline: true,
        onChangeText: inputChangeHandler.bind(this, 'allergies'),
        value: inputValue.allergies,
      }} />
      <Input label="Order Limit" textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: inputChangeHandler.bind(this, 'limit'),
      }} />

      <View className="mx-5 my-2">
        <Text className="text-amber-950 pb-1">Meal Image</Text>
        {
          mealData.mealimage &&
          <Image 
            style={ imageSize } 
            className="rounded-l" 
            source={{ uri: urlFor(mealData.mealimage).url()}} />
        }
        <FpMealImagePicker onImageValueChange={handleImageValue} />
        {/* <Input label="Meal Image" textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, 'image'),
          value: inputValue.image,
        }} /> */}
      </View>
      
      <View className="mx-5 my-2">
        <Text className="text-amber-950 pb-1">Category</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select a Category"
          searchPlaceholder="Search..."
          value={value}
          // value={value}
          
          onChange={item => {
            setValue(item.value)
            setCatChecked(true)
            //console.log("Set", item.value)
          }}
          ///////////////////////////////////////////////////////////////Bug In here? Does not update value state
          onChangeText={
            inputChangeHandler.bind(this,'category', value)
          }
          renderLeftIcon={() => (
             !catChecked ?
              <AntDesign name="exclamationcircleo" style={styles.icon}  size={20} color="#777777" />
              : <AntDesign style={styles.icon} name="checkcircle" size={20} color="#A8BC3A" />
            //<AntDesign style={styles.icon} color=""name="Safety" size={20} />
          )}
          renderItem={renderItem}
        />
      </View>

      {
        mealData.id? 
          <View className="flex-row justify-center">
            <Pressable onPress={toggleModal} className="mx-2 mt-7">
              <View className="rounded-full justify-center" 
                style={{ backgroundColor: "#b83e35", width: 180, height: 50}}>
                <Text className="text-center text-xl pb-1 text-white">Delete</Text>
              </View>
            </Pressable>
            <Pressable onPress={handleSubmit} className="mx-2 mt-7">
              <View 
                className="w-40 h-11 rounded-full justify-center" 
                style={{ backgroundColor: "#A8BC3A", width: 180, height: 50}}>
                <Text className="text-center text-xl pb-1 text-white">Save</Text>
              </View>
            </Pressable>
          </View>
          
          : <Pressable onPress={handleSubmit} className="flex-row justify-center mx-5 mt-7">
              <View className="w-40 h-11 rounded-full justify-center" style={{ backgroundColor: "#A8BC3A"}}>
                <Text className="text-center text-xl pb-1 text-white">Save</Text>
              </View>
            </Pressable>
          }      
      <Pressable 
        onPress={() => navigation.navigate('MenuList')} 
        className="flex-row justify-center mx-5 mt-7">
          <Text className="text-center text-lg pb-1 text-gray-700">
            Go Back to Meal List
          </Text>
      </Pressable>

      <Modal isVisible={isModalVisible}>
        <View style={{ height: 300 }}
          className="bg-white rounded-xl justify-center">
          <View className="m-10 items-center">
            <AntDesign name="closecircleo" size={50} color="#b83e35" />
            <Text className="mt-3 text-2xl text-center text-gray-700">Are you sure?</Text>
            <Text className="pt-5 text-sm text-center text-gray-700">Do you really want to delete this meal from menu? This process cannot be undone.</Text>
            <View className="flex-row gap-5 pt-5">
              <Pressable onPress={toggleModal} style={{ width:130 }} className="p-2 bg-gray-500 rounded-full">
                <Text className="text-lg text-white text-center">Cancel</Text>
              </Pressable>
              <Pressable onPress={handleDelete} style={{ width:130, backgroundColor: "#b83e35"}} className="p-3 bg-gray-500 rounded-full">
                <Text className="text-lg text-white text-center">Delete</Text>
              </Pressable>
            </View>
              
          </View>
          
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 0,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: .5,
    borderColor: "#777777",
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
})