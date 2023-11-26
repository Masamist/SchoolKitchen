import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

// Auth
import { useAuthContext } from './useAuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../firebaseConfig/'
import authenticateSanity from '../authenticateSanity'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const auth = FIREBASE_AUTH

  const navigation = useNavigation()

  const signup = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const response = await createUserWithEmailAndPassword(auth, email, password)

      if (!response) {
        throw new Error('Could not complete signup')
      }

      const user = response.user;
      const token = await user.getIdToken()
      authenticateSanity(token)

      // upload user thumbnail
      // const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      // const img = await projectStorage.ref(uploadPath).put(thumbnail)
      // const imgUrl = await img.ref.getDownloadURL()

      // add display AND PHOTO_URL name to user
      //await res.user.updateProfile({ displayName, photoURL: imgUrl })

      // create a user document
      // await FIREBASE_DB.collection('users').doc(res.user.uid).set({ 
      //   //online: true,
      //   //displayName,

      //   userRole: role,
      // })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })
      navigation.navigate("Register")

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

  return { signup, error, isPending }
}