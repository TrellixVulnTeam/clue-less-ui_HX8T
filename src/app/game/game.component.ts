import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute } from '@angular/router';
import { Clue } from '../clue';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent extends Clue implements OnInit {

  constructor(private route: ActivatedRoute, private playerService: PlayerService, private formBuilder: FormBuilder) {
    super();
    this.gameId = route.snapshot.paramMap.get('gameId');
    this.charName = route.snapshot.paramMap.get('charName');
  }

  // TODO: make accusation - use format for login component (createGame and joinGame)
  makeAccusation() {

    console.log(`prompting ${this.playerName} for accusation`)

  };

   // TODO: make suggestion - use format for login component (createGame and joinGame)
   makeSuggestion() {

    console.log(`prompting ${this.playerName} for suggestion`)

  };

  // move  location
  moveLocation(locName: string) {

    console.log(`submitting post request to move to location: ${locName}`)

    // update plater position
    this.playerService.httpPostToBackend(`/${this.gameId}/location?playerName=${this.player.playerName}&charName=${this.charName}&locName=${locName}`).subscribe(
      data => {
        this.gameComponentRefreshData(data);
      },
      error => {
        console.log("ERROR:", error);
      },
      () => {
        console.log("POST for moving location is completed");
      })
  };

  // complete turn
  completeTurn() {

    console.log(`submitting post request to move to complete-turn`)

    // update plater position
    this.playerService.httpPostToBackend(`/${this.gameId}/complete-turn?playerName=${this.player.playerName}&charName=${this.charName}`).subscribe(
      data => {
        this.gameComponentRefreshData(data);
      },
      error => {
        console.log("ERROR:", error);
      },
      () => {
        console.log("POST for completing turn is completed");
      })
  };

  // custom refresh data actions for game-component
  gameComponentRefreshData(data: any) {

    // show game message if it has changed
    if (data.eventMessage != this.eventMessage) {
      this.showGameMessage();
    }

    // refresh data
    this.refreshData(data);

  }

  // show game message
  showGameMessage() {
    // Get the snackbar DIV
    var x: any = document.getElementById("gameMessage");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  // start page
  ngOnInit() {

    this.playerService.setPlayerService(this.gameId, this.playerName);

    this.playerService.gameData$
      .subscribe(data => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
        this.gameComponentRefreshData(data);
      });
  }
}