import axiosApi from "../../axiosApi";
import {historyPush} from "./historyBrowser";
import {toast} from "react-toastify";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const CLEAR_REGISTER_ERRORS = 'CLEAR_REGISTER_ERRORS';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

export const LOGOUT_USER = 'LOGOUT_USER';

const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
const registerUserSuccess = data => ({type: REGISTER_USER_SUCCESS, payload: data});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, payload: error});

const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
const loginUserSuccess = data => ({type: LOGIN_USER_SUCCESS, payload: data});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});
export const clearRegisterErrors = () => ({type: CLEAR_REGISTER_ERRORS});
export const clearLoginErrors = () => ({type: CLEAR_LOGIN_ERRORS});

export const registerUser = user => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());

            const response = await axiosApi.post('/users', user);

            dispatch(registerUserSuccess(response.data));
            dispatch(historyPush('/'));
            toast.success('Register successful!', {
                position: "bottom-left",
                autoClose: 1500,
                closeOnClick: true,
                theme: 'dark'
            });
        } catch (e) {
            dispatch(registerUserFailure(e.response.data));
        }
    };
};

export const loginUserData = user => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());

            const response = await axiosApi.post('/users/sessions', user);

            dispatch(loginUserSuccess(response.data));
            dispatch(historyPush('/'));
            toast.success('Login successful!', {
                position: "bottom-left",
                autoClose: 1500,
                closeOnClick: true,
                theme: 'dark'
            });
        } catch (e) {
            dispatch(loginUserFailure(e.response.data));
        }
    };
};

export const facebookLoginData = data => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());

            const response = await axiosApi.post('/users/facebookLogin', data);

            dispatch(loginUserSuccess(response.data));
            dispatch(historyPush('/'));
            toast.success('Login successful!', {
                position: "bottom-left",
                autoClose: 1500,
                closeOnClick: true,
                theme: 'dark'
            });
        } catch (e) {
            dispatch(loginUserFailure(e.response.data));
        }
    };
};

export const logoutUser = () => {
    return async dispatch => {
        try {
            await axiosApi.delete('/users/sessions');
            dispatch({type: LOGOUT_USER});
            toast.info('Logout successful!!', {
                position: "bottom-left",
                autoClose: 1500,
                closeOnClick: true,
                theme: 'dark'
            });
        } catch (e) {
            console.error(e.message)
        }
    }
};