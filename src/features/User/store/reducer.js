import * as types from './actionTypes';

const initialState = {
    // currentUserId: "8DpXB5zetdSrngBnTQIr",
    currentUserId: "",
    userStatus: "init"
};

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.SET_CURRENT_USER_ID:
            return { ...state, currentUserId: payload };
        case types.SET_USER_STATUS:
            return { ...state, userStatus: payload };
        case types.RESET_USER:
            return { ...state, userStatus: "init", currentUserId: "" };
        default:
            return state;
    }
}