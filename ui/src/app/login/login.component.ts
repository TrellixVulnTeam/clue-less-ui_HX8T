import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { PlayerService } from '../game/player.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
        data.players.forEach((element: any) => {
          // Determine Player ID by filtering on Player Name
          if (element.name == this.loginForm.controls['playerName'].value) {
            // this.router.navigate([`/game`, {'playerId': `${element.id}`, 'gameId': `${data.gameId}`}]);
            this.router.navigate([`/game/${data.gameId}/${element.id}`]);
          }
        });
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
        data.players.forEach((element: any) => {
          // Determine Player ID by filtering on Player Name
          if (element.name == this.loginForm.controls['playerName'].value) {
            // this.router.navigate([`/game`, {'playerId': `${element.id}`, 'gameId': `${data.gameId}`}]);
            this.router.navigate([`/game/${data.gameId}/${element.id}`]);
          }
        });
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
