import Navigation from './navigation'
import { store } from './store'
import { Provider } from 'react-redux'
// import {decode, encode} from 'base-64'

export default function App() {
  // This for upload images as assets to sanity
  // if (!global.btoa) { global.btoa = encode }
  // if (!global.atob) { global.atob = decode }
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
