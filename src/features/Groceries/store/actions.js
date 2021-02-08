import {
    ADD_FAILED, ADD_START, ADD_SUCCESS,
    DELETE_FAILED, DELETE_START, DELETE_SUCCESS
} from '../../../store/statusTypes';
import * as types from './actionTypes';
import firebase from 'firebase/app';
import "firebase/firestore";

export const setGroceries = (payload) => ({ type: types.SET_GROCERIES, payload });
export const addGrocery = (payload) => ({ type: types.ADD_GROCERY, payload });
export const deleteGrocery = (payload) => ({ type: types.DELETE_GROCERY, payload });
export const setGroceryStatus = (payload) => ({ type: types.SET_GROCERY_STATUS, payload });

export const addGroceryAsync = (grocery, currentUserId) => async dispatch => {
    const userRef = firebase.firestore().collection("users").doc(currentUserId);
    const groceryRef = userRef.collection("groceries").doc();

    dispatch(setGroceryStatus(ADD_START));

    groceryRef.set(grocery)
        .then(() => dispatch(setGroceryStatus(ADD_SUCCESS)))
        .catch(err => {
            dispatch(setGroceryStatus(ADD_FAILED));
            console.error(err);
        })
}

export const deleteGroceryAsync = (grocery, currentUserId) => async dispatch => {
    const userRef = firebase.firestore().collection("users").doc(currentUserId);
    const groceryRef = userRef.collection("groceries").doc(grocery.id);

    dispatch(setGroceryStatus(DELETE_START));

    groceryRef.delete()
        .then(() => dispatch(setGroceryStatus(DELETE_SUCCESS)))
        .catch(err => {
            dispatch(setGroceryStatus(DELETE_FAILED));
            console.error(err);
        })
}

