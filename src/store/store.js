import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import categoryReducer from '../features/Categories/store/categories/reducer';
import colorReducer from '../features/Categories/store/colors/reducer';
import groceryReducer from '../features/Groceries/store/reducer';
import userReducer from '../features/User/store/reducer';
import navigationReducer from '../features/Navigation/store/reducer';
import productReducer from '../features/Products/store/reducer';

const rootReducer = combineReducers({
    navigation: navigationReducer,
    categories: categoryReducer,
    groceries: groceryReducer,
    products: productReducer,
    colors: colorReducer,
    user: userReducer,
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)