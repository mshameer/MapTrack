import { calDistanceKm } from 'utils/map';

import {
  MAP_TRACKING_START,
  MAP_TRACKING_STOP,
  MAP_TRACKING_UPDATE,
  MAP_CURRENT_LOCATION,
  MAP_TRACKING_CREATE_SUCCESS,
  MAP_INPUT_CHANGE,
  LOAD_MAP_TRACKS_SUCCESS,
  ADD_OR_REMOVE_TRACK,
} from 'actions/map';

const initialState = {
  tracking: false,
  path: [],
  errors: {},
  total: { distance: 0, noOfHouses: 0 },
  defaultLocation: { lat: 0, lng: 0 },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case MAP_TRACKING_START:
      return { ...state, tracking: true, errors: {} };
    case MAP_CURRENT_LOCATION:
      return {
        ...state,
        defaultLocation: {
          lat: action.coords.latitude,
          lng: action.coords.longitude,
        },
        errors: {},
      };

    case MAP_TRACKING_UPDATE:
      const path = state.path;
      const location = {
        lat: action.coords.latitude,
        lng: action.coords.longitude,
      };
      path.push(location);
      return {
        ...state,
        path,
        tracking: true,
        defaultLocation: location,
        errors: {},
      };
    case MAP_TRACKING_STOP:
      return { ...state, path: [], tracking: false, errors: {} };
    case MAP_TRACKING_CREATE_SUCCESS:
      return { ...state, tracking: false, errors: {} };
    case LOAD_MAP_TRACKS_SUCCESS:
      return { ...state, tracks: action.tracks, errors: {} };
    case MAP_INPUT_CHANGE:
      let { change } = action;
      if (change.hasOwnProperty('noOfHouses')) {
        return {
          ...state,
          noOfHouses: !isNaN(change.noOfHouses) ? change.noOfHouses : '',
          errors: { ...state.errors, noOfHouses: '', message: '' },
          pause: false,
        };
      }
    case ADD_OR_REMOVE_TRACK:
      const { track } = action;
      let { tracks } = state;
      const selectedIndex = tracks.findIndex(mtrack => mtrack.id === track.id);
      tracks[selectedIndex].selected = !track.selected;
      const total = getTotal(tracks);
      return { ...state, tracks, total, errors: {} };

    default:
      return state;
  }
};

function getTotal(tracks) {
  let distance = 0;
  let noOfHouses = 0;

  tracks.filter(track => track.selected).map(track => {
    const { coords } = track;
    distance = distance + calDistanceKm(coords[0], coords[coords.length - 1]);
    noOfHouses = noOfHouses + track.noOfHouses;
  });

  return { distance, noOfHouses };
}
