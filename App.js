import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './Components/MainScreen';
import AddTodoScreen from './Components/AddTodoScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{title: 'Main Screen'}}
        />
        <Stack.Screen
          name="AddTodo"
          component={AddTodoScreen}
          options={{title: 'Add TODO Item'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
