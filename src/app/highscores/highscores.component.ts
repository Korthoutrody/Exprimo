import { Component, OnInit } from '@angular/core';
import {SentenceService} from '../game/services/sentence.service';
import {ScoreService, UserService} from '../_services';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {
  private highscoresArray = [];
  private info;

  constructor(private scoreService: ScoreService) {
  }

  ngOnInit() {
    this.ShowHighscores();
  }

  ShowHighscores(): void {
    this.scoreService.getAll().subscribe( info => this.info = info);

    console.log(this.info);
  }
}

