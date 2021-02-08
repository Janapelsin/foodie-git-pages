import * as types from './actionTypes';
import firebase from 'firebase/app';
import "firebase/firestore";
import {
    ADD_START, ADD_FAILED, ADD_SUCCESS,
    DELETE_START, DELETE_SUCCESS, DELETE_FAILED
} from '../../../../store/statusTypes';

export const setCategories = (payload) => ({ type: types.SET_CATEGORIES, payload });
export const addCategory = (payload) => ({ type: types.ADD_CATEGORY, payload });
export const updateCategory = (payload) => ({ type: types.UPDATE_CATEGORY, payload });
export const deleteCategory = (payload) => ({ type: types.DELETE_CATEGORY, payload });
export const setCategoryStatus = (payload) => ({ type: types.SET_CATEGORY_STATUS, payload });

// Async actions
export const addCategoryAsync = (category, currentUserId) => async dispatch => {
    const batch = firebase.firestore().batch();
    const userRef = firebase.firestore().collection("users").doc(currentUserId);

    const categoriesRef = userRef.collection("categories").doc();
    batch.set(categoriesRef, category);

    const colorsRef = userRef.collection("colors").doc(category.color.id);
    batch.update(colorsRef, { available: false });

    dispatch(setCategoryStatus(ADD_START));

    batch.commit()
        .then(() => dispatch(setCategoryStatus(ADD_SUCCESS)))
        .catch((err) => {
            dispatch(setCategoryStatus(ADD_FAILED));
            console.error(err)
        })
}

export const deleteCategoryAsync = (category, currentUserId) => async dispatch => {
    if (!category || !currentUserId) return;

    const batch = firebase.firestore().batch();
    const userRef = firebase.firestore().collection("users").doc(currentUserId);

    const categoriesRef = userRef.collection("categories").doc(category.id);
    batch.delete(categoriesRef);

    const colorsRef = userRef.collection("colors").doc(category.colorId);
    batch.update(colorsRef, { available: true });

    dispatch(setCategoryStatus(DELETE_START));

    batch.commit()
        .then(() => dispatch(setCategoryStatus(DELETE_SUCCESS)))
        .catch((err) => {
            dispatch(setCategoryStatus(DELETE_FAILED))
            console.error(err);
            return "Det gick inte att lägga till kategorin"
        })
}

