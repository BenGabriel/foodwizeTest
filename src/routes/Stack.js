import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/animal/Home';
import AnimalDetails from '../screens/animal/AnimalDetails';

const {Navigator, Screen} = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="Animal" component={AnimalDetails} />
    </Navigator>
  );
};
