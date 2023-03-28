export class AlbumModel {
  constructor(
    public _id: string,
    public title: string,
    public artist: string,
    public year: string,
    public image: string,
  ) {}
}


export interface AlbumData {
  [key: string]: any;
  title: string;
  artist: string;
  year: string;
  image: File | null;
}
