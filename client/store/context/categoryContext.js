import React, { useState } from 'react';
import { createContext } from 'react';

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
