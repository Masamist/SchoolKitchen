import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation'
import { AuthContextProvider } from './store/context/authContext'
import { MealsContextProvider } from './store/context/mealContext'
import { CategoryProvider } from './store/context/categoryContext'
import { DateProvider } from './store/context/dateContext'
// Redux
import { store } from './store/redux/store'
import { Provider as StoreProvider } from 'react-redux'
//UI
import { PaperProvider } from 'react-native-paper'
import { enGB, registerTranslation } from 'react-native-paper-dates'
import { theme } from './theme/paperTheme'


export default function App() {  
  registerTranslation('en-GB', enGB)
  
  return (
    <AuthContextProvider>
      <MealsContextProvider>
        <CategoryProvider>
          <DateProvider>
            <StoreProvider store={store}>
              <PaperProvider theme={theme}>
                <StatusBar />
                <Navigation />
              </PaperProvider>
            </StoreProvider>
          </DateProvider>
        </CategoryProvider>
      </MealsContextProvider>
    </AuthContextProvider>
  );
}
