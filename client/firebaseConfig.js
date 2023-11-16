// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
//import { initializeAuth, getAuth,  getReactNativePersistence } from 'firebase/auth'
import { getFirestore, collection } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnVKpNmRgrAohxfA20VcPcbYIkOF-XVo8",
  authDomain: "shopping-app-641ad.firebaseapp.com",
  projectId: "shopping-app-641ad",
  storageBucket: "shopping-app-641ad.appspot.com",
  messagingSenderId: "390261348245",
  appId: "1:390261348245:web:950c3e91a18452dd92889c"
}

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig)

// Initialize Firebase Auth with AsyncStorage persistence
//const FIREBASE_AUTH = getAuth(FIREBASE_APP)
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage),
  })

const FIREBASE_DB = getFirestore(FIREBASE_APP)

const tripRef = collection(FIREBASE_DB, 'trips')

// async function getCities(FIREBASE_DB) {
//   const citiesCol = collection(FIREBASE_DB, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }


export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, tripRef }

// // timestamp
// export const timestamp = firebase.firestore.Timestamp