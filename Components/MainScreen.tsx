/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
// MainScreen.tsx

import * as React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

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
  // setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

function MainScreen({navigation}: Props) {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [filter, setFilter] = React.useState('All');
  const [sort, setSort] = React.useState('MostRecent');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const loadTodos = () => {
    if (!loading && hasMore) {
      setLoading(true);
      axios
        .get(
          `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`,
        )
        .then(response => {
          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setTodos([...todos, ...response.data]);
            setPage(page + 1);
          }
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  React.useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = (newTodo: string) => {
    const currentTime = moment().format();
    const newTodoItem: TodoItem = {
      userId: 1,
      id: todos.length + 1,
      title: newTodo,
      completed: false,
      created_at: currentTime,
      updated_at: currentTime,
    };

    // Prepend the new TODO to the beginning of the array
    setTodos([newTodoItem, ...todos]);
  };

  const handleSort = (sortType: string) => {
    setSort(sortType);
  };

  const handleFilter = (filterType: string) => {
    setFilter(filterType);
  };

  return (
    <View>
      <Text>Main Screen</Text>
      <Button title="Add TODO" onPress={() => navigation.navigate('AddTodo')} />
      <Text>Total TODO items: {todos.length}</Text>
      <Text>
        Completed TODO items: {todos.filter(todo => todo.completed).length}
      </Text>
      <FlatList
        data={todos.slice(0, 30)} // i have done slice here to display 30 list
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            <Button title={item.completed ? 'Undo' : 'Complete'} />
            <Button title="Delete" />
          </View>
        )}
        onEndReached={loadTodos} // Load more items as the user scrolls
        onEndReachedThreshold={0.2} // Load more when reaching 10% from the bottom
      />
    </View>
  );
}

export default MainScreen;
