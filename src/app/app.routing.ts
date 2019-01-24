import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {ProfileComponent} from './profile/index';
import {TypeGameComponent} from './game/type-game/type-game.component';
import {HighscoresComponent} from './highscores';
import {GuessgameComponent} from './guessgame/guessgame.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'typegame', component: TypeGameComponent },
  { path: 'guessgame', component: GuessgameComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
