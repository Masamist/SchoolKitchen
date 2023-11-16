import { View, Text, TouchableOpacity, Button, Picker, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Input from './input'
import { getCategories } from '../../api/mealApi'


// Dropdown
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function mealInputGroup({ onSubmit }) {
  const [inputValue, setInputValue] = useState({
    title:'',
    price:'',
    description:'',
    allergies:'',
    limit:'',
    image:'',
    category:''
  })

  const [categories, setCategories] = useState([])

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

  const handleSubmit = () => {
    onSubmit(inputValue)
  }

  
  const data = categories.map((cat) => {
    return {
      label: cat.name,
      value: cat._id
    }
  })

  // For category dropdown
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    )
  }

  return (
    <View>
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
        onChangeText: inputChangeHandler.bind(this, 'limit'),
      }} />
      <Input label="Meal Image" textInputConfig={{
        onChangeText: inputChangeHandler.bind(this, 'image'),
        value: inputValue.image,
      }} />
      {/* <Input label="Category" textInputConfig={{
        onChangeText: inputChangeHandler.bind(this, 'category'),
        value: inputValue.category,
      }} /> */}
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
        onChange={item => {
          //setValue(item.value);
          inputChangeHandler.bind(item.value, item.label)
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
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
    marginRight: 5,
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
  },
});