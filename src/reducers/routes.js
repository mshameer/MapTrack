import {
  CREATE_ROUTE_REQUEST,
  CREATE_ROUTE_FAILED,
  CREATE_ROUTE_SUCCESS,
  LOAD_ROUTES_SUCCESS,
} from 'actions/routes';

const initialState = {
  tracks: [],
  errors: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_ROUTE_REQUEST:
      return { ...state, isFetching: true, errors: {} };
    case LOAD_ROUTES_SUCCESS:
      return { ...state, routes: action.routes, isFetching: false, errors: {} };
    default:
      return state;
  }
};
