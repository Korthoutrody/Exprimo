import { Component, OnInit } from '@angular/core';
import { QuestionServiceService} from '../_services/question-service.service'
import { QuestionClass } from '../guessgame/question-class';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Questionarray } from '../guessgame/questionarray';

@Component({
  selector: 'app-guessgame',
  templateUrl: './guessgame.component.html',
  styleUrls: ['./guessgame.component.css']
})
export class GuessgameComponent implements OnInit {

  constructor( private serviceVariable : QuestionServiceService ) {  }

  ngOnInit() {
    this.startGame()
  }

  private questionForm = new FormGroup ({
    questionBox: new FormControl()
 })
 //initialiseer variabelen
  questionArray : QuestionClass[]
  private arrayIncrement = 0
  private correctAnswer : number = 0
  private wrongAnswer : number = 0
  private selectedAnswer: string
  private gameDone = false
  private questionsHad = []
  private gameScore = []
  private minNumber = 0;
  private maxNumber
  private inputClear
  private totalQuestions = 5

  // laad alle vragen uit een bestand (database of class bestand)
  startGame() {
    this.pushQuestionsHad()
    this.getRandomNumber()
    this.getQuestions()
  }
  getRandomNumber() {
    this.maxNumber = this.questionsHad.length - 1
    let randomNumber = Math.floor(Math.random() * (this.maxNumber - this.minNumber))
    this.arrayIncrement = randomNumber
    console.log(this.questionsHad.length)

    return this.arrayIncrement
  }

  getQuestions() {
   
      this.serviceVariable.getQuestion()
        .subscribe( questionaire => this.questionArray = questionaire)
  }

  //functie voor het laden van de volgende vraag, moet het alleen doen als het spel nog bezig is.
  nextQuestion() {
    
  if (this.gameDone == false) {  
      //antwoord goed
      if (this.selectedAnswer == this.questionArray[this.arrayIncrement].answerCorrect) {
        console.log(this.questionArray.length, " array length")
        this.raiseQuestionCorrect()
        this.popQuestionsHad()
        this.raiseArrayIncrement()
        
        return this.questionsHad
      }
      // antwoord fout
      else {
        this.popQuestionsHad()
        this.raiseQuestionWrong()
        this.raiseArrayIncrement()
      }
    }
  }

  //wanneer een variabele aangepast moet worden, roep deze aan en pas de variabele aan.
  raiseQuestionCorrect () {
    this.correctAnswer++
    console.log(this.correctAnswer, " correct answers")
    return this.correctAnswer
  }

  raiseQuestionWrong () {
    this.wrongAnswer++
    console.log(this.wrongAnswer, " answers wrong")
    return this.wrongAnswer
  }

  pushQuestionsHad () {
    for ( let i: number = 0; i < this.totalQuestions; i++ ) {
      this.questionsHad.push(i)
    }
  }

  popQuestionsHad () {
    this.questionsHad.splice(this.arrayIncrement, 1)
    this.questionArray.splice(this.arrayIncrement, 1)
  }

  // sorteert tussen de verschillende vragen totdat de laatste vraag bereikt is.
  raiseArrayIncrement () {
    if ( this.questionsHad.length){
      this.getRandomNumber()
      this.clearInput()
    }
    else {
      this.gameDone = true;
      console.log(this.gameDone)
      this.scoreLog() //toon eindscore
      this.clearArray()
      return this.gameDone
    }
  }

  scoreLog() {
    let finalScore = ((this.correctAnswer * 4) - (this.wrongAnswer * 1))
    if (finalScore <= 0 ) {
      finalScore = 0
    }
    this.gameScore.push(this.correctAnswer, this.wrongAnswer, finalScore)
    console.log(this.gameScore)
    return this.gameScore
  }

  clearArray() {
    this.questionArray = []
  }

  clearInput() {
    this.inputClear = document.getElementsByName("questionBox");
    this.inputClear[0].checked = false
    this.inputClear[1].checked = false
    this.inputClear[2].checked = false
    this.inputClear[3].checked = false
  }


}
