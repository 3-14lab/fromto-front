import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

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
      <Route path="/sector/:city_id" isPrivate exact component={Sector} />
      <Route path="/pairings/:sector_id" isPrivate exact component={Pairings} />
      <Route path="/pairing/:sector_id" isPrivate exact component={Pairing} />
      {/* <Route path="/pairing" isPrivate exact component={Pairing} /> */}
      <Route path="/recover" component={RecoverPassword} />
      <Route component={() => <Redirect to='/' />} />
    </Switch>
  );
};

export default Routes;