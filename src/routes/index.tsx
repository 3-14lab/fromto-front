import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Route from './Route';

import {SignIn} from '@pages/Signin';
import {SignUp} from '@pages/Signup';
import {City} from '@pages/City';
import {Sector} from '@pages/Sector';
import { Pairings } from '@pages/Pairings';
import { Pairing } from '@pages/Pairing';
import { RecoverPassword } from '@pages/RecoverPassword';
import { PairingView } from '@pages/PairingView';
import { PJServicesView } from '@pages/PJServicesView';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/city" isPrivate exact component={City} />
      <Route path="/sector/:city_id" isPrivate exact component={Sector} />
      <Route path="/pairings/:sector_id" isPrivate exact component={Pairings} />
      <Route path="/pairing/:sector_id" isPrivate exact component={Pairing} />
      <Route path="/pairing/view/:p_id" isPrivate exact component={PairingView} />
      <Route path="/pairing/view/pj/:p_id" isPrivate exact component={PJServicesView} />
      <Route path="/recover" component={RecoverPassword} />
      <Route component={() => <Redirect to='/' />} />
    </Switch>
  );
};

export default Routes;
