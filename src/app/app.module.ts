import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { SidebarComponent } from './sidebar/sidebar.component';

import {AlertComponent, EqualValidator} from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, ScoreService} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import {TypeGameComponent} from './game/type-game/type-game.component';
import { HighscoresComponent } from './highscores/highscores.component';
import {GuessgameComponent} from './guessgame/guessgame.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EqualValidator,
    SidebarComponent,
    ProfileComponent,
    TypeGameComponent,
    HighscoresComponent,
    GuessgameComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ScoreService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
