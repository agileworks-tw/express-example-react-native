import React, { Component } from 'react';
import { View, Platform, Alert } from 'react-native';
import { find, propEq, keys, has, assoc } from 'ramda';


import TodoList from '../components/TodoList';
import NewTodo from '../components/NewTodo';
import Footer from '../components/Footer';
import Config from 'react-native-config'

import FluentLogHelper from 'fluent-log-helper';

let config = {
  host: "211.72.239.244",
  port: "24224",
  tag_prefix: "cargocms.pos"
}

class App extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: 'rgb(84, 90, 99)',
    navBarTextColor: '#fff'
  };

  state = {
    newTodoValue: '',
    todos: [
      // { id: 1, title: '👋 Meet and Greet', completed: false },
      // { id: 2, title: '🔈 Full Stack Nanodegree', completed: false },
      // { id: 3, title: '👨🏻‍💻 Current Work', completed: false },
      // { id: 4, title: '🛠 React Native Tools', completed: false }
    ]
  };

  async componentDidMount (){
    
    let url = "http://localhost:3000";
    console.log(Config);

    if (Platform.OS !== 'ios') url = Config.API_URL;

    response = await fetch(`${url}/api/users/hellojs/tasks`);
    let result = await response.json();

    let todos = result.tasks;

    this.setState({
      todos
    });



  }

  handleComplete = async todo => {
    const todos = this.state.todos;
    const todoToUpdate = find(propEq('id', todo.id))(todos);
    const hasCompletedProp = has('completed')(todoToUpdate);
    
    if (keys(todoToUpdate).length > 0 && hasCompletedProp) {
      let id = todoToUpdate.id;
      let completed = true;
      let data = {
        completed
      }
      let response = await fetch(`http://192.168.60.1:3000/api/task/${id}`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const updatedTodo = assoc('completed', completed)(todoToUpdate);
      
      const updatedTodoList = todos.map(t => {
        if (t.id === todo.id) return updatedTodo;
        return t;
      });
      this.setState({ todos: updatedTodoList });
    } else {
      throw new Error({ message: 'Todo not found' });
    }
  };

  handleRemove = async todo => {
    console.log("handleRemove", todo);
  };

  handleOnAddNewTodo = async () => {
    const { todos, newTodoValue } = this.state;
    if (newTodoValue.length == 0) {
      Alert.alert('Empty Todo', '請輸入待做事項');
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

    this.setState({
      todos: [...this.state.todos, result.task],
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
            onChangeNewTodoTitle={newVal =>
              this.setState({ newTodoValue: newVal })
            }
            newTodoValue={newTodoValue}
            onAddNewTodo={this.handleOnAddNewTodo}
          />
        </View>
        <TodoList
          data={todos}
          onPressComplete={this.handleComplete}
          onPressRemove={this.handleRemove}
        />
        <Footer />
      </View>
    );
  }
}

export default App;
