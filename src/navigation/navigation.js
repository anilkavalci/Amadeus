import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import List from '../screens/List/List';
import Flights from '../screens/Flights/Flights';

const Stack = createNativeStackNavigator();

const navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.Flights} component={Flights} />
        <Stack.Screen name={routes.List} component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
