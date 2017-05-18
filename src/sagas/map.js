import { takeEvery, delay } from "redux-saga";
import { call, put, select, fork } from "redux-saga/effects";
import { browserHistory } from 'react-router'
import { fetchApi } from 'utils/api-fetch'

import * as mapActions from "actions/map";
let watchId;

function* tracking_process(action) {
  try {
    const session = yield select(state => state.user);
    const map = yield select(state => state.map);
    const payload = yield call(createTrack, session, { path: map.path, type: 'total', noOfHouses: 10 });
    yield put({ type: mapActions.MAP_TRACKING_CREATE_SUCCESS });
  } catch (e) {
    console.log(e);
    //yield put(mapActions.locationFailed({message: 'Location Error'}));
  }
}

const createTrack = (session, data) => {
    const accessToken = session.tokens.access.value;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }
    return fetchApi("/tracks/create", data, 'post', headers );
};

export function* watchMapRequest() {
    yield* takeEvery( mapActions.MAP_TRACKING_CREATE, tracking_process );
}
