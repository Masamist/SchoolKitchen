import { View, Text } from 'react-native'
import { useState, useCallback, useEffect } from 'react'
import { SafeAreaProvider } from "react-native-safe-area-context"
// UI
import SelectDayBtn from './ui/buttons/selectDayBtn'
import { DatePickerModal } from 'react-native-paper-dates'
import DateSelected from './ui/DateSelected'

export default function SelectDaysBtnRow() {
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false)
  const [reset, setReset] = useState(false)

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  )

  useEffect(() => {
    try{
      setDate(false)
      setReset(false)
    } catch(err) {
      console.log(err)
    }
  }, [reset])

  return (
    <SafeAreaProvider>
      {!date
        ? <View className="pt-1 pb-9 px-3">
        <Text className="text-lg text-amber-950 pl-1">Select when the order is required...</Text>
        <View className="flex-row justify-between pt-2">
          <SelectDayBtn 
            link={require('../assets/images/singleDayIcon.png')} 
            title="Single\nDay" 
            color={[{backgroundColor:"#D3DD9C"}]}
            //onPress={null}
            onPress={() =>setOpen(true)}
            />
          <SelectDayBtn 
            link={require('../assets/images/multiDayIcon.png')} 
            title="Multiple\nDays" 
            color={[{backgroundColor:"#F8E4A5"}]}
            onPress={null}/>
          <SelectDayBtn 
            link={require('../assets/images/monthlyIcon.png')} 
            title="Monthly\nOrder" 
            color={[{backgroundColor:"#D5CCC2"}]}
            onPress={null} />
        </View>
      </View>
        : 
        <View className="pt-2 px-3 pb-5">
          <Text className="text-lg text-amber-950">Selected Date</Text>
          <DateSelected date={{date}} onPress={() => setReset(true)} /> 
        </View>
      }
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <DatePickerModal
          locale="en-GB"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </View>
    </SafeAreaProvider>
  )
}