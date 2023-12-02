import { createContext, useState, useContext } from 'react'

const CategoryContext = createContext();

export default CategoryContext 

// contextProvider
export const CategoryProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const selectCategory = (catId) => {
    setActiveCategory(catId);
  }

  return (
    <CategoryContext.Provider value={{ activeCategory, selectCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategotyIds = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a MealsProvider')
  }
  return context;
}

