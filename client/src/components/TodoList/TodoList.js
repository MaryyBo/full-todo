import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = (props) => {
  return (
    <ol>
      {props.todos.map((td) => (
        <TodoItem item={td} key={td._id} delCallback={props.delCallback} />
      ))}
    </ol>
  );
};

export default TodoList;


// import React from 'react';
// import TodoItem from '../TodoItem/TodoItem';

// const TodoList = (props) => {
//   const todos = props.todos || []; // Переконайтеся, що 'todos' завжди визначений

//   return (
//     <ol>
//       {todos.map((td) => (
//         <TodoItem item={td} key={td._id} delCallback={props.delCallback} />
//       ))}
//     </ol>
//   );
// };

// export default TodoList;