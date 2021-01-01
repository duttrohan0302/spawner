import React from 'react';
import { Switch } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
import DefaultLayoutRoute from './DefaultLayout';
import NotFound from '../Components/NotFound';
import MessagePage from '../Components/MessagePage';
import Homepage from '../Components/Homepage';
import CreateApp from '../Components/CreateApp';


const Routes =  ()  => {
  return (
      <Switch>
        <DefaultLayoutRoute exact path="/" component={Homepage} />
        <DefaultLayoutRoute exact path="/hello" component={MessagePage} />
        <DefaultLayoutRoute path="/continue-app" component={CreateApp} />
        <DefaultLayoutRoute component={NotFound} />
      </Switch>
  );
};

export default Routes;
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   // isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps)(Routes);
