import axiosApi from "../../axiosApi";

export const GET_COMMENT_REQUEST = 'GET_COMMENT_REQUEST';
export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS';
export const GET_COMMENT_FAILURE = 'GET_COMMENT_FAILURE';

export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const getCommentRequest = () => ({type: GET_COMMENT_REQUEST});
export const getCommentSuccess = data => ({type: GET_COMMENT_SUCCESS, payload: data});
export const getCommentFailure = error => ({type: GET_COMMENT_FAILURE, payload: error});

const postCommentRequest = () => ({type: POST_COMMENT_REQUEST});
const postCommentSuccess = () => ({type: POST_COMMENT_SUCCESS});
const postCommentFailure = error => ({type: POST_COMMENT_FAILURE, payload: error});

const deleteCommentRequest = () => ({type: DELETE_COMMENT_REQUEST});
const deleteCommentSuccess = () => ({type: DELETE_COMMENT_SUCCESS});
const deleteCommentFailure = error => ({type: DELETE_COMMENT_FAILURE, payload: error});

export const getCommentData = () => {
    return async dispatch => {
        try{
            dispatch(getCommentRequest());
            const response = await axiosApi('/comments');
            dispatch(getCommentSuccess(response.data));
        } catch (error){
            dispatch(getCommentFailure(error));
        }
    };
};

export const postCommentData = data => {
    return async dispatch => {
        try {
            dispatch(postCommentRequest());
            await axiosApi.post('/comments', data);
            dispatch(postCommentSuccess());
        } catch (e) {
            dispatch(postCommentFailure(e.message));
            throw e;
        }
    };
};

export const deleteCommentData = id => {
    return async dispatch => {
        try {
            dispatch(deleteCommentRequest());
            await axiosApi.delete('/comments/' + id);
            dispatch(deleteCommentSuccess());
        } catch (e) {
            dispatch(deleteCommentFailure(e.message));
            throw e;
        }
    };
};