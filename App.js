import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './src/routes/BottomNavigator';
import Login from './src/screens/auth/Login';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import Register from './src/screens/auth/Register';

const {Navigator, Screen} = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Screen name="Login" component={Login} />
          <Screen name="Register" component={Register} />
          <Screen name="App" component={BottomNavigator} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
