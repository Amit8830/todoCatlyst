import {createAppContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './Components/MainScreen';
import AddTodoScreen from './Components/AddTodoScreen';

const Stack = createStackNavigator();

const Navigator = createAppContainer(
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={MainScreen} />
    <Stack.Screen name="AddTodo" component={AddTodoScreen} />
  </Stack.Navigator>,
);

export default Navigator;
