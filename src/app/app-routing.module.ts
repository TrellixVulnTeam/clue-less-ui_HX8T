import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { WaitRoomComponent } from './wait-room/wait-room.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'wait-room/:gameId/:charName', component: WaitRoomComponent },
  { path: 'game/:gameId/:charName', component: GameComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: '**',   redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
