/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import ApplicationNavigator from './navigation/Applications'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from "./components/ThemeProvider";
import FontProvider from './components/FontProvider';
import { ImageBackground,SafeAreaView, StatusBar } from "react-native"
function App(): React.JSX.Element {

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <FontProvider>
            <ThemeProvider>
              <ApplicationNavigator />
            </ThemeProvider>
          </FontProvider>
        </PersistGate>
      </Provider>
  );
}


export default App;
