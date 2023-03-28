import {
    CLEAR_LOGIN_ERRORS,
    CLEAR_REGISTER_ERRORS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

export const initialState = {
    user: null,
    registerLoading: false,
    loadingLogin: false,
    registerError: null,
    loginError: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, registerLoading: true};
        case REGISTER_USER_SUCCESS:
            return {...state, registerLoading: false, user: action.payload};
        case REGISTER_USER_FAILURE:
            return {...state, registerLoading: false, registerError: action.payload};
        case LOGIN_USER_REQUEST:
            return {...state, loadingLogin: true};
        case LOGIN_USER_SUCCESS:
            return {...state, loadingLogin: false, user: action.payload};
        case LOGIN_USER_FAILURE:
            return {...state, loadingLogin: false, loginError: action.payload};
        case CLEAR_REGISTER_ERRORS:
            return {...state, registerError: null};
        case CLEAR_LOGIN_ERRORS:
            return {...state, loginError: null};
        case LOGOUT_USER:
            return {...state, user: null};
        default:
            return state;
    }
};

export default usersReducer;