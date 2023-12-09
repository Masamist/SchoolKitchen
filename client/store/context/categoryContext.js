import { createContext, useState } from 'react'

const CategoryContext = createContext();
export default CategoryContext 

// contextProvider
export const CategoryProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}
