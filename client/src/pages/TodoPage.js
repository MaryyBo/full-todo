import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList/TodoList';
import { useNavigate } from "react-router-dom";
import { getTasks, createTask } from '../api/taskApi';
import TodoForm from '../components/TodoForm/TodoForm';

const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.user) {
            return navigate('/')
        }
        getTasks(props.user._id)
            .then(result => {
                setTodos(result.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    const getNewToDo = (data) => {
        createTask({
          authorId: props.user._id,
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

    return (

        <div>
            <h1> Todo List </h1>
            <TodoForm sendData={getNewToDo} />
            <TodoList todos={todos} />
        </div>
    );
}

export default TodoPage;
