"use client"
import React from 'react'
import { createContext, useContext, useState } from 'react'
const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)
const Context = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        
            <GlobalContext.Provider value={{ showSidebar, setShowSidebar }} >
                {children}
            </GlobalContext.Provider>
        
    )
}

export default Context
