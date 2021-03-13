import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Mainpage from './pages/main';

const Routes = (childProps) => {

  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={ Mainpage } />
      </Switch>
    </Fragment>
  )
}

export default Routes;