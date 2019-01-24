import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Score } from '../_models/index';

@Injectable()
export class ScoreService {

  private testy;
  constructor(private http: HttpClient) { }

  updateScore(score: Score) {

    return this.http.put(appConfig.apiUrl + '/score/', score);

  }

  getAll() {
    console.log("Getall - App - Service");
    return this.http.get(appConfig.apiUrl + '/score/');

  }

  // getHighscores() {
  //   console.log("At App's Score Service");
  //   return this.http.get(appConfig.apiUrl + '/score/');
  // }

}
