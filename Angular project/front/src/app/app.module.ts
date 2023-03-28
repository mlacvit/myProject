import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { MusicComponent } from './music/music.component';
import { EditComponent } from './edit/edit.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FileInputComponent} from "./edit/file-input/file-input.component";
import {MatButtonModule} from "@angular/material/button";
import { LayoutComponent } from './ui/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NewalbumComponent } from './newalbum/newalbum.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { AlbumComponent } from './album/album.component';
import { musicReducer } from './Store/music.reducer';
import { MusicEffects } from './Store/music.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MusicComponent,
    EditComponent,
    FileInputComponent,
    LayoutComponent,
    NewalbumComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    EffectsModule.forRoot([MusicEffects]),
    StoreModule.forRoot({music: musicReducer}, {}),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
