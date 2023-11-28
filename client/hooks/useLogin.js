import { useState, useEffect } from 'react'

// Auth
import { useAuthContext } from './useAuthContext'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_APP, FIREBASE_AUTH } from '../firebaseConfig/'
import authenticateSanity from '../authenticateSanity'


export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const auth = getAuth()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      const response = await signInWithEmailAndPassword(auth, email, password)
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })

      
      // update online status
      //await FIREBASE_DB.collection('users').doc(res.user.uid).update({ online: true })

      // Error//////////////////////////////////////////////////////////
      // const user = response.user;
      // console.log("Check token:" + user)
      // const token = await user.getIdToken()
      // authenticateSanity(token)
      //////////////////////////////////////////////////////////////////

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}