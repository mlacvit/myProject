import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MusicService} from "../music.service";
import {Router} from "@angular/router";
import {AlbumData} from "../album.model";
import {MusicModel} from "../music.model";
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { fetchMusicReq } from '../Store/music.actions';
import { AppState } from '../Store/types';

@Component({
  selector: 'app-newalbum',
  templateUrl: './newalbum.component.html',
  styleUrls: ['./newalbum.component.sass']
})
export class NewalbumComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  artist: Observable<MusicModel[]>;
  changeSub!: Subscription;
  constructor(private service: MusicService, private router: Router, private store: Store<AppState>) {
    this.artist = store.select(state => state.music.music);;
  }

  ngOnInit(): void {
    this.store.dispatch(fetchMusicReq());
  }

  onSubAlbum() {
    const value: AlbumData = this.form.value;
    this.service.createAlbums(value).subscribe(()=>{
      this.service.getAlbums();
      this.router.navigate(['/albums']);
    });
  }

}
