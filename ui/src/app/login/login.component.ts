import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlayerService } from '../game/player.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  game: Observable<any> | undefined;

  loginForm = this.formBuilder.group({
    playerName: '',
    gameId: ''
  });

  constructor(private router: Router, private playerService: PlayerService, private formBuilder: FormBuilder) { }

  // action on create game
  createGameButtonClick=() => {
    // Create new game in backend
    this.playerService.httpPostToBackend(`?name=${this.loginForm.controls['playerName'].value}`).subscribe(
      data => {
        this.router.navigate([`/game`, {'playerId': `${data.players[0].id}`, 'gameId': `${data.gameId}`}]);
      },
      error => {
        console.log("ERROR:", error);
        },
      () => {
        console.log("POST is completed");
      })
  };

  // action on join game
  joinGameButtonClick=() => {
    // Add player to game in backend
    this.playerService.httpPostToBackend(`/${this.loginForm.controls['gameId'].value}/players?name=${this.loginForm.controls['playerName'].value}`).subscribe(
      data => {
        this.router.navigate([`/game`, {'playerId': `${data.players[0].id}`, 'gameId': `${data.gameId}`}]);
      },
      error => {
        console.log("ERROR:", error);
        },
      () => {
        console.log("POST is completed");
      })
  };

  ngOnInit() {
  }
  
}
