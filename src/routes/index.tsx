import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Route from './Route';

import {SignIn} from '@pages/Signin';
import {SignUp} from '@pages/Signup';
import {City} from '@pages/City';
import { Pairings } from '@pages/Pairings';
import { Pairing } from '@pages/Pairing';
import { RecoverPassword } from '@pages/RecoverPassword';
import { PairingView } from '@pages/PairingView';
import { PJServicesView } from '@pages/PJServicesView';
import { PairingsPJ } from '@pages/PairingsPJ';
import { PairingPJ } from '@pages/PairingPJ';
import { ResetPassword } from '@pages/ResetPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/city" isPrivate exact component={City} />
      <Route path="/pairings/:sector_id" isPrivate exact component={Pairings} />
      <Route path="/pairings/pj/:sector_id" isPrivate exact component={PairingsPJ} />
      <Route path="/pairing/:sector_id" isPrivate exact component={Pairing} />
      <Route path="/pairing/pj/:sector_id" isPrivate exact component={PairingPJ} />
      <Route path="/pairing/view/:p_id" isPrivate exact component={PairingView} />
      <Route path="/pairing/view/pj/:p_id" isPrivate exact component={PJServicesView} />
      <Route path="/recover" component={RecoverPassword} />
      <Route path="/reset/:token" component={ResetPassword} />
      <Route component={() => <Redirect to='/' />} />
    </Switch>
  );
};

export default Routes;
