import { initializeApp } from "firebase/app"
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FIRE_BASE_API_KEY, 
  FIRE_BASE_AUTH_DONAIN, 
  FIRE_BASE_PROJECT_ID, 
  FIRE_BASE_STORAG_EBUCKET, 
  FIRE_BASE_MESSAGING_SENDER_ID, 
  FIRE_BASE_API_ID } from "@env"
//import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIRE_BASE_API_KEY,
  authDomain: FIRE_BASE_AUTH_DONAIN,
  projectId: FIRE_BASE_PROJECT_ID,
  storageBucket: FIRE_BASE_STORAG_EBUCKET,
  messagingSenderId: FIRE_BASE_MESSAGING_SENDER_ID,
  appId: FIRE_BASE_API_ID
}

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig)

// Initialize Firebase Auth with AsyncStorage persistence
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
})


// timestamp
//const timestamp = firebase.firestore.Timestamp

export { FIREBASE_APP, FIREBASE_AUTH }

// const FIREBASE_DB = getFirestore(FIREBASE_APP)
// export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, timestamp }

//export { projectFirestore, projectAuth, projectStorage, timestamp }