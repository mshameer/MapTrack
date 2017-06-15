import { combineReducers } from 'redux';
import flashMessages from 'reducers/flashMessages';
import login from 'reducers/login';
import signup from 'reducers/signup';
import user from 'reducers/user';
import map from 'reducers/map';
import routes from 'reducers/routes';

const rootReducer = combineReducers({
  flashMessages,
  login,
  map,
  routes,
  signup,
  user,
});

export default rootReducer;
