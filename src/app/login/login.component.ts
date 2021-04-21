import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { PlayerService } from '../player-service/player.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Set character constants
  char_name_mrs_white = environment.CHARACTER_NAME_MRS_WHITE;
  char_name_mr_green = environment.CHARACTER_NAME_MR_GREEN;
  char_name_mrs_peacock = environment.CHARACTER_NAME_MRS_PEACOCK;
  char_name_prof_plum = environment.CHARACTER_NAME_PROF_PLUM;
  char_name_miss_scarlet = environment.CHARACTER_NAME_MISS_SCARLET;
  char_name_col_mustard = environment.CHARACTER_NAME_COLONEL_MUSTARD;

  loginForm = this.formBuilder.group({
    playerName: '',
    gameId: '',
    charSelected: ''
  });

  constructor(private router: Router, private playerService: PlayerService, private formBuilder: FormBuilder) { }

  // action on create game
  createGameButtonClick = () => {
    var playerName = this.loginForm.controls['playerName'].value
    var charName = this.loginForm.controls['charSelected'].value
    
    // Create new game in backend
    this.playerService.httpPostToBackend(`?playerName=${playerName}&charName=${charName}`).subscribe(
      data => {
        this.router.navigate([`/wait-room/${data.gameId}/${charName}`]);
      },
      error => {
        console.log("ERROR:", error);
      },
      () => {
        console.log("POST is completed");
      })
  };

  // action on join game
  joinGameButtonClick = () => {
    var gameId = this.loginForm.controls['gameId'].value
    var playerName = this.loginForm.controls['playerName'].value
    var charName = this.loginForm.controls['charSelected'].value

    // Add player to game in backend
    this.playerService.httpPostToBackend(`/${gameId}/players?playerName=${playerName}&charName=${charName}`).subscribe(
      data => {
        this.router.navigate([`/wait-room/${data.gameId}/${charName}`]);
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
