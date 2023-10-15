/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// AddTodoScreen.tsx


import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import moment from 'moment';

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

function AddTodoScreen({ navigation }: Props) {
  const [todo, setTodo] = React.useState<string>('');
  const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const handleAddTodo = () => {
    if (todo.trim() === '') {
      return; // Prevent adding empty TODOs
    }

    const currentTime = moment().format();
    const newTodoItem: TodoItem = {
      userId: 1, // You can adjust the user ID as needed
      id: Math.floor(Math.random() * 1000000), // Assign a unique ID
      title: todo,
      completed: false,
      created_at: currentTime,
      updated_at: currentTime,
    };

    // Prepend the new TODO to the beginning of the array
    setTodos(prevTodos => [newTodoItem, ...prevTodos]);

    setTodo(''); // Clear the input field after adding
    navigation.navigate('Main'); // Navigate back to the main screen
  };

  return (
    <View>
      <Text>Add TODO Item</Text>
      <TextInput
        placeholder="Enter your TODO"
        value={todo}
        onChangeText={text => setTodo(text)}
      />
      <Button title="Add" onPress={handleAddTodo} />
    </View>
  );
}

export default AddTodoScreen;
