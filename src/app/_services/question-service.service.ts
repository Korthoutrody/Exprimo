import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

import { QuestionClass} from '../guessgame/question-class'
import { Questionarray } from '../guessgame/questionarray'

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor() { }

  getQuestion(): Observable<QuestionClass[]> {
    console.log("questions aangeroepen")
    return of( Questionarray);
  }
}
