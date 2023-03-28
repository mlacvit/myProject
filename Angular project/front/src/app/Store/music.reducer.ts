import { createReducer, on } from '@ngrx/store';
import {
  createMusicFai,
  createMusicReq,
  createMusicSuc,
  fetchMusicFail,
  fetchMusicReq,
  fetchMusicSusses
} from './music.actions';
import {  MusicState } from './types';

const initialState: MusicState = {
  music: [],
  loading: false,
  fError: null,
  createLoading: false,
  createError: null,
};

export const musicReducer = createReducer(
  initialState,
  on(fetchMusicReq, state => ({...state, loading: true})),
  on(fetchMusicSusses, (state, {music}) => ({
    ...state,
    loading: false,
    music
  })),
  on(fetchMusicFail, (state, {error}) => ({
    ...state,
    loading: false,
    fError: error
  })),
  on(createMusicReq, state => ({...state, createLoading: true})),
  on(createMusicSuc, state => ({...state, createLoading: false})),
  on(createMusicFai, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),
);

