import {
    CLEAR_CREATE_ERRORS,
    CLEAR_GALLERY,
    CREATE_GALLERY_FAILURE,
    CREATE_GALLERY_REQUEST,
    CREATE_GALLERY_SUCCESS,
    DELETE_GALLERY_FAILURE,
    DELETE_GALLERY_REQUEST,
    DELETE_GALLERY_SUCCESS,
    FETCH_GALLERIES_FAILURE,
    FETCH_GALLERIES_REQUEST,
    FETCH_GALLERIES_SUCCESS,
    FETCH_GALLERY_FAILURE,
    FETCH_GALLERY_REQUEST,
    FETCH_GALLERY_SUCCESS,
    FETCH_MY_GALLERIES_FAILURE,
    FETCH_MY_GALLERIES_REQUEST,
    FETCH_MY_GALLERIES_SUCCESS, GET_LINK_GALLERY_FAILURE, GET_LINK_GALLERY_REQUEST, GET_LINK_GALLERY_SUCCESS,
    PUBLISH_GALLERY_FAILURE,
    PUBLISH_GALLERY_REQUEST,
    PUBLISH_GALLERY_SUCCESS
} from "../actions/galleryActions";

const initialState = {
    galleries: [],
    gallery: null,
    myGalleries: [],
    link: null,
    fetchGalleriesLoading: false,
    fetchGalleriesError: null,
    fetchGalleryLoading: false,
    fetchGalleryError: null,
    createLoading: false,
    createError: null,
    deleteLoading: false,
    deleteError: null,
    publishLoading: false,
    publishError: null,
};

const galleriesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_GALLERIES_REQUEST:
            return {...state, fetchGalleriesLoading: true, fetchGalleriesError: null};
        case FETCH_GALLERIES_SUCCESS:
            return {...state, fetchGalleriesLoading: false, galleries: actions.payload};
        case FETCH_GALLERIES_FAILURE:
            return {...state, fetchGalleriesLoading: false, fetchGalleriesError: actions.payload};

        case FETCH_MY_GALLERIES_REQUEST:
            return {...state, fetchGalleriesLoading: true, fetchGalleriesError: null};
        case FETCH_MY_GALLERIES_SUCCESS:
            return {...state, fetchGalleriesLoading: false, myGalleries: actions.payload};
        case FETCH_MY_GALLERIES_FAILURE:
            return {...state, fetchGalleriesLoading: false, fetchGalleriesError: actions.payload};

        case FETCH_GALLERY_REQUEST:
            return {...state, fetchGalleryLoading: true, fetchGalleryError: null};
        case FETCH_GALLERY_SUCCESS:
            return {...state, fetchGalleryLoading: false, gallery: actions.payload};
        case FETCH_GALLERY_FAILURE:
            return {...state, fetchGalleryLoading: false, fetchGalleryError: actions.payload};

        case CREATE_GALLERY_REQUEST:
            return {...state, createLoading: true, createError: null};
        case CREATE_GALLERY_SUCCESS:
            return {...state, createLoading: false};
        case CREATE_GALLERY_FAILURE:
            return {...state, createLoading: false, createError: actions.payload};

        case DELETE_GALLERY_REQUEST:
            return {...state, deleteLoading: true, deleteError: null};
        case DELETE_GALLERY_SUCCESS:
            return {...state, deleteLoading: false};
        case DELETE_GALLERY_FAILURE:
            return {...state, deleteLoading: false, deleteError: actions.payload};

        case PUBLISH_GALLERY_REQUEST:
            return {...state, publishLoading: true, publishError: null};
        case PUBLISH_GALLERY_SUCCESS:
            return {...state, publishLoading: false};
        case PUBLISH_GALLERY_FAILURE:
            return {...state, publishLoading: false, publishError: actions.payload};

        case GET_LINK_GALLERY_REQUEST:
            return {...state, publishLoading: true, publishError: null};
        case GET_LINK_GALLERY_SUCCESS:
            return {...state, publishLoading: false, link: actions.payload};
        case GET_LINK_GALLERY_FAILURE:
            return {...state, publishLoading: false, publishError: actions.payload};

        case CLEAR_CREATE_ERRORS:
            return {...state, createError: null};
        case CLEAR_GALLERY:
            return {...state, gallery: null};

        default:
            return state;
    }
};

export default galleriesReducer;