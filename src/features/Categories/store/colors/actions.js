import * as types from './actionTypes';

export const setColors = (payload) => ({ type: types.SET_COLORS, payload });
export const addColor = (payload) => ({ type: types.ADD_COLOR, payload });
export const deleteColor = (payload) => ({ type: types.DELETE_COLOR, payload });
export const setColorStatus = (payload) => ({ type: types.SET_COLOR_STATUS, payload });