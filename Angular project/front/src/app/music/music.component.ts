import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MusicService} from "../music.service";
import {MusicModel} from "../music.model";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.sass']
})
export class MusicComponent implements OnInit {
  id = '';
  music: MusicModel | null = null;
  constructor(private route: ActivatedRoute, private service: MusicService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.service.geMusicOne(this.id).subscribe((one) => {
        this.music = one;
      });
    });
  }

}
