import axiosApi from "../../axiosApi";
import {historyPush} from "./historyBrowser";
import {toast} from "react-toastify";

export const FETCH_GALLERIES_REQUEST = 'FETCH_GALLERIES_REQUEST';
export const FETCH_GALLERIES_SUCCESS = 'FETCH_GALLERIES_SUCCESS';
export const FETCH_GALLERIES_FAILURE = 'FETCH_GALLERIES_FAILURE';

export const FETCH_MY_GALLERIES_REQUEST = 'FETCH_MY_GALLERIES_REQUEST';
export const FETCH_MY_GALLERIES_SUCCESS = 'FETCH_MY_GALLERIES_SUCCESS';
export const FETCH_MY_GALLERIES_FAILURE = 'FETCH_MY_GALLERIES_FAILURE';

export const FETCH_GALLERY_REQUEST = 'FETCH_GALLERY_REQUEST';
export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS';
export const FETCH_GALLERY_FAILURE = 'FETCH_GALLERY_FAILURE';

export const CREATE_GALLERY_REQUEST = 'CREATE_GALLERY_REQUEST';
export const CREATE_GALLERY_SUCCESS = 'CREATE_GALLERY_SUCCESS';
export const CREATE_GALLERY_FAILURE = 'CREATE_GALLERY_FAILURE';

export const CLEAR_CREATE_ERRORS = 'CLEAR_CREATE_ERRORS';

export const DELETE_GALLERY_REQUEST = 'DELETE_GALLERY_REQUEST';
export const DELETE_GALLERY_SUCCESS = 'DELETE_GALLERY_SUCCESS';
export const DELETE_GALLERY_FAILURE = 'DELETE_GALLERY_FAILURE';

export const PUBLISH_GALLERY_REQUEST = 'PUBLISH_GALLERY_REQUEST';
export const PUBLISH_GALLERY_SUCCESS = 'PUBLISH_GALLERY_SUCCESS';
export const PUBLISH_GALLERY_FAILURE = 'PUBLISH_GALLERY_FAILURE';

export const GET_LINK_GALLERY_REQUEST = 'GET_LINK_GALLERY_REQUEST';
export const GET_LINK_GALLERY_SUCCESS = 'GET_LINK_GALLERY_SUCCESS';
export const GET_LINK_GALLERY_FAILURE = 'GET_LINK_GALLERY_FAILURE';

export const CLEAR_GALLERY = 'CLEAR_GALLERY';

const fetchGalleriesRequest = () => ({type: FETCH_GALLERIES_REQUEST});
const fetchGalleriesSuccess = galleries => ({type: FETCH_GALLERIES_SUCCESS, payload: galleries});
const fetchGalleriesFailure = error => ({type: FETCH_GALLERIES_FAILURE, payload: error});

const fetchMyGalleriesRequest = () => ({type: FETCH_MY_GALLERIES_REQUEST});
const fetchMyGalleriesSuccess = galleries => ({type: FETCH_MY_GALLERIES_SUCCESS, payload: galleries});
const fetchMyGalleriesFailure = error => ({type: FETCH_MY_GALLERIES_FAILURE, payload: error});

const fetchGalleryRequest = () => ({type: FETCH_GALLERY_REQUEST});
const fetchGallerySuccess = cocktail => ({type: FETCH_GALLERY_SUCCESS, payload: cocktail});
const fetchGalleryFailure = error => ({type: FETCH_GALLERY_FAILURE, payload: error});

const createGalleryRequest = () => ({type: CREATE_GALLERY_REQUEST});
const createGallerySuccess = () => ({type: CREATE_GALLERY_SUCCESS});
const createGalleryFailure = error => ({type: CREATE_GALLERY_FAILURE, payload: error});

export const clearCreateErrors = () => ({type: CLEAR_CREATE_ERRORS});

const deleteGalleryRequest = () => ({type: DELETE_GALLERY_REQUEST});
const deleteGallerySuccess = () => ({type: DELETE_GALLERY_SUCCESS});
const deleteGalleryFailure = error => ({type: DELETE_GALLERY_FAILURE, payload: error});

const publishGalleryRequest = () => ({type: PUBLISH_GALLERY_REQUEST});
const publishGallerySuccess = () => ({type: PUBLISH_GALLERY_SUCCESS});
const publishGalleryFailure = error => ({type: PUBLISH_GALLERY_FAILURE, payload: error});

const getLinkGalleryRequest = () => ({type: GET_LINK_GALLERY_REQUEST});
const LinkGallerySuccess = data => ({type: GET_LINK_GALLERY_SUCCESS, payload: data});
const LinkGalleryFailure = error => ({type: GET_LINK_GALLERY_FAILURE, payload: error});

export const clearGallery = () => ({type: CLEAR_GALLERY});

export const fetchGalleriesData = () => {
    return async dispatch => {
        try {
            dispatch(fetchGalleriesRequest());

            const response = await axiosApi('/galleries');

            dispatch(fetchGalleriesSuccess(response.data));
        } catch (e) {
            dispatch(fetchGalleriesFailure(e.message));
        }
    }
};

export const fetchMyGalleriesData = id => {
    return async dispatch => {
        try {
            dispatch(fetchMyGalleriesRequest());

            const response = await axiosApi('/galleries?gallery=' + id );

            dispatch(fetchMyGalleriesSuccess(response.data));
        } catch (e) {
            dispatch(fetchMyGalleriesFailure(e.message));
        }
    }
};

export const fetchGalleryByIdData = id => {
    return async dispatch => {
        try {
            dispatch(fetchGalleryRequest());

            const response = await axiosApi('/galleries/' + id);

            dispatch(fetchGallerySuccess(response.data));
        } catch (e) {
            dispatch(fetchGalleryFailure(e.message));
        }
    }
};

export const createGalleryData = data => {
    return async (dispatch) => {
        try {
            dispatch(createGalleryRequest());

            await axiosApi.post('/galleries', data);

            dispatch(createGallerySuccess());
            dispatch(historyPush('/'));

            toast.success('Your request to add gallery has been sent successfully!', {
                position: "bottom-left",
                autoClose: 1500,
                closeOnClick: true,
                theme: 'dark'
            });
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createGalleryFailure(e.response.data));
            } else {
                dispatch(createGalleryFailure({global: 'No internet'}));
            }
        }
    }
};
export const deleteGalleryData = id => {
    return async dispatch => {
        try {
            dispatch(deleteGalleryRequest());

            await axiosApi.delete('/galleries/' + id);

            dispatch(deleteGallerySuccess());
            dispatch(historyPush('/'));

            toast.success('Deleted successfully!', {
                position: "bottom-left",
                autoClose: 1500,
                closeOnClick: true,
                theme: 'dark'
            });
        } catch (e) {
            dispatch(deleteGalleryFailure(e.message));
        }
    }
};

export const publishGalleryData = id => {
    return async dispatch => {
        try {
            dispatch(publishGalleryRequest());

            await axiosApi.post('/galleries/' + id + '/publish');

            dispatch(publishGallerySuccess());
            dispatch(historyPush('/'));

            toast.success('Published successfully!', {
                position: "bottom-left",
                autoClose: 1500,
                closeOnClick: true,
                theme: 'dark'
            });
        } catch (e) {
            dispatch(publishGalleryFailure(e.message));
        }
    }
};

export const getLinkGalleryData = id => {
    return async dispatch => {
        try {
            dispatch(getLinkGalleryRequest());

            const response = await axiosApi('/galleries?link=' + id );

            dispatch(LinkGallerySuccess(response.data));
        } catch (e) {
            dispatch(LinkGalleryFailure(e.message));
        }
    }
};