import { createStore, combineReducers } from "redux";
import menu from "./modules/menu";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const rootReducer = combineReducers({ menu });

const store = createStore(rootReducer);

export default store;
