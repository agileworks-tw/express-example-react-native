import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const TodoItem = ({ todo, onPressComplete }) => {
  const isCompleted = todo.completed === true;
  const isIncomplete = todo.completed === false;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{}}>
        <Text
          style={[
            styles.todoTitle,
            {
              textDecorationLine: isCompleted ? 'line-through' : 'none'
            }
          ]}
        >
          {todo.title}
        </Text>
      </View>
      {isIncomplete && (
        <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={() => onPressComplete(todo)}
            style={[styles.btnContainer, { backgroundColor: '#92d04e' }]}
          >
            <Icon size={15} name={'check'} color={'#fff'} />
          </TouchableOpacity>
        </View>
      )}
      {isCompleted && (
        <View style={styles.btnGroup}>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    borderColor: '#f8bc45',
    backgroundColor: '#f8bc45',
    borderWidth: 1.5,
    marginVertical: 10
  },
  btnContainer: {
    padding: 7,
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    marginRight: 10,
    backgroundColor: 'rgb(232, 73, 70)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnGroup: {
    flexDirection: 'row'
  },
  todoTitle: {
    color: 'black',
    fontWeight: 'bold'
  }
});

export default TodoItem;
