import React from 'react';
import { Router,Route, Switch } from 'react-router-dom';
import { history } from './Helpers';

import './App.css';

import { Provider } from 'react-redux';
import store from './Helpers/store';
import Homepage from './Components/Homepage';
import Routes from './Routing/Routes';

import DefaultLayoutRoute from './Routing/DefaultLayout';

const App = () => {
  

  return (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
              <DefaultLayoutRoute exact path='/' component = {Homepage} />
              <Route component = {Routes} />
            </Switch>
        </Router>
    </Provider>
    
    
  );
}

export default App;
