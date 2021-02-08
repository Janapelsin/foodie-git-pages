import * as types from './actionTypes';

export const setCurrentUserId = (payload) => ({ type: types.SET_CURRENT_USER_ID, payload });
export const setUserStatus = (payload) => ({ type: types.SET_USER_STATUS, payload });
export const resetUser = () => ({ type: types.RESET_USER });