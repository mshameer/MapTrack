export const MAP_TRACKING_START = 'MAP_TRACKING_START';
export const MAP_TRACKING_STOP = 'MAP_TRACKING_STOP';
export const MAP_TRACKING_UPDATE = 'MAP_TRACKING_UPDATE';
export const MAP_CURRENT_LOCATION = 'MAP_CURRENT_LOCATION';
export const MAP_TRACKING_CREATE = 'MAP_TRACKING_CREATE';
export const MAP_TRACKING_CREATE_SUCCESS = 'MAP_TRACKING_CREATE_SUCCESS';
export const MAP_INPUT_CHANGE = 'MAP_INPUT_CHANGE';
export const LOAD_MAP_TRACKS = 'LOAD_MAP_TRACKS';
export const LOAD_MAP_TRACKS_SUCCESS = 'LOAD_MAP_TRACKS_SUCCESS';
export const ADD_OR_REMOVE_TRACK = 'ADD_OR_REMOVE_TRACK';

export const startTracking = () => ({
  type: MAP_TRACKING_START,
});

export const stopTracking = () => ({
  type: MAP_TRACKING_STOP,
});

export const updateLocation = coords => ({
  type: MAP_TRACKING_UPDATE,
  coords,
});

export const setCurrentLocation = coords => ({
  type: MAP_CURRENT_LOCATION,
  coords,
});

export const createTrack = () => ({
  type: MAP_TRACKING_CREATE,
});

export const mapDetailsInputChange = change => ({
  type: MAP_INPUT_CHANGE,
  change,
});

export const addOrRemoveTrack = track => ({
  type: ADD_OR_REMOVE_TRACK,
  track,
});

export const loadPath = () => ({
  type: LOAD_MAP_TRACKS,
});
