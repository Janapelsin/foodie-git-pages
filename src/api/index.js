import { useEffect } from 'react'
import useListener from './useListener';
import { categoryConverter } from './converters/category';
import { colorConverter } from './converters/color';
import { productConverter } from './converters/product';
import { groceryConverter } from './converters/grocery';
import firebase from 'firebase/app';
import { firebaseConfig } from './config';

export default function useFirebase(currentUserId) {
    const categoryListener = useListener("categories");
    const groceryListener = useListener("groceries");
    const productListener = useListener("products");
    const colorListener = useListener("colors");

    const cancelListeners = () => {
        categoryListener.cancel();
        colorListener.cancel();
        productListener.cancel();
        groceryListener.cancel();
    }

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        if (!currentUserId) {
            cancelListeners();
            return;
        };

        if (!categoryListener.isActive) {
            categoryListener.listen(categoryConverter, getActionTypes("categories"), ["name", "desc"]);
        }
        if (!colorListener.isActive) {
            colorListener.listen(colorConverter, getActionTypes("colors"), null, ["available", "==", true])
        }
        if (!productListener.isActive) {
            productListener.listen(productConverter, getActionTypes("products"), ["name", "desc"]);
        }
        if (!groceryListener.isActive) {
            groceryListener.listen(groceryConverter, getActionTypes("groceries", ["name", "desc"]));
        }

        return () => cancelListeners();
    }, [currentUserId])
}

function getActionTypes(collection) {
    switch (collection) {
        case "categories":
            return { SET: "SET_CATEGORIES", ADD: "ADD_CATEGORY", UPDATE: "UPDATE_CATEGORY", DELETE: "DELETE_CATEGORY", SET_STATUS: "SET_CATEGORY_STATUS" }
        case "products":
            return { SET: "SET_PRODUCTS", ADD: "ADD_PRODUCT", DELETE: "DELETE_PRODUCT", SET_STATUS: "SET_PRODUCT_STATUS" }
        case "colors":
            return { SET: "SET_COLORS", ADD: "ADD_COLOR", DELETE: "DELETE_COLOR", SET_STATUS: "SET_COLOR_STATUS" }
        case "groceries":
            return { SET: "SET_GROCERIES", ADD: "ADD_GROCERY", DELETE: "DELETE_GROCERY", SET_STATUS: "SET_GROCERY_STATUS" }
        default:
            return null;
    }
}