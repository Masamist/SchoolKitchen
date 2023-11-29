import { View, FlatList } from 'react-native'

// Components
import MealCol from '../components/mealCol'


function renderMealColumn(itemData){
  return <MealCol title={itemData.item.title} />
}

export default function MealList({selectedMeals}) {
  
  return (
      <View className="pt-7">
        {/* <FlatList data={selectedMeals} keyExtractor={(item) => item.id} renderItem={renderMealColumn} /> */}
        {
          selectedMeals?.map(meal=>{
            return (
              <>
                <MealCol 
                  key={meal._id}
                  id={meal._id}
                  title={meal.name}
                  price={meal.price}
                  description={meal.description}
                  allergis={meal.allergis}
                  limit={meal.limit}
                  mealimage={meal.mealimage}
                  category={meal.category}
                />
                <View>
                  <Separator />
                </View>
              </>             
            )
          })
        }
      </View>
  )
}

const seperatorStyles = {
  height: 2,
  width: '100%',
  backgroundColor: '#A8BC3A',
  marginTop: 30,
  marginBottom: 50,
}

const Separator = () => <View style={seperatorStyles} />
