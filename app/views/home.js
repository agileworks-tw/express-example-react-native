import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { find, propEq, keys, has, assoc } from 'ramda';

import TodoList from '../components/TodoList';
import NewTodo from '../components/NewTodo';
import Footer from '../components/Footer';

class App extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'rgb(84, 90, 99)',
    navBarTextColor: '#fff'
  };

  state = {
    newTodoValue: '',
    todos: [
      // { id: 1, title: '👋 Meet and Greet', status: 'i' },
      // { id: 2, title: '🔈 Full Stack Nanodegree', status: 'i' },
      // { id: 3, title: '👨🏻‍💻 Current Work', status: 'i' },
      // { id: 4, title: '🛠 React Native Tools', status: 'i' }
    ]
  };

  async componentDidMount (){
      let response = await fetch("http://192.168.60.1:3000/api/users/hellojs/tasks");
      let result = await response.json();

      let todos = result.tasks;

      console.log("todos", todos);

      this.setState({todos});
  }

  handleComplete = todo => {
    const todos = this.state.todos;
    const todoToUpdate = find(propEq('id', todo.id))(todos);
    const hasCompletedProp = has('completed')(todoToUpdate);
    
    if (keys(todoToUpdate).length > 0 && hasCompletedProp) {
      const updatedTodo = assoc('completed', true)(todoToUpdate);
      const updatedTodoList = todos.map(t => {
        if (t.id === todo.id) return updatedTodo;
        return t;
      });
      this.setState({ todos: updatedTodoList });
    } else {
      throw new Error({ message: 'Todo not found' });
    }
  };

  handleRemove = todo => {
    const todos = this.state.todos;
    const updatedTodos = todos.filter(t => t.id !== todo.id);
    this.setState({ todos: updatedTodos });
  };

  handleOnAddNewTodo = async () => {
    const { todos, newTodoValue } = this.state;
    if (newTodoValue.length < 5) {
      Alert.alert('Empty Todo', 'Enter at least 4 or more characters!');
      return;
    }

    const data = {
      title: newTodoValue,
      completed: false
    };

    let response = await fetch('http://192.168.60.1:3000/api/users/hellojs/tasks/create', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    let result = await response.json();

    const newTodo = {
      id: result.task.id,
      title: result.task.title,
      status: 'i'
    };


    this.setState({
      todos: [...this.state.todos, newTodo],
      newTodoValue: ''
    });
  };

  navigateToScreen2 = () => {
    this.props.navigator.push({
      screen: 'TodoApp.Screen2',
      title: 'Screen 2',
      navigatorStyle: {
        navBarBackgroundColor: 'rgb(84, 90, 99)',
        navBarTextColor: '#fff',
        navBarButtonColor: '#fff',
        navBarLeftButtonColor: '#fff'
      }
    });
  };

  render() {
    const { newTodoValue, todos } = this.state;
    return (
      <View style={{ backgroundColor: 'rgb(84, 90, 99)', flex: 1 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}
        >

        </View>
        <View style={{ margin: 20 }}>
          <NewTodo
            onChangeNewtitle={newVal =>
              this.setState({ newTodoValue: newVal })
            }
            newTodoValue={newTodoValue}
            onAddNewTodo={this.handleOnAddNewTodo}
          />
        </View>
        <TodoList
          data={todos}
          onPressRemove={this.handleRemove}
          onPressComplete={this.handleComplete}
        />
        <Footer />
      </View>
    );
  }
}

export default App;
