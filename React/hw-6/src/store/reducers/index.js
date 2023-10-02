import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { favoritesReducer } from "./favoritesReducer";

export const rootReducer=combineReducers({
    modal:modalReducer,
    products:productReducer,
    cart:cartReducer,
    favorites:favoritesReducer
})