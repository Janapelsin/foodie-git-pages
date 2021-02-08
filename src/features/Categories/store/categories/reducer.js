import * as types from "./actionTypes"

const initialState = {
    categories: [],
    categoryStatus: ""
}

export default function categoryReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.SET_CATEGORIES:
            return { ...state, categories: payload };
        case types.ADD_CATEGORY:
            return { ...state, categories: [payload, ...state.categories] };
        case types.UPDATE_CATEGORY:
            return {
                ...state,
                categories: state.categories.map(c =>
                    (c.id === payload.id ? Object.assign({}, c, payload) : c)
                )
            }
        case types.DELETE_CATEGORY:
            return { ...state, categories: state.categories.filter(c => c.id !== payload) };
        case types.SET_CATEGORY_STATUS:
            return { ...state, categoryStatus: payload };
        default:
            return state;
    }
}