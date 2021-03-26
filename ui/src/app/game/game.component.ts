import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { PlayerService } from './player.service';
import { Player } from './player';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  gameId: number | undefined;
  players: Player[] = [];

  constructor(private playerService: PlayerService) {} 

  ngOnInit(): void { 
    this.playerService.gameData$
      .subscribe((data: Game) => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
          this.players = data.players;
          this.gameId = data.gameId;
      });
  }
}