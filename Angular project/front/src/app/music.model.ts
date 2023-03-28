export class MusicModel {
  constructor(
    public _id: string,
    public artist: string,
    public description: string,
    public image: string,
  ) {}
}


export interface MusicData {
  [key: string]: any;
  artist: string;
  description: string;
  image: File | null;
}

export interface ApiMusicData {
  _id: string,
  artist: string,
  description: string,
  image: string,
}
