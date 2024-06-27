import React, { useReducer } from 'react'
import { connect } from 'react-redux'


const Counter = (props) => {


    const increment = () => {
        const action = {
            type: 'COUNTER_PLUS'
        }
        props.dispatch(action)
    }
    const decrement = () => {
        const action = {
            type: 'COUNTER_MINUS'
        }
        props.dispatch(action)
    }

    console.log(props);


    return (
        <div>
            <h1>{props.counter}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
}

const WrappedCounter = connect(mapStateToProps)(Counter);

export default WrappedCounter;


/*
connect - функція, що приймає 2 опціональні аргументи і підписує компоненти на оновлення

- mapStateToProps 
Функція яка приймає весь стейт, і повертає тільки ту частину стейту яка потрібна тільки самецій компоненті

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