import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Counter from './components/Counter';
import { Provider } from 'react-redux'
import store from './store';


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