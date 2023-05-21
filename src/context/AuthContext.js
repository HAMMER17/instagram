import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { app } from '../firebase/fifebase'

export const AuthContext = createContext()
const auth = getAuth(app)
export const AuthContextProvider = ({ children }) => {

  const [userName, setUserName] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserName(user)
      console.log(user)
    });
    return () => {
      unsub();
    }
  }, [])
  return (
    <AuthContext.Provider value={{ userName }}>
      {children}
    </AuthContext.Provider>
  )
}

