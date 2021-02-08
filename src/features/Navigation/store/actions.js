import * as types from "./actionTypes"

export const toggleMenu = () => ({ type: types.TOGGLE_MENU });
export const toggleForm = () => ({ type: types.TOGGLE_FORM });
export const toggleSearch = () => ({ type: types.TOGGLE_SEARCH });
export const setCurrentPage = (payload) => ({ type: types.SET_CURRENT_PAGE, payload });
export const resetNavigation = () => ({ type: types.RESET_NAVIGATION });