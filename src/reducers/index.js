import { combineReducers } from "redux";
import flashMessages from "reducers/flashMessages";
import login from "reducers/login";
import signup from "reducers/signup";
import user from "reducers/user";
import map from "reducers/map";

const rootReducer = combineReducers({
    flashMessages,
    login,
    signup,
    user,
    map,
});

export default rootReducer;
