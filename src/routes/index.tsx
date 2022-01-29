import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import {SignIn} from '../pages/Signin';
import {SignUp} from '../pages/Signup';
import {City} from '../pages/City';
import {Sector} from '../pages/Sector';
import { Pairings } from '../pages/pairings';
import { Pairing } from '../pages/Pairing';
import { RecoverPassword } from '../pages/RecoverPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/city" isPrivate exact component={City} />
      <Route path="/sector" isPrivate  exact component={Sector} />
      <Route path="/pairings" isPrivate exact component={Pairings} />
      <Route path="/pairing" isPrivate exact component={Pairing} />
      <Route path="/recover" exact component={RecoverPassword} />
    </Switch>
  );
};

export default Routes;
