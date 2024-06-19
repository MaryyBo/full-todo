import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList/TodoList';
import { useNavigate } from "react-router-dom";
import { getTasks, createTask } from '../api/taskApi';
import TodoForm from '../components/TodoForm/TodoForm';
import { authUser } from '../api/userApi';

const TodoPage = (props) => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    /*
    1. Чи є у нас юзер у стейті реакту
       1.1 Якщо юзер є - все ок
       1.2 Якщо юзера немає - залазимо в localstorage і дивимось чи є у нього токен
         1.2.1 Якщо токен є - беремо токен і йдемо на сервер, авторизуємо запит на отримання тасок
               Сервер перевіряє, чи валідний токен, чи ні
               1.2.1.1 Якщо не валідний - повертаємо на сервері помилку 403, на фронті перенапрявляємос ьнасторінку аутентифікації
               1.2.1.2 Якщо валідний - сервер виконує запит і повертає нам відповідь 
         1.2.2 Якщо токена немає -  перенаправляємось на сторінку аутентифікації і змушуємо користувача проходити її знову

    */

    if (!props.user) {
      const token = localStorage.getItem('token');
      if (token) {
        // Робимо запит на отримання юзера
        authUser(token)
          .then(userData => {
            props.sendUser(userData.data)
          })
          .catch(error => {
            console.error(error
            );
          })
      } else {
        // Перенаправляємось на аутентифікацію
        return navigate('/')
      }
    } else {
      getTasks(props.user._id)
        .then(result => {
          setTodos(result.data);
        })
        .catch(error => {
          console.error(error);
        })
    }

  }, [props.user]);

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

  return (

    <div>
      <h1> Todo List </h1>
      <TodoForm sendData={getNewToDo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default TodoPage;
