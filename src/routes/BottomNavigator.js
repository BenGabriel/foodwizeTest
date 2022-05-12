import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeNavigator} from './Stack';
import User from '../screens/user/User';
import {Colors} from '../helper/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
      }}>
      <Screen
        name="AppHome"
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon name="dog" size={30} color={focused ? color : Colors.black} />
          ),
        }}
        component={HomeNavigator}
      />
      <Screen
        name="Settings"
        options={{
          tabBarIcon: ({color, focused}) => (
            <Entypo
              name="user"
              size={25}
              color={focused ? color : Colors.black}
            />
          ),
        }}
        component={User}
      />
    </Navigator>
  );
};

export default BottomNavigator;
