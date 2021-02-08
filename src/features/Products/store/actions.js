import * as types from './actionTypes';
import firebase from 'firebase/app';
import "firebase/firestore";
import { ADD_START, ADD_FAILED, ADD_SUCCESS, DELETE_SUCCESS, DELETE_FAILED, DELETE_START } from '../../../store/statusTypes';

export const setProducts = (payload) => ({ type: types.SET_PRODUCTS, payload });
export const addProduct = (payload) => ({ type: types.ADD_PRODUCT, payload });
export const deleteProduct = (payload) => ({ type: types.DELETE_PRODUCT, payload });
export const setProductStatus = (payload) => ({ type: types.SET_PRODUCT_STATUS, payload });

export const addProductAsync = (product, currentUserId) => async dispatch => {
    const batch = firebase.firestore().batch();
    const userRef = firebase.firestore().collection("users").doc(currentUserId);

    const productRef = userRef.collection("products").doc();
    productRef.set(product);

    const categoryRef = userRef.collection("categories").doc(product.category.id);
    categoryRef.update({ productCount: firebase.firestore.FieldValue.increment(1) });

    dispatch(setProductStatus(ADD_START))

    batch.commit()
        .then(() => dispatch(setProductStatus(ADD_SUCCESS)))
        .catch(err => {
            dispatch(setProductStatus(ADD_FAILED));
            console.error(err);
        });
}

export const deleteProductAsync = (product, currentUserId) => async dispatch => {
    const batch = firebase.firestore().batch();
    const userRef = firebase.firestore().collection("users").doc(currentUserId);

    const productRef = userRef.collection("products").doc(product.id);
    productRef.delete();

    const categoryRef = userRef.collection("categories").doc(product.categoryId);
    categoryRef.update({ productCount: firebase.firestore.FieldValue.increment(-1) });

    dispatch(setProductStatus(DELETE_START))

    batch.commit()
        .then(() => dispatch(setProductStatus(DELETE_SUCCESS)))
        .catch(err => {
            dispatch(setProductStatus(DELETE_FAILED));
            console.error(err);
        });
}
