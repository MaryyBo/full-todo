import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import { incrementAction, decrementAction } from '../actions/actionCreator'


const Counter = (props) => {


    // const increment = () => {
    //     props.dispatch(createActionIncrement())
    // }


    // const decrement = () => {
    //     props.dispatch(createActionDecrement())
    // }

    console.log(props);


    return (
        <div>
            <h1>{props.counter}</h1>
            <button onClick={props.increment}>+</button>
            <button onClick={props.decrement}>-</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         increment: () => dispatch(incrementAction()),
//         decrement: () => dispatch(decrementAction())
//     }
// }

const mapDispatchToProps = {
    increment: incrementAction,
    decrement: decrementAction
}
const WrappedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default WrappedCounter;


/*
connect - функція, що приймає 2 опціональні аргументи і підписує компоненти на оновлення

- mapStateToProps 
Функція яка приймає весь стейт, і повертає тільки ту частину стейту яка потрібна тільки самецій компоненті

- mapDispatchToProps
Функція, яка повертає об'єкт, в якому наші actionCreator`s огортаються dispatch

HOC = high order component - компонент вищого порядку

Каріювання функцій - трансформація функцій - послідовність викликів функцій
f(a, b, c) -> f(a)(b)(c)

function add(x) {
    return function(y) {
        return x + y;
    }
}
add(2)(3) // 5
*/