import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import { incrementAction, decrementAction, changeStepAction, requestCounterFetching } from '../actions/actionCreator'


const Counter = (props) => {
    const onChangeStep = ({ target: { value } }) => {
        props.changeStep(Number(value));
    }

    const onClickHandler = () => {
        props.requestFetching(props.counter);
    }
    return (
        <div>
            <h1>{props.counter}</h1>
            <input type='number' name='step' value={props.step} onChange={onChangeStep} />
            <button onClick={props.increment}>+</button>
            <button onClick={props.decrement}>-</button>

            <button onClick={onClickHandler}>Send counter to backend</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    // console.log(state);
    return state;
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         increment: () => dispatch(incrementAction()),
//         decrement: () => dispatch(decrementAction()),    
//         changeStep: (value) => dispatch(changeStepAction(value))
//         requestFetching: () => dispatch (requestCounterFetching())

//     }
// }

const mapDispatchToProps = {
    increment: incrementAction,
    decrement: decrementAction,
    changeStep: changeStepAction,
    requestFetching: requestCounterFetching
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


/*

задача: впровадити зміну кроку для лічильника

1. actionType

2. actionCreator

3. actionCreator -> mapDispatchToProps

4. Reducer (як оновити стан, якщо цей екшен прийшов в редьюсер)

5. Написати обробник події зміни інпут
*/

/*

3 стани 

const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null)

-- Запит пішов (loading)
-- Запит прийшов, все ок (дані)
-- Запит прийшов, все погано (помилка)


*/