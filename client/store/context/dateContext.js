import { createContext, useState } from 'react'

const DateContext = createContext();
export default DateContext 

// contextProvider
export const DateProvider = ({ children }) => {
  const [date, setDate] = useState("");

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  )
}
