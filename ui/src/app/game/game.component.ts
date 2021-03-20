import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { GameBackendService } from './game-backend.service';
import { Player } from './player';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  title = "Listing game";
  players: Player[] = [];

  constructor(private service: GameBackendService) {} 

  ngOnInit(): void { 
    this.service.gameData$
      .subscribe((data: Game) => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
          this.players = data.players;
      });
  }
}