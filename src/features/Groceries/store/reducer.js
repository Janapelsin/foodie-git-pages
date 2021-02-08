import * as types from "./actionTypes"

const initialState = {
    groceries: [],
    groceryStatus: ""
}

export default function groceryReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.SET_GROCERIES:
            return { ...state, groceries: payload };
        case types.ADD_GROCERY:
            return { ...state, groceries: [payload, ...state.groceries] };
        case types.DELETE_GROCERY:
            return { ...state, groceries: state.groceries.filter(c => c.id !== payload) };
        case types.SET_GROCERY_STATUS:
            return { ...state, groceryStatus: payload };
        default:
            return state;
    }
}