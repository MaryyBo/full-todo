import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList/TodoList';

const TodoPage = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {

    }, []);
    return (

        <div>
            <h1> Todo List </h1>
            <TodoList todos={todos}/>
        </div>
    );
}

export default TodoPage;
