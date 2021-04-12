import { Component, OnInit } from '@angular/core';
import { Game } from '../player-service/game';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wait-room',
  templateUrl: './wait-room.component.html',
  styleUrls: ['./wait-room.component.css']
})
export class WaitRoomComponent implements OnInit {
  
  playerId: any | undefined;
  gameId: any | undefined;
  game: any | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) {} 

  ngOnInit() {
    
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.playerId = this.route.snapshot.paramMap.get('playerId');

    this.playerService.setPlayerService(this.gameId, this.playerId);

    this.playerService.gameData$
    .subscribe((data: Game) => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
        this.game = data;

        if (data.hasStarted) { // redirect to Game component if game has started
          this.router.navigate([`/game/${this.gameId}/${this.playerId}`]);
        }
    });
  }
}