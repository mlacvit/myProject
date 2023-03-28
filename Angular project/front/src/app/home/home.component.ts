import {Component, OnInit} from '@angular/core';
import {MusicModel} from "../music.model";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/types';
import { fetchMusicReq } from '../Store/music.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  music: Observable<MusicModel[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.music = store.select(state => state.music.music);
    this.loading = store.select(state => state.music.loading);
    this.error = store.select(state => state.music.fError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchMusicReq());
  }

}
