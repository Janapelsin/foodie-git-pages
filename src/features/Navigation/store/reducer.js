import * as types from "./actionTypes";

const initialState = {
    menuActive: false,
    searchActive: false,
    formActive: false,
    currentPage: "groceries"
}

export default function navigationReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.TOGGLE_FORM:
            return { ...state, formActive: !state.formActive, searchActive: false };
        case types.TOGGLE_SEARCH:
            return { ...state, searchActive: !state.searchActive, formActive: false };
        case types.TOGGLE_MENU:
            return { ...state, menuActive: !state.menuActive };
        case types.SET_CURRENT_PAGE:
            return { ...state, currentPage: payload, formActive: false, searchActive: false };
        case types.RESET_NAVIGATION:
            return initialState;
        default:
            return state;
    }
}