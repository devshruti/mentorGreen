// reducers.js

import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
} from './actionTypes';

const initialState = {
    isLoading: false,
    Register: [],
    Login: [],
    user: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                Register: [...state.Register, action.payload],
                user: action.payload,
                isLoading: false,
                error: null,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                Login: [...state.Login, action.payload],
                user: action.payload,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: null,
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export { reducer };
