import { createContext, useContext } from 'react'

const MenuContext = createContext(undefined)

export const MenuProvider = ({ children, value }) => (
  <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
)

export const useMenuContext = () => useContext(MenuContext)
