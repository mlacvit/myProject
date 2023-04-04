import {
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    GET_COMMENT_FAILURE,
    GET_COMMENT_REQUEST,
    GET_COMMENT_SUCCESS,
    POST_COMMENT_FAILURE,
    POST_COMMENT_REQUEST,
    POST_COMMENT_SUCCESS
} from "../actions/commentAction";

const initialState = {
    data: null,
    loading: false,
    error: null
};

const commentReducer = (state = initialState, action) => {
    switch (action.type){
        case POST_COMMENT_REQUEST:
            return {...state, loading: true, error: null};
        case POST_COMMENT_SUCCESS:
            return {...state, loading: false, error: null};
        case POST_COMMENT_FAILURE:
            return {...state, loading: false, error: action.payload};
        case GET_COMMENT_REQUEST:
            return {...state, loading: true, error: null};
        case GET_COMMENT_SUCCESS:
            return {...state, loading: false, error: null, data: action.payload};
        case GET_COMMENT_FAILURE:
            return {...state, loading: false, error: action.payload};
        case DELETE_COMMENT_REQUEST:
            return {...state, loading: true, error: null};
        case DELETE_COMMENT_SUCCESS:
            return {...state, loading: false, error: null};
        case DELETE_COMMENT_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default commentReducer;