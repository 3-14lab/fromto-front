import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import {SignIn} from '../pages/Signin';
import {SignUp} from '../pages/Signup';
import {City} from '../pages/City';
import {Sector} from '../pages/Sector';
import { Pairing } from '../pages/Pairing';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/city" isPrivate exact component={City} />
      <Route path="/sector" isPrivate  exact component={Sector} />
      <Route path="/pairing" isPrivate exact component={Pairing} />
    </Switch>
  );
};

export default Routes;
