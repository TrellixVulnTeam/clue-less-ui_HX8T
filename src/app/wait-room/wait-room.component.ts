import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Clue } from '../clue';

@Component({
  selector: 'wait-room',
  templateUrl: './wait-room.component.html',
  styleUrls: ['./wait-room.component.css']
})
export class WaitRoomComponent extends Clue implements OnInit {

  displayedColumns: string[] = ['characterName', 'playerName', 'state', 'isTurn', 'active'];

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) {
    super();
  } 

  startGame() {

    console.log(`submitting post request to start game`)

    // update plater position
    this.playerService.httpPostToBackend(`/${this.gameId}?playerName=${this.player.playerName}&charName=${this.charName}&activate=true`).subscribe(
      data => {
        this.refreshData(data);
        this.router.navigate([`/game/${this.gameId}/${this.charName}`]);
      },
      error => {
        this.showPlayerMessage();
        console.log("ERROR:", error);
      },
      () => {
        console.log("POST for moving location is completed");
      })
  };

  // show player message
  showPlayerMessage() {

    // Get the snackbar DIV
    var x: any = document.getElementById("playerMessage");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  ngOnInit() {
    
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.charName = this.route.snapshot.paramMap.get('charName');

    this.playerService.setPlayerService(this.gameId, this.charName);

    this.playerService.gameData$
    .subscribe((data: any) => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
        this.refreshData(data);

        if (data.active) { // redirect to Game component if game has started
          this.router.navigate([`/game/${this.gameId}/${this.charName}`]);
        }
    });
  }
}