import { takeEvery, delay } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';
import { fetchApi } from 'utils/api-fetch';
import * as mapActions from 'actions/map';

function* tracking_process(action) {
  try {
    const session = yield select(state => state.user);
    const map = yield select(state => state.map);
    const payload = yield call(createTrack, session, {
      path: map.path,
      type: 'total',
      noOfHouses: map.noOfHouses,
    });
    yield put({ type: mapActions.MAP_TRACKING_CREATE_SUCCESS });
    yield put(mapActions.stopTracking());
    yield put(mapActions.loadPath());
  } catch (e) {
    console.log(e);
  }
}

function* track_load() {
  try {
    const session = yield select(state => state.user);
    const tracks = yield call(loadTrack, session);
    yield put({ type: mapActions.LOAD_MAP_TRACKS_SUCCESS, tracks });
  } catch (e) {
    console.log(e);
  }
}

const createTrack = (session, data) => {
  return fetchApi('/tracks/create', data, 'post', session);
};

const loadTrack = (session, data) => {
  return fetchApi('/tracks', {}, 'get', session);
};

export function* watchLoadTrack() {
  while (true) {
    yield* takeEvery(mapActions.LOAD_MAP_TRACKS, track_load);
  }
}

export function* watchMapRequest() {
  yield* takeEvery(mapActions.MAP_TRACKING_CREATE, tracking_process);
}
