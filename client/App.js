import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation'
import { AuthContextProvider } from './context/authContext'
import { store } from './store'
import { Provider } from 'react-redux'
// import {decode, encode} from 'base-64'

export default function App() {
  // This for upload images as assets to sanity
  // if (!global.btoa) { global.btoa = encode }
  // if (!global.atob) { global.atob = decode }
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <StatusBar />
        <Navigation />
      </Provider>
    </AuthContextProvider>
  );
}
