import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute } from '@angular/router';
import { Clue } from '../clue';
import { LocationButton } from '../location-button';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent extends Clue implements OnInit {

  // game data
  gameId: any | undefined;
  eventMessage: string | undefined;
  suggestion: any | undefined;
  characters: any | undefined;
  active: boolean | undefined;

  // player data
  player: any | undefined;
  playerName: string | undefined;
  charName: any | undefined;

  constructor(private route: ActivatedRoute, private playerService: PlayerService, private formBuilder: FormBuilder) {
    super();
    this.gameId = route.snapshot.paramMap.get('gameId');
    this.charName = route.snapshot.paramMap.get('charName');
  }

  // refresh frontend data 
  refreshData(data: any) {
    this.eventMessage = data.eventMessage;
    this.active = data.active;
    this.suggestion = data.suggestionCards;
    this.characters = data.characters;

    data.characters.forEach((character: any) => {
      var isPossibleMove: boolean;
      
      if (character.characterName == this.charName) {
        this.player = character;
        this.charName = this.player.characterName;

        // check to see if each location is in user's possibleMoves and set to enabled if so
        for (let locButton of this.locationButtons) {
          isPossibleMove = false;
          character.possibleMoves.forEach((location: any) => {
            if (locButton.label == location.name) {
              isPossibleMove = true;
            }
          });

          if (isPossibleMove) {
            // console.log(`enabling button: ${locButton.label}`)
            locButton.enable()
          } else {
            // console.log(`disabling button: ${locButton.label}`)
            locButton.disable()
          }
        }
      }
    })
  }

  // show game message
  showGameMessage() {
    // Get the snackbar DIV
    var x:any = document.getElementById("gameMessage");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  // move  location
  moveLocation(locName: string) {

    console.log(`submitting post request to move to location: ${locName}`)

    // update plater position
    this.playerService.httpPostToBackend(`/${this.gameId}/location?playerName=${this.player.playerName}&charName=${this.charName}&locName=${locName}`).subscribe(
      data => {
        this.refreshData(data);
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
        this.refreshData(data);
      },
      error => {
        console.log("ERROR:", error);
      },
      () => {
        console.log("POST for completing turn is completed");
      })
  };

  // start page
  ngOnInit() {

    this.playerService.setPlayerService(this.gameId, this.playerName);

    this.playerService.gameData$
      .subscribe(data => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
        this.refreshData(data);
      });
  }
}