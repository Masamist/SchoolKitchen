import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation'
import { AuthContextProvider } from './store/context/authContext'
import { MealsContextProvider } from './store/context/mealContext'
import { CategoryProvider } from './store/context/categoryContext'
import { store } from './store/redux/store'
import { Provider } from 'react-redux'
// import {decode, encode} from 'base-64'

export default function App() {
  // This for upload images as assets to sanity
  // if (!global.btoa) { global.btoa = encode }
  // if (!global.atob) { global.atob = decode }
  
  return (
    <AuthContextProvider>
      <MealsContextProvider>
        <CategoryProvider>
          <Provider store={store}>
            <StatusBar />
            <Navigation />
          </Provider>
        </CategoryProvider>
      </MealsContextProvider>
    </AuthContextProvider>
  );
}
