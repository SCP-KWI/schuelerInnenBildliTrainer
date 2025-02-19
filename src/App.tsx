import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './components/MainScreen';
import TrainClassScreen from './components/TrainClassScreen';
import ScanClassScreen from './components/ScanClassScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="TrainClass" component={TrainClassScreen} />
        <Stack.Screen name="ScanClass" component={ScanClassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;