import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MusicData} from "../music.model";
import { Store } from '@ngrx/store';
import { AppState } from '../Store/types';
import { createMusicReq } from '../Store/music.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.music.createLoading);
    this.error = store.select(state => state.music.createError);
  }

  ngOnInit(): void {

  }
  onSub() {
    const musicData: MusicData = this.form.value;
   this.store.dispatch(createMusicReq({musicData}));
  }

}
