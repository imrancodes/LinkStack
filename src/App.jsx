import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import Login from './components/authentication/Login'
import HomePage from './components/HomeLayout/HomePage'

const App = () => {

  const auth = getAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])
  
  if (user === null) {
    return (
      <Login/>
    )
  } else {
    return(
      <HomePage/>
    )
  }
}

export default App