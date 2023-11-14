import { createContext } from 'react'

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {}
})

function FavoritesContextProvider({children}) {
  const[favoriteMeals, setFavoriteMeals] = useState([])

  function addFavorite(id) {
    setFavoriteMealIds((currentFavIds)=> currentFavIds.filter(mealId => mealId !== id))
  }
  
  function removeFavorite(id) {
    setFavoriteMealIds((currentFavIds)=> [...currentFavIds, id])
  }

  const value = {
    ids: setFavoriteMealIds,
    addFavorite:addFavorite,
    removeFavorite: removeFavorite
  }
  

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesContextProvider
