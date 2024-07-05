
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';
import TodoPage from './pages/TodoPage';
import history from './BrowserHistory';
import { connect } from 'react-redux'; //прикручує react до redux
import { authUserRequest } from './actions/actionCreator';
import { useEffect } from 'react';

const App = (props) => { //Копмонента App буде отримувати юзера через props

  useEffect(() => {
    if (!props.user) {
      props.authUserRequest();
    }
  }, [])

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/" element={<TodoPage />} />
      </Routes>

    </HistoryRouter>
  );
}

const mapStateToProps = ({ user }) => ({ user }) // підписуємось тільки на стейт user (деструктуризуємо зі state)

const mapDispatchToProps = { // mapDispatchToProps - він загортає в dispatch наш authUserRequest
  authUserRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// У connect є два ()() виклики - у першому приймаються mapStateToProps та mapDispatchToProps а у другому компоненту яку треба підключити
// UseEffect - має спрацювати як компонент DidMount -  він має спрацювати тільки при монтуванні App в дом дерево