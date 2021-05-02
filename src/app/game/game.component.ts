import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute } from '@angular/router';
import { Clue } from '../clue';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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
      data: { gameId: this.gameId, player: this.player, suggestionCards: this.suggestionCards },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.playerService.httpGetToBackend(`/${this.gameId}`).subscribe(
        (data:any) => {
          this.gameComponentRefreshData(data);
        },
        (error:any) => {
          console.log("ERROR:", error);
        },
        () => {
          console.log("GET for for game data completed");
        })
    });
  }

  // open reveal clue dialog
  openAcceptClueDialog() {

    let dialogRef = this.dialog.open(AcceptClueDialog, {
      data: { gameId: this.gameId, player: this.player },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.playerService.httpGetToBackend(`/${this.gameId}`).subscribe(
        (data:any) => {
          this.gameComponentRefreshData(data);
        },
        (error:any) => {
          console.log("ERROR:", error);
        },
        () => {
          console.log("GET for for game data completed");
        })
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

  revealClueData: any | undefined;
  revealedClue : any | undefined;

  constructor(private dialogRef: MatDialogRef<RevealClueDialog>, public playerService: PlayerService, @Inject(MAT_DIALOG_DATA) public data:any) {

    this.revealClueData = data;

    dialogRef.disableClose = true;

    this.playerService.setPlayerService(data.gameId, data.player.playerName);
  }

  // reveal clue card
  revealClue() {

    console.log(`submitting post request to reveal clue card`)

    // update plater position
    this.playerService.httpPostToBackend(`/${this.revealClueData.gameId}/suggestion/reveal?playerName=${this.revealClueData.player.playerName}&charName=${this.revealClueData.player.characterName}&cardName=${this.revealedClue}`).subscribe(
      (data:any) => {
        this.dialogRef.close()
      },
      (error:any) => {
        console.log("ERROR:", error);
      },
      () => {
        console.log("POST for revealing clue is completed");
      })
  }

}

@Component({
  selector: 'accept-clue',
  templateUrl: 'accept-clue.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./accept-clue.css']
})
export class AcceptClueDialog {

  acceptClueData: any| undefined;

  constructor(private dialogRef: MatDialogRef<AcceptClueDialog>, public playerService: PlayerService, @Inject(MAT_DIALOG_DATA) public data:any) {

    this.acceptClueData = data;

    dialogRef.disableClose = true;

    this.playerService.setPlayerService(data.gameId, data.player.playerName);
  }

  // accept clue card
  acceptClue() {

    console.log(`submitting post request to accept clue card`)
    console.log(`gameId: ${this.acceptClueData.gameId} and playerName: ${this.acceptClueData.player.playerName}`)

    // accept revealed clue
    this.playerService.httpPostToBackend(`/${this.acceptClueData.gameId}/suggestion/accept?playerName=${this.acceptClueData.player.playerName}&charName=${this.acceptClueData.player.characterName}`).subscribe(
      (data:any) => {
        this.dialogRef.close()
      },
      (error:any) => {
        console.log("ERROR:", error);
      },
      () => {
        console.log("POST for accepting clue is completed");
      })
  }

}