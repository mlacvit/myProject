import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ApiMusicData, MusicData, MusicModel } from './music.model';

import { AlbumData, AlbumModel } from './album.model';
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  music: MusicModel[] | null = null;
  musChange = new Subject<MusicModel[]>();
  albums: AlbumModel[] | null = null;
  albumChange = new Subject<AlbumModel[]>();
  fetching = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  createMusic(value: MusicData) {
    const formData = new FormData();
    Object.keys(value).forEach(key => {
      if (value[key] !== null) {
        formData.append(key, value[key]);
      }
    });
    return this.http.post('http://localhost:8000/musbase', formData);
  };

  createAlbums(AlbumData: AlbumData) {
    const formData = new FormData();
    Object.keys(AlbumData).forEach(key => {
      if (AlbumData[key] !== null) {
        formData.append(key, AlbumData[key]);
      }
    });
    return this.http.post('http://localhost:8000/album', formData);
  };


  getMusic() {
    this.fetching.next(true);
    return this.http.get<ApiMusicData[]>('http://localhost:8000/musbase').pipe(
      map(response => {
        return response.map(mus => {
          return new MusicModel(
            mus._id,
            mus.artist,
            mus.description,
            mus.image,
          );
        });
      })
    );
  }

  geMusicOne(id: string) {
    return this.http.get<MusicModel>(`http://localhost:8000/musbase/${id}`).pipe(
      map(result => {
        return new MusicModel(
          result._id,
          result.artist,
          result.description,
          result.image,
        )
      })
    )
  }

  getAlbums(){
    return this.http.get<AlbumModel[]>(`http://localhost:8000/album`).pipe(
      map(response => {
        return response.map(alb => {
          return new AlbumModel(
            alb._id,
            alb.title,
            alb.artist,
            alb.year,
            alb.image,
          )
        });
      })
    ).subscribe({
      next: result => {
        this.albums = result;
        this.albumChange.next(this.albums.slice());
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
