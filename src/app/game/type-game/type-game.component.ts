import { Component, OnInit } from '@angular/core';
import { SentenceService } from '../services/sentence.service';
import { textClass } from '../textClass/textClass';
import { textClassArray } from '../textClassArray/textClassArray';
import { interval } from 'rxjs'
import { bypassSanitizationTrustResourceUrl } from '@angular/core/src/sanitization/bypass';

import { Router } from '@angular/router';
import { ScoreService } from '../../_services/index';

@Component({
  selector: 'app-type-game',
  templateUrl: './type-game.component.html',
  styleUrls: ['./type-game.component.css']
})


export class TypeGameComponent implements OnInit {
  
  //initial values
  private randomSentence = "init";
  private localsentence: string;
  private localsen = "";
  private localsen2 = "";
  private  sentenceLength: number;
  private userInput = "";
  private checkInput = "";
  private randomSentenceArray = [];
  private arrayIncrement = 0; //de variabele die het huidige woord in de array beschrijft waar speler mee bezig is
  private activeWord ;
  private nextWord;
  private activeGame = false;
  private gameOver = false;
  private score : number = 0;
  private negativeScore : number = 0;
  private timeLeft: number = 45;
  private endScore;
  private scoreMessage;
  private interval;


  //VAN DE SCORE SCRIPT
  model: any = {};
  loading = false;

  constructor(private serviceVariable : SentenceService,
              private router: Router,
              private scoreService: ScoreService) { }



  ngOnInit() {
      //initialize array of typeholders from sentenceservice
      this.getTextClass();
      this.getRandomText();
    }

  //************** initiatie *******************************

  // zorg dat textClassArray alle waarden overneemt uit de geïmporteerde textClass[] en variabele om textinput gebruiker in op te slaan
  textClassArray : textClass[];

  // minimum en maximum waarden voor random zin uitkiezen uit array
  private minNumber = 0;
  private maxNumber = textClassArray.length

  
  //maak een array van Typeholders
  getTextClass(): void {
    this.serviceVariable.getTextClass()
      .subscribe(textClassArray => this.textClassArray = textClassArray)
  }

  
  //zorg dat een random typeholder wordt gekozen uit een array van typeholders
  getRandomText() {
      this.randomSentence = this.textClassArray[this.getRandomNumber()].textLine
      this.randomSentenceArray = this.randomSentence.split(" ");
      return this.randomSentenceArray
      }

  
      // generate random number to get a random sentence from array
  getRandomNumber() {
    let randomNumber = Math.floor(Math.random() * (this.maxNumber - this.minNumber))
    return randomNumber
  }

  //************** Start Spel *****************************

  startGame () {
    if (this.activeGame == false) {
      this.initActive()  
    }
  }

    //zorg dat het eerste woord actief word en start de timer als timer op 0 is stop het spel
    initActive() {
      this.activeWord = document.getElementById("w" + this.arrayIncrement);
      this.activeWord.className = "active"

      console.log("startTimer")
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } 
 
        else if (!this.gameOver) {

          this.stopTimer()
          this.finalScore()
          this.showScore()
          this.clearArray()
          this.updateScore()
          this.stopGame()



        }
      },1000)
    

      this.activeGame = true; 
      console.log("initActive")
    }  



  //************** Het spel *******************************
  
  //doet iets op keydown
  keyDownFunction(event) {
    if (this.activeGame == false) {
      this.initActive()
    }
    
    if(event.keyCode == 32 || event.keyCode == 13) {
      
      if (this.gameOver == false) {
            
        if (this.userInput == (this.randomSentenceArray[this.arrayIncrement]) ) {
        
          this.activeWord = document.getElementById("w" + this.arrayIncrement);
          this.nextWord= document.getElementById("w" + (this.arrayIncrement + 1)); 
          this.checkInput = "Correct!"
          this.clearTextBox()
          this.changeActive()
          this.increaseIncrement()
          this.raiseScore()
          
          
          

          return false
          }

        else {
          this.checkInput = "Incorrect!"

          this.lowerScore()
        
          return false
          }
        }
      }
    }

    //maak input veld leeg -> keydown event Enter Space
    clearTextBox () {
      this.userInput = null
      return this.userInput
    }

    //verhoog arrayIncrement zodat een ander woord wordt getoond -> keydown event Enter Space
    increaseIncrement () {
      this.arrayIncrement++
      return this.arrayIncrement
    }



    //verander het actieve woord
    changeActive() {
      this.activeWord = document.getElementById("w" + this.arrayIncrement);
      this.nextWord= document.getElementById("w" + (this.arrayIncrement + 1)); 

      this.activeWord.className = "inactive"
      this.nextWord.className="active"
      
    }


//****************************** score************************ */
raiseScore () {
  this.score++
  return this.score
}

lowerScore () {
  this.negativeScore++
  return this.negativeScore
}

finalScore() {
  this.endScore = this.score - (this.negativeScore / 2)

  if (this.endScore < 0 ) {
    this.endScore = 0
  }
  return this.endScore
}

showScore() {
  this.scoreMessage = '<h6 class="text-center"> Congratulations. Your final score was: </h6>'  
  return this.endScore
}

//**************************** stopgame ******************/

stopGame() {
  this.gameOver = true
  return this.gameOver
}

stopTimer() {
  this.interval = null
}

clearArray() {
  this.randomSentenceArray = []
  return
  this.randomSentenceArray
}

updateScore() {

    this.localsentence = localStorage.getItem('currentUser');
    this.localsen = this.localsentence.slice(8);
    this.sentenceLength = this.localsen.length - 24;
    this.localsen2 = this.localsen.slice(0, -this.sentenceLength);

  console.log(this.localsen2,this.sentenceLength);
    this.model =  [ this.endScore, this.localsen2 ];
    console.log(this.model);
   this.scoreService.updateScore(this.model)
    .subscribe();
  return
}}

