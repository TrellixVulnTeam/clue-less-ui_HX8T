import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'game/:gameId/:playerId', component: GameComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
