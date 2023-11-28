import { ScrollView, View } from 'react-native'

// Components
import Header from '../components/ui/header';
import Categories from '../components/ui/categories'
import MealCol from '../components/mealCol'
import BasketIcon from '../components/ui/basketIcon'

// // ServerSide
// import { getAllMeals } from '../api'

export default function MealList({selectedMeals}) {
  
  return (
  <ScrollView>
    <View className="pl-3">
      <Header />
      <BasketIcon />
    
      {/* <BagIcon /> */}
      <Categories />

      <View className="pt-7">
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
    </View>
  </ScrollView>
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
