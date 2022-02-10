import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import {SignIn} from '../pages/Signin';
import {SignUp} from '../pages/Signup';
import {City} from '../pages/City';
import {Sector} from '../pages/Sector';
import { Pairings } from '../pages/Pairings';
import { Pairing } from '../pages/Pairing';
import { RecoverPassword } from '../pages/RecoverPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/city" component={City} />
      <Route path="/sector" component={Sector} />
      {/* refatorar */}
      {/* <Route path="/pairing" exact component={Pairing} /> */}
      <Route path="/pairings" component={Pairings} />
      <Route path="/pairing" component={Pairing} />
      <Route path="/recuperar" component={RecoverPassword} />
    </Switch>
  );
};

export default Routes;
