import { MusicModel } from '../music.model';

export type MusicState = {
  music: MusicModel[],
  loading: boolean,
  fError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type AppState = {
  music: MusicState
}
