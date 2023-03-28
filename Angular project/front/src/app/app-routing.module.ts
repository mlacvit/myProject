import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {EditComponent} from "./edit/edit.component";
import {MusicComponent} from "./music/music.component";
import {NewalbumComponent} from "./newalbum/newalbum.component";
import { AlbumComponent } from './album/album.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'albums', component: AlbumComponent},
  {path: 'edit', component: EditComponent},
  {path: 'newalbom', component: NewalbumComponent},
  {path: ':id', component: MusicComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
