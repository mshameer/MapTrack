import {
    CREATE_ROUTE_REQUEST,
    CREATE_ROUTE_FAILED,
    CREATE_ROUTE_SUCCESS,
} from "actions/routes";

const initialState = {
    tracks: [],
    errors: {}
};

export default (state=initialState, action={}) => {
  switch (action.type) {
    case CREATE_ROUTE_REQUEST:
      return { ...state, isFetching: true, errors: {} };
    default: return state;
  }
};
