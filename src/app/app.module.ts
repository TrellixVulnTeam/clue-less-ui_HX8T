import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerService } from './player-service/player.service';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaitRoomComponent } from './wait-room/wait-room.component';
import { SuggestionDialog } from './game/game.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginComponent,
    WaitRoomComponent,
    SuggestionDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    SuggestionDialog
  ],
  providers: [
    PlayerService,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
