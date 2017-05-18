export const MAP_TRACKING_START = "MAP_TRACKING_START";
export const MAP_TRACKING_UPDATE = "MAP_TRACKING_UPDATE";
export const MAP_CURRENT_LOCATION = "MAP_CURRENT_LOCATION";
export const MAP_TRACKING_CREATE = "MAP_TRACKING_CREATE";
export const MAP_TRACKING_CREATE_SUCCESS = "MAP_TRACKING_CREATE_SUCCESS";

export const startTracking = () => ({
    type: MAP_TRACKING_START,
});

export const updateLocation = (coords) => ({
    type: MAP_TRACKING_UPDATE,
    coords,
});

export const setCurrentLocation = (coords) => ({
    type: MAP_CURRENT_LOCATION,
    coords,
});

export const createTrack = () => ({
    type: MAP_TRACKING_CREATE,
});
