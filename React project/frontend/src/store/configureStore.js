import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import AxiosApi from "../axiosApi";
import userReducer, {initialState} from "./reducers/userReducer";
import galleriesReducer from "./reducers/galleriesReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    users: userReducer,
    galleries: galleriesReducer,
});

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            ...initialState,
            user: store.getState().users.user,
        }
    });
});

AxiosApi.interceptors.request.use(config => {
   try {
    config.headers['Authorization'] = store.getState().users.user.token;
   }
   catch (e) {}
    return config;
});

AxiosApi.interceptors.response.use(res => res, e => {
    if (!e.response.data) e.response = {data: {global: 'No internet'}};
    throw e;
});

export default store;