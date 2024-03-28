// actions.js

import axios from 'axios';
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

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const response = await axios.post(`${process.env.React_App_Baseurl}/user/register`, userData);
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
        return response
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const response = await axios.post(`${process.env.React_App_Baseurl}/user/login`, userData);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        return response
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });

    try {
        await axios.post(`${process.env.React_App_Baseurl}/user/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAILURE, payload: error.message });
    }
};
