import React from 'react';
import { Router,Route, Switch } from 'react-router-dom';
import { history } from './Helpers';

import './App.css';

import { Provider } from 'react-redux';
import store from './Helpers/store';
import Routes from './Routing/Routes';


const App = () => {
  

  return (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
              <Route component = {Routes} />
            </Switch>
        </Router>
    </Provider>
    
    
  );
}

export default App;
