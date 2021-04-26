import { Component, Inject, OnInit } from '@angular/core';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute } from '@angular/router';
import { Clue } from '../clue';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';]

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent extends Clue implements OnInit {

  constructor(private route: ActivatedRoute, private playerService: PlayerService, public dialog: MatDialog) {
    super();
    this.gameId = route.snapshot.paramMap.get('gameId');
    this.charName = route.snapshot.paramMap.get('charName');
  }

  openSuggestionDialog() {
    const dialogRef = this.dialog.open(SuggestionDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // TODO: make accusation - use format for login component (createGame and joinGame)
  makeAccusation() {

    console.log(`prompting ${this.playerName} for accusation`)

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

@Component({
  selector: 'suggestion-dialog',
  templateUrl: 'suggestion-dialog.html',
  styleUrls: ['./suggestion-dialog.css']
})
export class SuggestionDialog extends Clue {

  constructor( public dialogRef: MatDialogRef<SuggestionDialog>) {
    super();
  }

  // TODO: make suggestion - use format for login component (createGame and joinGame)
  makeSuggestion() {

    console.log(`submitting suggesiton provided by player: ${this.playerName}`)
    // update plater position
    // this.playerService.httpPostToBackend(`/${this.gameId}/complete-turn?playerName=${this.player.playerName}&charName=${this.charName}`).subscribe(
    //   data => {
    //     this.gameComponentRefreshData(data);
    //   },
    //   error => {
    //     console.log("ERROR:", error);
    //     this.dialogRef.close();
    //   },
    //   () => {
    //     console.log("POST for completing turn is completed");
    //   })


      this.dialogRef.close();
  };
}