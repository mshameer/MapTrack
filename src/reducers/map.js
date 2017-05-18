import {
    MAP_TRACKING_START,
    MAP_TRACKING_UPDATE,
    MAP_CURRENT_LOCATION,
    MAP_TRACKING_CREATE_SUCCESS,
} from "actions/map";

const initialState = {
    tracking: false,
    path: [],
    errors: {},
    defaultLocation:{ lat: 0, lng: 0 }
};

export default (state=initialState, action={}) => {
    switch (action.type) {
        case MAP_TRACKING_START:
            return { ...state, tracking: true, errors: {} };
        case MAP_CURRENT_LOCATION:
            return { ...state, defaultLocation: { lat: action.coords.latitude, lng: action.coords.longitude }, errors: {} };

        case MAP_TRACKING_UPDATE:
            const path = state.path;
            path.push({ lat: action.coords.latitude, lng: action.coords.longitude })
            return { ...state, path, tracking: true, errors: {} };
        case MAP_TRACKING_CREATE_SUCCESS:
            return { ...state, tracking: false, errors: {} };
        default: return state;
    }
};
