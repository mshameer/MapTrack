import React from "react";
import { Route, IndexRoute } from "react-router";

import Login from './Login';
import Home from './Home';
import Register from './Register';
import MapTrack from './MapTrack';
import requireAuth from './Authenticate';

export default (
  <Route path="/" >
    <IndexRoute component={Login}/>
    <Route path="dashboard" component={requireAuth(Home)} />
    <Route path="register" component={Register} />
    <Route path="maptrack" component={requireAuth(MapTrack)} />
  </Route>
);
