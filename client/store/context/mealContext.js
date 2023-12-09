import { createContext, useState, useContext, useEffect } from 'react'
// ServerSide
import { getNewMeals, getAllMeals } from '../../api/mealApi'

const MealsContext = createContext();

// contextProvider
export const MealsContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([])

  const fetchMealsData = async () => {
    try {
      await getAllMeals()
        .then(data => {
          setMeals(data)
        })
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  }

  useEffect(() => {
    try{
      fetchMealsData()
    }catch(err){
      console.log(err)
    }
  }, [])

  return (
    <MealsContext.Provider value={{meals}}>
      {children}
    </MealsContext.Provider>
  )
}

export const useMeals = () => {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealsProvider')
  }
  return context;
}
