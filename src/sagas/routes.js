import { takeEvery, delay } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';
import { fetchApi } from 'utils/api-fetch';
import * as routesActions from 'actions/routes';

function* createRoutesProcess(action) {
  try {
    const session = yield select(state => state.user);
    const map = yield select(state => state.map);
    const payload = yield call(createRoutes, session, { tracks: map.tracks });
    yield put(routesActions.createRouteSuccess());
  } catch (e) {
    console.log(e);
  }
}

function* loadRoutesProcess() {
  try {
    const session = yield select(state => state.user);
    const routes = yield call(loadRoutes, session);
    yield put({ type: routesActions.LOAD_ROUTES_SUCCESS, routes });
  } catch (e) {
    console.log(e);
  }
}

const createRoutes = (session, { tracks }) => {
  const data = {
    tracks: tracks.filter(track => track.selected).map(track => track.id),
    name: 'Karikodu Track 2',
  };
  return fetchApi('/routes/create', data, 'post', session);
};

const loadRoutes = (session) => {
  return fetchApi('/routes', {}, 'get', session);
};

export function* watchRouteRequest() {
  yield* takeEvery(routesActions.CREATE_ROUTE_REQUEST, createRoutesProcess);
}

export function* watchLoadRouteRequest() {
  yield* takeEvery(routesActions.LOAD_ROUTES_REQUEST, loadRoutesProcess);
}
