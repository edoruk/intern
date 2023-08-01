// AppContext.js
import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export const useAppContext = () => {
  return useContext(AppContext)
}

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState("")
  const [internId, setInternId] = useState("")
  const [internInfo, setInternInfo] = useState()
  const [isAuth, setIsAuth] = useState(false)
  const [interns, setInterns] = useState([])

  const contextValue = {
    token,
    setToken,
    internId,
    setInternId,
    internInfo,
    setInternInfo,
    isAuth,
    setIsAuth,
    interns,
    setInterns,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
