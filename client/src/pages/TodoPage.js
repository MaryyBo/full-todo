import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList/TodoList';
import { getTasks, createTask, deleteTask } from '../api/taskApi';
import TodoForm from '../components/TodoForm/TodoForm';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    getTasks()
      .then(result => {
        setTodos(result.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  const getNewToDo = (data) => {
    createTask({
      status: 'new',
      ...data
    })
      .then(({ data: createdTask }) => {
        const newTodo = [...todos, createdTask];
        setTodos(newTodo);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const delTask = (id) => {
    deleteTask(id)
    .then(({ data: deletedTask }) => {
      const filteredArray = todos.filter(td => td._id !== deletedTask._id);
      setTodos(filteredArray);
    })
    .catch(error => {
      console.error(error);
    })
  }

  return (

    <div>
      <h1> Todo List </h1>
      <TodoForm sendData={getNewToDo} />
      <TodoList todos={todos} delCallback={delTask} />
    </div>
  );
}

export default TodoPage;
