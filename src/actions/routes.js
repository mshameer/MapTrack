export const CREATE_ROUTE_REQUEST = 'CREATE_ROUTE_REQUEST';
export const CREATE_ROUTE_FAILED = 'CREATE_ROUTE_FAILED';
export const CREATE_ROUTE_SUCCESS = 'CREATE_ROUTE_SUCCESS';

export const LOAD_ROUTES_REQUEST = 'LOAD_ROUTES_REQUEST';
export const LOAD_ROUTES_FAILED = 'LOAD_ROUTES_FAILED';
export const LOAD_ROUTES_SUCCESS = 'LOAD_ROUTES_SUCCESS';

export const createRoute = tracks => ({
  type: CREATE_ROUTE_REQUEST,
  tracks,
});

export const createRouteFailed = errors => ({
  type: CREATE_ROUTE_FAILED,
  errors,
});

export const createRouteSuccess = change => ({
  type: CREATE_ROUTE_SUCCESS,
  change,
});

export const loadRoutes = () => ({
  type: LOAD_ROUTES_REQUEST,
});
