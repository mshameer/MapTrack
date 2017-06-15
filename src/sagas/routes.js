import { takeEvery, delay } from "redux-saga";
import { call, put, select, fork } from "redux-saga/effects";
import { fetchApi } from 'utils/api-fetch'
import * as routesActions from "actions/routes";

function* routes_process(action) {
  try {
    console.log('yes');
    const session = yield select(state => state.user);
    const map = yield select(state => state.map);
    const payload = yield call(createRoutes, session, { tracks: map.tracks });
    yield put(routesActions.createRouteSuccess());
  } catch (e) {
    console.log(e);
  }
}

const createRoutes = (session, { tracks }) => {
  const data = { tracks: tracks.filter(track => track.selected).map(track => track.id), name: 'Karikodu Track 2' };
  return fetchApi("/routes/create", data, 'post', session );
};

export function* watchRouteRequest() {
    yield* takeEvery( routesActions.CREATE_ROUTE_REQUEST, routes_process );
}
