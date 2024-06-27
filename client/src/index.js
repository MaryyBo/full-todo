import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Counter from './components/Counter';
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COUNTER_PLUS': {
      return {
        ...state,
        counter: state.counter + 1
      }
    }
    case 'COUNTER_MINUS': {
      return {
        ...state,
        counter: state.counter - 1
      }
    }
    default: {
      return state
    }
  }
}


const store = createStore(reducer);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Counter />
  </Provider>
);


/*

Redux-core - застарілий підхід

Redux- toolkit - сучасний підхід

const store = createStore()- стоврення сховища

*/