import * as types from "./actionTypes"

const initialState = {
    colors: [],
    colorStatus: ""
}

export default function colorReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.SET_COLORS:
            return { ...state, colors: payload };
        case types.ADD_COLOR:
            return { ...state, colors: [payload, ...state.colors] };
        case types.DELETE_COLOR:
            return { ...state, colors: state.colors.filter(a => a.id !== payload) };
        case types.SET_COLOR_STATUS:
            return { ...state, colorStatus: payload };
        default:
            return state;
    }
}