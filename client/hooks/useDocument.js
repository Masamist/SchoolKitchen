// import { useEffect, useState } from "react"
// import { FIREBASE_DB } from "../firebaseConfig"

// export const useDocument = (collection, id) => {
//   const [document, setDocument] = useState(null)
//   const [error, setError] = useState(null)

//   // realtime document data
//   useEffect(() => {
//     const ref = FIREBASE_DB.collection(collection).doc(id)

//     const unsubscribe = ref.onSnapshot(snapshot => {
//       // need to make sure the doc exists & has data
//       if(snapshot.data()) {
//         setDocument({...snapshot.data(), id: snapshot.id})
//         setError(null)
//       }
//       else {
//         setError('No such document exists')
//       }
//     }, err => {
//       console.log(err.message)
//       setError('failed to get document')
//     })

//     // unsubscribe on unmount
//     return () => unsubscribe()

//   }, [collection, id])

//   return { document, error }
// }