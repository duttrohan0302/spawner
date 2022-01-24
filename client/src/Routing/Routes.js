import React from 'react';
import { Switch } from 'react-router-dom';
import DefaultLayoutRoute from './DefaultLayout';
import NotFound from '../Components/NotFound';
import CreateApp from '../Components/CreateApp';


const Routes =  ()  => {
  return (
      <Switch>
        {/* <DefaultLayoutRoute exact path="/hello" component={MessagePage} /> */}
        <DefaultLayoutRoute exact path="/" component={CreateApp} />
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
