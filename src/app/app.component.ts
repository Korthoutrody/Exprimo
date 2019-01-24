import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})


export class AppComponent {

  constructor(public router: Router){}

}
