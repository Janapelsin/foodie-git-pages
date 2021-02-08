import * as types from "./actionTypes"

const initialState = {
    products: [],
    productStatus: "INIT"
}

export default function productReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.SET_PRODUCTS:
            return { ...state, products: payload };
        case types.ADD_PRODUCT:
            return { ...state, products: [payload, ...state.products] };
        case types.DELETE_PRODUCT:
            return { ...state, products: state.products.filter(c => c.id !== payload) };
        case types.SET_PRODUCT_STATUS:
            return { ...state, productStatus: payload };
        default:
            return state;
    }
}