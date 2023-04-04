import axiosApi from "../../axiosApi";

export const GET_NEWS_REQUEST = 'GET_NEWS_REQUEST';
export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';
export const GET_NEWS_FAILURE = 'GET_NEWS_FAILURE';

export const GET_ONE_NEWS_REQUEST = 'GET_ONE_NEWS_REQUEST';
export const GET_ONE_NEWS_SUCCESS = 'GET_ONE_NEWS_SUCCESS';
export const GET_ONE_NEWS_FAILURE = 'GET_ONE_NEWS_FAILURE';

export const POST_NEWS_REQUEST = 'POST_NEWS_REQUEST';
export const POST_NEWS_SUCCESS = 'POST_NEWS_SUCCESS';
export const POST_NEWS_FAILURE = 'POST_NEWS_FAILURE';

export const DELETE_NEWS_REQUEST = 'DELETE_NEWS_REQUEST';
export const DELETE_NEWS_SUCCESS = 'DELETE_NEWS_SUCCESS';
export const DELETE_NEWS_FAILURE = 'DELETE_NEWS_FAILURE';

export const getNewsRequest = () => ({type: GET_NEWS_REQUEST});
export const getNewsSuccess = data => ({type: GET_NEWS_SUCCESS, payload: data});
export const getNewsFailure = error => ({type: GET_NEWS_FAILURE, payload: error});

export const getOneNewsRequest = () => ({type: GET_ONE_NEWS_REQUEST});
export const getOneNewsSuccess = data => ({type: GET_ONE_NEWS_SUCCESS, payload: data});
export const getOneNewsFailure = error => ({type: GET_ONE_NEWS_FAILURE, payload: error});

const postNewsRequest = () => ({type: POST_NEWS_REQUEST});
const postNewsSuccess = () => ({type: POST_NEWS_SUCCESS});
const postNewsFailure = error => ({type: POST_NEWS_FAILURE, payload: error});

const deleteNewsRequest = () => ({type: DELETE_NEWS_REQUEST});
const deleteNewsSuccess = () => ({type: DELETE_NEWS_SUCCESS});
const deleteNewsFailure = error => ({type: DELETE_NEWS_FAILURE, payload: error});

export const getNewsData = () => {
    return async dispatch => {
        try{
            dispatch(getNewsRequest());
            const response = await axiosApi('/news_go');
            dispatch(getNewsSuccess(response.data));
        } catch (error){
            dispatch(getNewsFailure(error));
        }
    };
};

export const getOneNewsData = id => {
    return async dispatch => {
        try{
            dispatch(getOneNewsRequest());
            const response = await axiosApi('/news_go/' + id);
            dispatch(getOneNewsSuccess(response.data));
        } catch (error){
            dispatch(getOneNewsFailure(error));
        }
    };
};

export const postNewsData = data => {
    return async dispatch => {
        try {
            dispatch(postNewsRequest());
            await axiosApi.post('/news_go', data);
            dispatch(postNewsSuccess());
        } catch (e) {
            dispatch(postNewsFailure(e.message));
            throw e;
        }
    };
};

export const deleteNewsData = id => {
    return async dispatch => {
        try {
            dispatch(deleteNewsRequest());
            await axiosApi.delete('/news_go/' + id);
            dispatch(deleteNewsSuccess());
        } catch (e) {
            dispatch(deleteNewsFailure(e.message));
            throw e;
        }
    };
};