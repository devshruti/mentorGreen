import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as Authreducer } from "../redux/AuthReducer/reducer"
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    Authreducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));