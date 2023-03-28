import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MusicService } from '../music.service';
import {
  createMusicFai,
  createMusicReq,
  createMusicSuc,
  fetchMusicFail,
  fetchMusicReq,
  fetchMusicSusses
} from './music.actions';
import { catchError, mergeMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class MusicEffects {
  fetchMusic = createEffect(() => this.actions.pipe(
    ofType(fetchMusicReq),
    mergeMap(() => this.service.getMusic().pipe(
      map(music => fetchMusicSusses({music})),
      catchError(() => of(fetchMusicFail({
        error: 'Something went wrong'
      })))
    ))
  ));

  createMusic = createEffect(() => this.actions.pipe(
    ofType(createMusicReq),
    mergeMap(({musicData}) => this.service.createMusic(musicData).pipe(
      map(() => createMusicSuc()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createMusicFai({error: 'wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private service: MusicService,
    private router: Router
  ) {}
}
