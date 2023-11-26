import { useState, useEffect } from 'react'

// Auth
import { useAuthContext } from './useAuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../firebaseConfig/'
import authenticateSanity from '../authenticateSanity'


export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const auth = FIREBASE_AUTH

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      const response = await signInWithEmailAndPassword(auth, email, password)

      // update online status
      //await FIREBASE_DB.collection('users').doc(res.user.uid).update({ online: true })
      const user = response.user;
      const token = await user.getIdToken()
      authenticateSanity(token)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })

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