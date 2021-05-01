import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute } from '@angular/router';
import { Clue } from '../clue';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./game.component.css']
})
export class GameComponent extends Clue implements OnInit {

  constructor(public route: ActivatedRoute, public playerService: PlayerService, public dialog: MatDialog) {
    super();
    this.gameId = route.snapshot.paramMap.get('gameId');
    this.charName = route.snapshot.paramMap.get('charName');
  }

  // complete turn
  completeTurn() {

    console.log(`submitting post request to complete-turn`)

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

  // make suggestion 
  makeSuggestion() {

    console.log(`submitting suggestion provided by player: ${this.playerName}`)

    // send post request
    this.playerService.httpPostToBackend(`/${this.gameId}/suggestion/suggest?playerName=${this.player.playerName}&charName=${this.charName}&weapon=${this.guessWeapon}&room=${this.guessRoom}&suspect=${this.guessSuspect}`).subscribe(
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

  // make accusation 
  makeAccusation() {

    console.log(`submitting accusation provided by player: ${this.playerName}`)

    // send post request
    this.playerService.httpPostToBackend(`/${this.gameId}/accusation/accuse?playerName=${this.player.playerName}&charName=${this.charName}&weapon=${this.guessWeapon}&room=${this.guessRoom}&suspect=${this.guessSuspect}`).subscribe(
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

  // open reveal clue dialog
  openRevealClueDialog() {
    let dialogRef = this.dialog.open(RevealClueDialog, {
      data: { player: this.player, suggestionCards: this.suggestionCards },
    });
  }

  // custom refresh data actions for game-component
  gameComponentRefreshData(data: any) {

    // show game message if it has changed
    if (data.eventMessage != this.eventMessage) {
      this.showGameMessage();
    }

    data.characters.forEach((character: any) => {
      if (character.characterName == this.charName) {

        console.log(character.eventMessage);

        if (character.eventMessage != this.playerMessage) {
          this.showPlayerMessage();
        }

        // refresh data
        this.refreshData(data);
      }
    })



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

  // show player message
  showPlayerMessage() {

    // Get the snackbar DIV
    var x: any = document.getElementById("playerMessage");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  // reveal clue card
  revealClue() {

    console.log(`submitting post request to reveal clue card`)

    // update plater position
    this.playerService.httpPostToBackend(`/${this.gameId}/suggestion/reveal?playerName=${this.player.playerName}&charName=${this.charName}&cardName=${this.revealed_clue}`).subscribe(
      data => {
        this.gameComponentRefreshData(data);
      },
      error => {
        console.log("ERROR:", error);
      },
      () => {
        console.log("POST for completing turn is completed");
      })
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

@Component({
  selector: 'reveal-clue',
  templateUrl: 'reveal-clue.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./reveal-clue.css']
})
export class RevealClueDialog { 

  revealedClue: any | undefined;
  player: any | undefined;
  suggestionCards: any | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {player: any, suggestionCards: any}) {
    this.player = data.player;
    this.suggestionCards = data.suggestionCards;
  }

  makeSuggestion() {
    // FILL
  }

}
