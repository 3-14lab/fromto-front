import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import {SignIn} from '../pages/Signin';
import {SignUp} from '../pages/Signup';
import {City} from '../pages/City';
import {Sector} from '../pages/Sector';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/city" exact component={City} />
      <Route path="/sector" exact component={Sector} />
    </Switch>
  );
};

export default Routes;
