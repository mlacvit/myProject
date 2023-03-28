import { createAction, props } from '@ngrx/store';
import { MusicData, MusicModel } from '../music.model';

export const fetchMusicReq = createAction('[Music] Fetch Req');
export const fetchMusicSusses = createAction(
  '[Music] Fetch susses',
  props<{music: MusicModel[]}>()
);
export const fetchMusicFail = createAction(
  '[Music] Fetch Fail',
  props<{error: string}>()
  );

export const createMusicReq = createAction(
  '[music] create request',
  props<{musicData: MusicData}>()
);
export const createMusicSuc = createAction(
  '[music] create susses'

);
export const createMusicFai = createAction(
  '[music] create failure',
  props<{error: string}>()
);
